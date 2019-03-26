import { combineReducers } from 'redux'
import ProductsReducer from './ProductsReducer'
import ProductDetailReducer from './ProductDetailReducer'
import CartReducer from './CartReducer'
import OrderReducer from './OrderReducer'
import TaxonomiesReducer from './TaxonomiesReducer'
import UserReducer from './UserReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    productsList: ProductsReducer,
    productDetail: ProductDetailReducer,
    cart: CartReducer,
    order: OrderReducer,
    taxonomies:  TaxonomiesReducer,
    user: UserReducer,
    form: formReducer
});