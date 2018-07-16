import axios from 'axios';
import {
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_ERROR,
    PRODUCTS_FETCHING
} from './types';
import { MAIN_URL } from '../../constants/Config';

export const productsFetch = () => {
    return (dispatch) => {
        dispatch({ type: PRODUCTS_FETCHING });
        axios.get(`${MAIN_URL}/api/v1/products`)
            .then(response => {
                dispatch({ type: PRODUCTS_FETCH_SUCCESS, payload: response });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: PRODUCTS_FETCH_ERROR, payload: error})
            });
    };
};
