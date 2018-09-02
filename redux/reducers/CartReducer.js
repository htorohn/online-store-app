import {
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART
} from '../actions/types';

const INITIAL_STATE = {
    itemCount: 0,
    cartTotal: 0,
    cart: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                itemCount: state.itemCount + action.payload.line_item.quantity,
                cart: [...state.cart, action.payload],
                cartTotal: state.cartTotal + action.payload.variant.price *  action.payload.line_item.quantity
            }
        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                itemCount: state.itemCount - 1
            }
        default:
            return state;
    }
};