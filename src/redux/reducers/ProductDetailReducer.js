import {
    PRODUCT_DETAIL_FETCH_SUCCESS,
    PRODUCT_DETAIL_FETCH_ERROR,
    PRODUCT_DETAIL_FETCHING
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    product: {},
    error: false

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_FETCHING:
            return {
                ...state,
                isFetching: true,
                error:false,
                product: {}
            }
        case PRODUCT_DETAIL_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                product: action.payload
            }
        case PRODUCT_DETAIL_FETCH_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
};