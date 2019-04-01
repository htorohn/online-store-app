import {
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_ERROR,
    PRODUCTS_FETCHING,
    LATEST_PRODUCTS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    products: {},
    latestProducts:{},
    error: false

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCTS_FETCHING:
            return {
                ...state,
                isFetching: true,
                error:false,
                products: {}
            }
        case PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                products: action.payload
            }
        case LATEST_PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                latestProducts: action.payload
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