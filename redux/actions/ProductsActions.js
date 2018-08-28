import {
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_ERROR,
    PRODUCTS_FETCHING
} from './types';
import { MAIN_URL } from '../../constants/Config';

export const productsFetch = () => {
    return (dispatch) => {
        dispatch({ type: PRODUCTS_FETCHING });
        var request = require('superagent')
        request
            .get(`${MAIN_URL}/api/v1/products`)
            .set('Content-Type', 'application/json')
            .then ((response) => {
                //console.log(response.body)
                dispatch({ type: PRODUCTS_FETCH_SUCCESS, payload: response.body });
            })
            .catch ((error) => {
                console.log(error);
                dispatch({ type: PRODUCTS_FETCH_ERROR, payload: error})
            })
    };
};
