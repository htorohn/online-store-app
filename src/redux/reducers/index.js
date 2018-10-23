import { combineReducers } from 'redux';
import ProductsReducer from './ProductsReducer';
import CartReducer from './CartReducer';
import OrderReducer from './OrderReducer';
import TaxonomiesReducer from './TaxonomiesReducer';

export default combineReducers({
    productsList: ProductsReducer,
    cart: CartReducer,
    order: OrderReducer,
    taxonomies:  TaxonomiesReducer,
    user: {token:null}
});