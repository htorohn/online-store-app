import { MAIN_URL } from '../constants/Config'

export const cartApi = {

    createCart: () => {
        //console.log("estoy en crear orden")
        var request = require('superagent')
        return request
            .post(`${MAIN_URL}/api/v2/storefront/cart`)
            .set('Content-Type', 'application/json')
            // .send({
            //     "order": {
            //         "order_token": ""
            //     }
            // })
            .then((response) => {
                return response.body;
            })
            .catch((error) => {
                console.error(error)
            })
    },

    // addLineItem: (params) => {
    //     var request = require('superagent')
    //         //const tokenParam = { order_token: params.order_token }
    //         return request
    //             .post(`${MAIN_URL}/api/v1/orders/${params.order_number}/line_items`)
    //             //.query(tokenParam)
    //             .query({
    //                 line_item: {
    //                     variant_id: params.line_item.variant_id,
    //                     quantity: params.line_item.quantity
    //                 },
    //                 order_token: params.order_token
    //             })
    //             .set('Content-Type', 'application/json')
    //             .then((response) => {
    //                 //console.log("add line item", response.body)
    //                 //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
    //                 return response.body
    //             })
    //             .catch((error) => {
    //                 //dispatch({ type: DISPLAY_ERROR, payload: error})
                    
    //                 return {error}
    //             })
    // },

    addLineItem: (params) => {
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
                    //console.log("add line item", response.body)
                    //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                    return response.body
                })
                .catch((error) => {
                    //dispatch({ type: DISPLAY_ERROR, payload: error})
                    
                    return {error}
                })
    },

    updateLineItem: (params) => {
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
                    //console.log("update line item", response.body)
                    //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                    return response.body
                })
                .catch((error) => {
                    //dispatch({ type: DISPLAY_ERROR, payload: error})
                    //console.log(error)
                    return {error}
                })
    },

    removeLineItem: (params) => {
        var request = require('superagent')
            //const tokenParam = { order_token: params.order_token }
            //console.log("voy a borrar el item", params)
            const {order_number, order_token, item_id} = params
            return request
                .delete(`${MAIN_URL}/api/v1/orders/${order_number}/line_items/${item_id}`)
                //.query(tokenParam)
                .query({
                    // line_item: {
                    //     variant_id: params.line_item.variant_id,
                    //     quantity: params.line_item.quantity
                    // },
                    order_token: order_token
                })
                .set('Content-Type', 'application/json')
                .then((response) => {
                    //console.log("delete line item", response.body)
                    //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                    return response.body
                })
                .catch((error) => {
                    //dispatch({ type: DISPLAY_ERROR, payload: error})
                    //console.log("error", error)
                    return {error}
                })
    },

    lineItemExists: (line_item, cart) => {
        const resultado = cart.find(item => item.variant_id === line_item.variant_id)
        return resultado
        // console.log("resultado", resultado)
        // if (resultado === undefined){
        //     return false
        // }
        // return true
    }

}