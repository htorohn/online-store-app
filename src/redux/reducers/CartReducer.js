import {
    ADDING_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    UPDATE_PRODUCT_ON_CART
} from '../actions/types';

const INITIAL_STATE = {
    itemCount: 0,
    //cartTotal: 0,
    line_items: [],
    checkout_steps: [],
    shipments: [],
    addingProductToCart: false

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADDING_PRODUCT_TO_CART:
            return {
                ...state,
                addingProductToCart: action.payload
            }
        case ADD_PRODUCT_TO_CART:
            //console.log("en el reducer", action.payload)
            return {
                ...state,
                itemCount: state.itemCount + action.payload.quantity,
                line_items: [...state.line_items, action.payload],
                //cart: cart.push.apply(cart, action.payload),
                //cartTotal: state.cartTotal + action.payload.variant.price *  action.payload.line_item.quantity
            }
        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                itemCount: state.itemCount - 1
            }
        case UPDATE_PRODUCT_ON_CART:
            console.log("response on reducer", action.payload)
            let index = state.line_items.map((item)=> item.id).indexOf(action.payload.id)
            var updatedLineItems = Object.assign ([], state.line_items)
            updatedLineItems.splice(index, 1, action.payload)
            return {
                ...state,
                line_items: updatedLineItems
            }

        default:
            return state;
    }
};