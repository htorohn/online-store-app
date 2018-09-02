import {
    CREATING_ORDER,
    CREATING_ORDER_SUCCESS,
    CREATING_ORDER_ERROR,
    ORDER_FETCHING,
    ORDER_FETCH_SUCCESS,
    ORDER_FETCH_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    isCreating: false,
    orderNumber: "",
    order: {},
    error: false

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATING_ORDER:
            return {
                ...state,
                isCreating: true,
                //products: {}
            }
        case CREATING_ORDER_SUCCESS:
            return {
                ...state,
                isCreating: false,
                orderNumber: action.payload.number,
                order: action.payload,
                error: false
            }
        case CREATING_ORDER_ERROR:
            return {
                ...state,
                isCreating: false,
                error: true
            }
        case ORDER_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case ORDER_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                order: payload,
                error: false
            }
        case ORDER_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state;
    }
};