import {
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    CREATING_ORDER_SUCCESS,
    CREATING_ORDER_FAILURE,
    DISPLAY_ERROR
} from './types'
import { MAIN_URL } from '../../constants/Config'
//import { _HEADERS } from '../../constants/Headers'
import { newOrderParams } from './utils'

export const addProductToCart = (product) => {
    
    return (dispatch, getState) => {
        //console.log("Number: " + getState().order.id)
        let order = getState().order;
        //let tokenParam = tokenForAPI(null, order.order_token);
        //console.log(tokenParam)
        if (order.id === undefined) {
            console.log("voy a crear la orden")
            return createOrder(newOrderParams)
                .then((response) => {
                    //console.log("Se creo la orden")
                    console.log(response)
                    if (response.number === undefined){
                        console.log(error)
                        dispatch({ type: CREATING_ORDER_FAILURE });
                        return
                    }
                    else {
                        dispatch({ type: CREATING_ORDER_SUCCESS, payload: response });
                        order_number = response.number
                        order_token = response.token
                        console.log(order_number)
                        line_item = product.line_item
                        return addLineItem({line_item, order_number, order_token, product})
                            .then((response) => {
                                if(response.error === undefined){
                                    dispatch({ type: ADD_PRODUCT_TO_CART, payload: product })
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
        }
    };
};

export const removeProductFromCart = () => {
    return (dispatch) => {
        dispatch({ type: REMOVE_PRODUCT_FROM_CART });
    };
};

//------ Funciones privadas

const createOrder = (param) => {
    console.log("estoy en crear orden")
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
            console.log(response.body)
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
                console.log(response.body)
                //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                return response.body
            })
            // .catch((error) => {
            //     //dispatch({ type: DISPLAY_ERROR, payload: error})
            //     return error
            // })
}