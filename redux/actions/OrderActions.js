import {
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART
} from './types';
import { MAIN_URL } from '../../constants/Config';
import { _HEADERS } from '../../constants/Headers';

export const addProductToCart = (item) => {
    
    return (dispatch, getState) => {
        console.log("Number: " + getState().order.id)
        // const params = {
        //     "order": {
        //         "order_token": ""
        //     }
        // };
        // if (getState().order.id === undefined) {
        //     createOrder(params);
        // }
        dispatch({ type: ADD_PRODUCT_TO_CART });
    };
};

export const removeProductFromCart = () => {
    return (dispatch) => {
        dispatch({ type: REMOVE_PRODUCT_FROM_CART });
    };
};

//------ Funciones privadas

function createOrder(order){
    return (dispatch) => {
        dispatch({ type: CREATING_ORDER });
        axios.post(`${MAIN_URL}/api/v1/orders`, order, _HEADERS)
            .then(response => {
                //console.log(response);
                dispatch({ type: CREATING_ORDER_SUCCESS, payload: response });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: CREATING_ORDER_ERROR, payload: error})
            });
    };
};
