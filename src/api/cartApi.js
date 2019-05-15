import { MAIN_URL } from '../constants/Config'

export const cartApi = {

    createCart: () => {
        console.log("estoy en crear orden")
        var request = require('superagent')
        return request
            .post(`${MAIN_URL}/api/v2/storefront/cart`)
            .set('Content-Type', 'application/json')
            .query({ include: 'line_items,variants,variants.images' })
            // .send({
            //     "order": {
            //         "order_token": ""
            //     }
            // })
            .then((response) => {
                return response
            })
            .catch((error) => {
                console.error(error)
            })
    },

    addLineItem: (params) => {
        console.log("add line item", params)
        var request = require('superagent')
            //const tokenParam = { order_token: params.order_token }
            return request
                .post(`${MAIN_URL}/api/v2/storefront/cart/add_item`)
                //.query(tokenParam)
                .set(params.auth)
                .set('Content-Type', 'application/json')
                .query({
                    variant_id: params.line_item.variant_id,
                    quantity: params.line_item.quantity
                })
                .query({ include: 'line_items,variants,variants.images,variants.product' })
                .then((response) => {
                    //console.log("item added", response)
                    //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                    return response
                })
                .catch((error) => {
                    //dispatch({ type: DISPLAY_ERROR, payload: error})
                    
                    return {error}
                })
    },

    updateLineItem: (params) => {
        var request = require('superagent')
            //const tokenParam = { order_token: params.order_token }
            //const {newQty, line_item, order_number, order_token, item_id} = params
            console.log("update - ", params)
            return request
                .patch(`${MAIN_URL}/api/v2/storefront/cart/set_quantity`)
                .set(params.auth)
                .set('Content-Type', 'application/json')
                .query({
                    line_item_id: params.line_item.line_item_id,
                    quantity: params.line_item.quantity
                })
                .query({ include: 'line_items,variants,variants.images' })
                .then((response) => {
                    console.log("update line item", response.body)
                    //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                    return response
                })
                .catch((error) => {
                    //dispatch({ type: DISPLAY_ERROR, payload: error})
                    console.log(error)
                    return {error}
                })
    },

    removeLineItem: (params) => {
        var request = require('superagent')
            //const tokenParam = { order_token: params.order_token }
            //console.log("voy a borrar el item", params)
            //const {order_number, order_token, item_id} = params
            return request
                .delete(`${MAIN_URL}/api/v2/storefront/cart/remove_line_item/${params.item_id}`)
                .set(params.auth)
                .set('Content-Type', 'application/json')
                .query({ include: 'line_items,variants,variants.images' })
                .then((response) => {
                    console.log("delete line item", response.body)
                    //dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                    return response
                })
                .catch((error) => {
                    //dispatch({ type: DISPLAY_ERROR, payload: error})
                    //console.log("error", error)
                    return {error}
                })
    }

}