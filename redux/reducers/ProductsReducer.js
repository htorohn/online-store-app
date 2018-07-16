import {
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_ERROR,
    PRODUCTS_FETCHING
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    products: {},
    error: false

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCTS_FETCHING:
            return {
                ...state,
                isFetching: true,
                products: {}
            }
        case PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.payload
            }
        case PRODUCTS_FETCH_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state;
    }
};