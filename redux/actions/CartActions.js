import {
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART
} from './types';

export const addProductToCart = () => {
    return (dispatch) => {
        dispatch({ type: ADD_PRODUCT_TO_CART });
    };
};

export const removeProductFromCart = () => {
    return (dispatch) => {
        dispatch({ type: REMOVE_PRODUCT_FROM_CART });
    };
};