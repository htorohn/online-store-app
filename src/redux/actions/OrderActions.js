import {
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    CREATING_ORDER_SUCCESS,
    CREATING_ORDER_FAILURE,
    ORDER_FETCHING,
    ORDER_FETCH_SUCCESS,
    ORDER_FETCH_FAILURE,
    DISPLAY_ERROR
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
        //console.log(getState().order)
        let current_order = getState().order
        let line_item = product.line_item
        //let tokenParam = tokenForAPI(null, order.order_token);
        //console.log(tokenParam)
        //if (order.order.id === undefined) {
        if (current_order.orderNumber == "") {
            //console.log("voy a crear la orden")
            return createOrder(newOrderParams)
                .then((response) => {
                    //console.log("Se creo la orden")
                    //console.log(response)
                    if (response.number === undefined){
                        //console.log(error)
                        dispatch({ type: CREATING_ORDER_FAILURE });
                        return
                    }
                    else {
                        //console.log(response)
                        dispatch({ type: CREATING_ORDER_SUCCESS, payload: response });
                        order_number = response.number
                        order_token = response.token
                        //console.log(order_number)
                        return addLineItem({line_item, order_number, order_token, product})
                            .then((response) => {
                                if(response.error === undefined){
                                    //console.log("response", response)
                                    dispatch({ type: ADD_PRODUCT_TO_CART, payload: response })
                                    //getOrder()
                                }
                                else {
                                    dispatch({ type: DISPLAY_ERROR, payload: error})
                                }
                            })
                            // .catch((error) => {
                            //     console.log(error)
                            // })
                    }
                    
                })
                // .catch(error => {
                //     console.log(error)
                //     dispatch({ type: CREATING_ORDER_FAILURE });
                // })
        } else {
            //console.log("La orden ya existe")

            let order_number = current_order.order.number
            let order_token = current_order.order.token
            return addLineItem({line_item, order_number, order_token, product})
                .then((response) => {
                    if(response.error === undefined){
                        dispatch({ type: ADD_PRODUCT_TO_CART, payload: response })
                        //getOrder()
                    }
                    else {
                        dispatch({ type: DISPLAY_ERROR, payload: error})
                    }
                })
        }
    };
};

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
        //.query(tokenParam)
        //.query(param)
        .set('Content-Type', 'application/json')
        .send({
            "order": {
                "order_token": ""
            }
        })
        .then((response) => {
            //console.log(response.body)
            //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
            return response.body;
        })
        // .catch((error) => {
        //     //dispatch({ type: DISPLAY_ERROR, payload: error})
        //     return error
        // })
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
