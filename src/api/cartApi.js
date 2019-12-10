import { MAIN_URL } from '../constants/Config'

export const cartApi = {

    createCart: () => {
        var request = require('superagent')
        return request
            .post(`${MAIN_URL}/api/v2/storefront/cart`)
            .set('Content-Type', 'application/json')
            .query({ include: 'line_items,variants,variants.images' })
            .then((response) => {
                return response
            })
            .catch((error) => {
                console.error(error)
            })
    },

    addLineItem: (params) => {
        var request = require('superagent')
        return request
            .post(`${MAIN_URL}/api/v2/storefront/cart/add_item`)
            .set(params.auth)
            .set('Content-Type', 'application/json')
            .query({
                variant_id: params.line_item.variant_id,
                quantity: params.line_item.quantity
            })
            .query({ include: 'line_items,variants,variants.images,variants.product' })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return {error}
            })
    },

    updateLineItem: (params) => {
        var request = require('superagent')
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
                return response
            })
            .catch((error) => {
                return {error}
            })
    },

    removeLineItem: (params) => {
        var request = require('superagent')
        return request
            .delete(`${MAIN_URL}/api/v2/storefront/cart/remove_line_item/${params.item_id}`)
            .set(params.auth)
            .set('Content-Type', 'application/json')
            .query({ include: 'line_items,variants,variants.images' })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return {error}
            })
    },

    getCart: (params) => {
        var request = require('superagent')
        return request
            .get(`${MAIN_URL}/api/v2/storefront/cart`)
            .set(params.auth)
            .set('Content-Type', 'application/json')
            .query({ include: 'line_items,variants,variants.images,variants.product' })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return {error}
            })
    }

}