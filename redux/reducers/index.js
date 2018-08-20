import { combineReducers } from 'redux';
import ProductsReducer from './ProductsReducer';
import CartReducer from './CartReducer';
import OrderReducer from './OrderReducer';

export default combineReducers({
    productsList: ProductsReducer,
    cart: CartReducer,
    order: OrderReducer
});