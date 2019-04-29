import _ from 'lodash'
import {
    CREATE_CART_SUCCESS,
    CREATE_CART_FAILURE,
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
import { Utils } from './utils'
//import { getValidToken } from './UserActions'
import { cartApi } from '../../api/cartApi'
import { getValidToken } from '../../middleware/persist-data-locally'

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
        let current_order = getState().cart.cart
        console.log("addproducttocart", current_order)
        const {line_item} = product
        let auth
        if (_.isEmpty(current_order)) {
            //Se va a crear una orden nueva
            return cartApi.createCart()
                .then((response) => {
                    console.log("create cart", response.body)
                    if (response.status != 201){
                        dispatch({ type: CREATE_CART_FAILURE });
                        return
                    }
                    else {
                        console.info("create order", response.body)
                        dispatch({ type: CREATE_CART_SUCCESS, payload: response.body })
                        //order_number = response.attributes.number
                        //order_token = response.attributes.token
                        //const userToken = getValidToken()
                        auth = Utils.tokenForAPI(getState().user, getState().cart.cart)
                        console.log("auth", auth)
                        return cartApi.addLineItem({line_item, auth})
                            .then((response) => {
                                if(response.status == 200){
                                    dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
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
            // let order_number = current_order.order.number
            // let order_token = current_order.order.token
            auth = Utils.tokenForAPI(getState().user, getState().cart.cart)
            const current_item = Utils.lineItemExists(line_item, getState().cart.line_items)
            if (current_item === undefined){
                return cartApi.addLineItem({line_item, auth})
                    .then((response) => {
                        if(response.status == 200){
                            dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
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
                //const newQty = current_item.quantity + line_item.quantity
                //const item_id = current_item.id
                line_item['quantity'] = line_item.quantity + current_item.quantity
                line_item['line_item_id'] = current_item.line_item_id
                return cartApi.updateLineItem({line_item, auth})
                    .then((response) => {
                        if(response.status == 200){
                            //dispatch({ type: UPDATE_PRODUCT_ON_CART, payload: response })
                            dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                            dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                            //dispatch({ type: UPDATING_PRODUCT_ON_CART, payload: false })
                        }
                        else {
                            dispatch({ type: DISPLAY_ERROR, payload: "error"})
                        }
                    })
                    .catch((error) => {
                        console.log ("catch - ", error)
                        dispatch({ type: DISPLAY_ERROR, payload: "error"})
                    })
            }
        }
    }
}

export const updateProductOnCart = (product) => {
    return (dispatch, getState) => {
        dispatch({ type: ADDING_PRODUCT_TO_CART, payload: true})
        let current_order = getState().cart.cart
        console.log("addproducttocart", current_order)
        const {line_item} = product
        let auth = Utils.tokenForAPI(getState().user, getState().cart.cart)
        //console.log(getState().order)
        console.log("El producto ya existe")
        //const newQty = current_item.quantity + line_item.quantity
        //const item_id = current_item.id
        line_item['quantity'] = line_item.quantity + current_item.quantity
        line_item['line_item_id'] = current_item.line_item_id
        return cartApi.updateLineItem({line_item, auth})
            .then((response) => {
                if(response.status == 200){
                    //dispatch({ type: UPDATE_PRODUCT_ON_CART, payload: response })
                    dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                    dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                    //dispatch({ type: UPDATING_PRODUCT_ON_CART, payload: false })
                }
                else {
                    dispatch({ type: DISPLAY_ERROR, payload: "error"})
                }
            })
            .catch((error) => {
                console.log ("catch - ", error)
                dispatch({ type: DISPLAY_ERROR, payload: "error"})
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
                //console.log("response", response)
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