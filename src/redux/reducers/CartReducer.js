import {
    CREATE_CART_SUCCESS,
    CREATE_CART_FAILURE,
    ADDING_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    UPDATE_PRODUCT_ON_CART
} from '../actions/types'
import {Utils} from '../actions/utils'

const INITIAL_STATE = {
    itemCount: 0,
    // //cartTotal: 0,
    line_items: [],
    // checkout_steps: [],
    // shipments: [],
    addingProductToCart: false,
    cart: {}

};

export default (state = INITIAL_STATE, action) => {
    
    let newLineItems = Object.assign([], state.line_items);
    switch (action.type) {
        case CREATE_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload
            }

        case ADDING_PRODUCT_TO_CART:
            return {
                ...state,
                addingProductToCart: action.payload
            }
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                //itemCount: state.itemCount + action.payload.quantity,
                itemCount: action.payload.data.attributes.item_count,
                cart: action.payload,
                line_items: Utils.getLineItemsArray(action.payload)
                //line_items: [...state.line_items, action.payload],
            }
        case REMOVE_PRODUCT_FROM_CART:
            let i = state.line_items.map((item)=> item.id).indexOf(action.payload)
            let newQty = state.itemCount - state.line_items[i].quantity

            newLineItems = newLineItems.filter( (lineItem) => {
                return lineItem.id !== action.payload
              });
        
            //return Object.assign ( {}, state, { line_items: newLineItems, itemCount: newCount });

            return {
                ...state,
                line_items: newLineItems,
                itemCount: newQty
            }
        case UPDATE_PRODUCT_ON_CART:
            let index = state.line_items.map((item)=> item.id).indexOf(action.payload.id)
            var updatedLineItems = Object.assign ([], state.line_items)
            updatedLineItems.splice(index, 1, action.payload)
            let newCount = updatedLineItems.reduce((count, item) => count + item.quantity,0)
            return {
                ...state,
                line_items: updatedLineItems,
                itemCount: newCount
            }

        default:
            return state
    }
};