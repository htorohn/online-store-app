import {
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_ERROR,
    PRODUCTS_FETCHING
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
                console.log("productos del taxon", response.body)
                dispatch({ type: PRODUCTS_FETCH_SUCCESS, payload: response.body })
            })
            .catch ((error) => {
                console.log(error);
                dispatch({ type: PRODUCTS_FETCH_ERROR, payload: error})
            })
    }
}