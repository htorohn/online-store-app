import {
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_ERROR,
    PRODUCTS_FETCHING,
    PRODUCT_DETAIL_FETCH_SUCCESS,
    PRODUCT_DETAIL_FETCH_ERROR,
    PRODUCT_DETAIL_FETCHING,
    LATEST_PRODUCTS_FETCH_SUCCESS
} from './types'
//import { makeClient } from '@spree/storefront-api-v2-sdk'
import { MAIN_URL } from '../../constants/Config'

export const productsFetch = () => {
    return (dispatch) => {
        dispatch({ type: PRODUCTS_FETCHING })
        var request = require('superagent')
        request
            .get(`${MAIN_URL}/api/v1/products`)
            .set('Content-Type', 'application/json')
            .then ((response) => {
                //console.log(response.body)
                dispatch({ type: PRODUCTS_FETCH_SUCCESS, payload: response.body })
            })
            .catch ((error) => {
                console.log(error);
                dispatch({ type: PRODUCTS_FETCH_ERROR, payload: error})
            })
    }
}

export const latestProductsFetch = () => {
    return (dispatch) => {
        dispatch({ type: PRODUCTS_FETCHING })
        var request = require('superagent')
        request
            .get(`${MAIN_URL}/api/v2/storefront/products`)
            .query( { 
                sort: "-updated_at",
                include: "images",
                page: 1,
                per_page: 10
            })
            .set('Content-Type', 'application/json')
            //.set('Access-Control-Allow-origin', '*')
            .then ((response) => {
                //console.log('product_action', response.body)
                dispatch({ type: LATEST_PRODUCTS_FETCH_SUCCESS, payload: response.body })
            })
            .catch ((error) => {
                console.log(error);
                dispatch({ type: PRODUCTS_FETCH_ERROR, payload: error})
            })
    }
}

export const productDetailFetch = (product) => {
    return (dispatch) => {
        dispatch({ type: PRODUCT_DETAIL_FETCHING })
        var request = require('superagent')
        request
            .get(`${MAIN_URL}/api/v2/products/${product}`)
            .query( { include: "default_variant,variants,option_types,product_properties,taxons,images" })
            .set('Content-Type', 'application/json')
            //.set('Access-Control-Allow-origin', '*')
            .then ((response) => {
                //console.log('product_action', response.body)
                dispatch({ type: PRODUCT_DETAIL_FETCH_SUCCESS, payload: response.body })
            })
            .catch ((error) => {
                console.log(error);
                dispatch({ type: PRODUCT_DETAIL_FETCH_ERROR, payload: error})
            })
    }
}

export const taxonProductsFetch = (taxon) => {
    return (dispatch) => {
        dispatch({ type: PRODUCTS_FETCHING })
        var request = require('superagent')
        request
            .get(`${MAIN_URL}/api/v2/storefront/products`)
            .set('Content-Type', 'application/json')
            .query({
                'filter[taxons]': taxon.id,
                'include': 'images'
            })
            .then ((response) => {
                //console.log("productos del taxon", response.body)
                dispatch({ type: PRODUCTS_FETCH_SUCCESS, payload: response.body })
            })
            .catch ((error) => {
                console.log(error);
                dispatch({ type: PRODUCTS_FETCH_ERROR, payload: error})
            })
    }
}