import { combineReducers } from 'redux';
import ProductsReducer from './ProductsReducer';
import CartReducer from './CartReducer';

export default combineReducers({
    productsList: ProductsReducer,
    cart: CartReducer
});