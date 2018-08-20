import {
    CREATING_ORDER,
    CREATING_ORDER_SUCCESS,
    CREATING_ORDER_ERROR
} from '../actions/types';

const INITIAL_STATE = {
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
                //orderNumber: action.payload.number,
                order: action.payload
            }
        case CREATING_ORDER_ERROR:
            return {
                ...state,
                isCreating: false,
                error: true
            }
        default:
            return state;
    }
};