import {
    ADDING_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    CREATING_ORDER_SUCCESS,
    CREATING_ORDER_FAILURE,
    ORDER_FETCHING,
    ORDER_FETCH_SUCCESS,
    ORDER_FETCH_FAILURE,
    DISPLAY_ERROR,
    UPDATE_PRODUCT_ON_CART
} from './types'
import { MAIN_URL } from '../../constants/Config'
//import { _HEADERS } from '../../constants/Headers'
import { newOrderParams } from './utils'
import { orderApi } from '../../api/orderApi'

export const getOrder = () => {
    return (dispatch, getState) => {
        let current_order = getState().order
        //console.log("current order", current_order)
        if (current_order.orderNumber != "") {
            dispatch({ type: ORDER_FETCHING })
            var request = require('superagent')
            request
                .get(`${MAIN_URL}/api/v1/orders/${current_order.orderNumber}`)
                .set('Content-Type', 'application/json')
                .query({
                    order_token: current_order.order.token
                })
                .then ((response) => {
                    //console.log(response.body)
                    dispatch({ type: ORDER_FETCH_SUCCESS, payload: response.body });
                })
                .catch ((error) => {
                    console.log(error);
                    dispatch({ type: ORDER_FETCH_FAILURE, payload: error})
                })
        }
    }
}

export const addProductToCart = (product) => {
    
    return (dispatch, getState) => {
        dispatch({ type: ADDING_PRODUCT_TO_CART, payload: true})
        //console.log(getState().order)
        let current_order = getState().order
        const {line_item} = product
        if (current_order.orderNumber == "") {
            //Se va a crear una orden nueva
            return orderApi.createOrder(newOrderParams)
                .then((response) => {
                    if (response.number === undefined){
                        dispatch({ type: CREATING_ORDER_FAILURE });
                        return
                    }
                    else {
                        dispatch({ type: CREATING_ORDER_SUCCESS, payload: response });
                        order_number = response.number
                        order_token = response.token
                        return orderApi.addLineItem({line_item, order_number, order_token})
                            .then((response) => {
                                if(response.error === undefined){
                                    dispatch({ type: ADD_PRODUCT_TO_CART, payload: response })
                                    dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                                }
                                else {
                                    dispatch({ type: DISPLAY_ERROR, payload: error})
                                }
                            })
                    }
                    
                })
        } else {
            //La orden ya existe
            let order_number = current_order.order.number
            let order_token = current_order.order.token
            const current_item = orderApi.lineItemExists(line_item, getState().cart.line_items)
            if (current_item === undefined){
                return orderApi.addLineItem({line_item, order_number, order_token})
                    .then((response) => {
                        if(response.error === undefined){
                            dispatch({ type: ADD_PRODUCT_TO_CART, payload: response })
                            dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                        }
                        else {
                            dispatch({ type: DISPLAY_ERROR, payload: error})
                        }
                    })
            }
            else {
                //El producto ya existe en el carrito y solo actualizamos la cantidad
                console.log("El producto ya existe")
                const newQty = current_item.quantity + line_item.quantity
                const item_id = current_item.id
                return orderApi.updateLineItem({line_item, order_number, order_token, newQty, item_id})
                    .then((response) => {
                        if(response.error === undefined){
                            dispatch({ type: UPDATE_PRODUCT_ON_CART, payload: response })
                            dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                            //dispatch({ type: UPDATING_PRODUCT_ON_CART, payload: false })
                        }
                        else {
                            dispatch({ type: DISPLAY_ERROR, payload: error})
                        }
                    })
            }
        }
    }
}

export const updateProductOnCart = (product) => {
    return (dispatch, getState) => {
        dispatch({ type: ADDING_PRODUCT_TO_CART, payload: true})
        //console.log(getState().order)
        let current_order = getState().order
        const {item_id, line_item} = product
        let order_number = current_order.order.number
        let order_token = current_order.order.token
        const newQty = line_item.quantity
        return orderApi.updateLineItem({line_item, order_number, order_token, newQty, item_id})
            .then((response) => {
                if(response.error === undefined){
                    dispatch({ type: UPDATE_PRODUCT_ON_CART, payload: response })
                    dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                    //dispatch({ type: UPDATING_PRODUCT_ON_CART, payload: false })
                }
                else {
                    dispatch({ type: DISPLAY_ERROR, payload: error})
                }
            })
    }

}

export const removeProductFromCart = (product) => {
    return (dispatch, getState) => {
        dispatch({ type: ADDING_PRODUCT_TO_CART, payload: true})

        let current_order = getState().order
        let order_number = current_order.order.number
        let order_token = current_order.order.token
        const item_id = product.id
        return orderApi.removeLineItem({order_number, order_token, item_id})
            .then((response) => {
                console.log("response", response)
                if(response === null){
                    
                    dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: item_id });
                    dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                    //dispatch({ type: UPDATING_PRODUCT_ON_CART, payload: false })
                }
                else {
                    if(response.error.status === 404){
                        dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: item_id });
                        dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                    } else{
                        dispatch({ type: DISPLAY_ERROR, payload: response.error})
                    }
                }
            })
    }
}

export const productExistOnCart = (line_item) => {
    return (getState) => {
        const current_item = orderApi.lineItemExists(line_item, getState().cart.line_items)
        if (current_item !== undefined) {
            return current_item
        } else {
            return null
        }

    }
}