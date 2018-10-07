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
            return createOrder(newOrderParams)
                .then((response) => {
                    if (response.number === undefined){
                        dispatch({ type: CREATING_ORDER_FAILURE });
                        return
                    }
                    else {
                        dispatch({ type: CREATING_ORDER_SUCCESS, payload: response });
                        order_number = response.number
                        order_token = response.token
                        return addLineItem({line_item, order_number, order_token})
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
            const current_item = lineItemExists(line_item, getState().cart.line_items)
            if (current_item === undefined){
                return addLineItem({line_item, order_number, order_token})
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
                console.log("El producto ya existe")
                const newQty = current_item.quantity + line_item.quantity
                const item_id = current_item.id
                return updateLineItem({line_item, order_number, order_token, newQty, item_id})
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
        return updateLineItem({line_item, order_number, order_token, newQty, item_id})
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

export const removeProductFromCart = () => {
    return (dispatch) => {
        dispatch({ type: REMOVE_PRODUCT_FROM_CART });
    };
};

//------ Funciones privadas

const createOrder = () => {
    //console.log("estoy en crear orden")
    var request = require('superagent')
    return request
        .post(`${MAIN_URL}/api/v1/orders`)
        .set('Content-Type', 'application/json')
        .send({
            "order": {
                "order_token": ""
            }
        })
        .then((response) => {
            return response.body;
        })
};

const addLineItem = (params) => {
    var request = require('superagent')
        //const tokenParam = { order_token: params.order_token }
        return request
            .post(`${MAIN_URL}/api/v1/orders/${params.order_number}/line_items`)
            //.query(tokenParam)
            .query({
                line_item: {
                    variant_id: params.line_item.variant_id,
                    quantity: params.line_item.quantity
                },
                order_token: params.order_token
            })
            .set('Content-Type', 'application/json')
            .then((response) => {
                console.log("add line item", response.body)
                //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                return response.body
            })
            .catch((error) => {
                //dispatch({ type: DISPLAY_ERROR, payload: error})
                return error
            })
}

const updateLineItem = (params) => {
    var request = require('superagent')
        //const tokenParam = { order_token: params.order_token }
        const {newQty, line_item, order_number, order_token, item_id} = params
        return request
            .put(`${MAIN_URL}/api/v1/orders/${order_number}/line_items/${item_id}`)
            //.query(tokenParam)
            .query({
                line_item: {
                    variant_id: line_item.variant_id,
                    quantity: newQty
                },
                order_token: order_token
            })
            .set('Content-Type', 'application/json')
            .then((response) => {
                console.log("update line item", response.body)
                //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                return response.body
            })
            .catch((error) => {
                //dispatch({ type: DISPLAY_ERROR, payload: error})
                console.log(error)
                return error
            })
}

const lineItemExists = (line_item, cart) => {
    const resultado = cart.find(item => item.variant_id === line_item.variant_id)
    return resultado
    // console.log("resultado", resultado)
    // if (resultado === undefined){
    //     return false
    // }
    // return true
}