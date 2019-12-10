import _ from 'lodash'
import {
    CREATE_CART_SUCCESS,
    CREATE_CART_FAILURE,
    ADDING_PRODUCT_TO_CART,
    ADD_PRODUCT_TO_CART,
    ORDER_FETCHING,
    ORDER_FETCH_SUCCESS,
    ORDER_FETCH_FAILURE,
    DISPLAY_ERROR,
} from './types'
import { MAIN_URL } from '../../constants/Config'
import { Utils } from './utils'
import { cartApi } from '../../api/cartApi'

export const addProductToCart = (product) => {
    
    return (dispatch, getState) => {
        dispatch({ type: ADDING_PRODUCT_TO_CART, payload: true})
        let current_order = getState().cart.cart
        console.log("addproducttocart", current_order)
        const {line_item} = product
        let auth
        if (_.isEmpty(current_order)) {
            return cartApi.createCart()
                .then((response) => {
                    console.log("create cart", response.body)
                    if (response.status != 201){
                        dispatch({ type: CREATE_CART_FAILURE });
                        return
                    }
                    else {
                        dispatch({ type: CREATE_CART_SUCCESS, payload: response.body })
                        auth = Utils.tokenForAPI(getState().user, getState().cart.cart)
                        return cartApi.addLineItem({line_item, auth})
                            .then((response) => {
                                if(response.status == 200){
                                    dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                                    dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                                }
                                else {
                                    dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                                    dispatch({ type: DISPLAY_ERROR, payload: error})
                                }
                            })
                    }
                    
                })
        } else {
            auth = Utils.tokenForAPI(getState().user, getState().cart.cart)
            const current_item = Utils.lineItemExists(line_item, getState().cart.line_items)
            if (current_item === undefined){
                return cartApi.addLineItem({line_item, auth})
                    .then((response) => {
                        if(response.status == 200){
                            dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                            dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                        }
                        else {
                            dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                            dispatch({ type: DISPLAY_ERROR, payload: error})
                        }
                    })
            }
            else {
                console.log("El producto ya existe")
                line_item['quantity'] = line_item.quantity + current_item.quantity
                line_item['line_item_id'] = current_item.line_item_id
                return cartApi.updateLineItem({line_item, auth})
                    .then((response) => {
                        if(response.status == 200){
                            dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                            dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                        }
                        else {
                            dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                            dispatch({ type: DISPLAY_ERROR, payload: "error"})
                        }
                    })
                    .catch((error) => {
                        console.log ("catch - ", error)
                        dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                        dispatch({ type: DISPLAY_ERROR, payload: "error"})
                    })
            }
        }
    }
}

export const updateProductOnCart = (product) => {
    return (dispatch, getState) => {
        dispatch({ type: ADDING_PRODUCT_TO_CART, payload: true})
        const {line_item} = product
        let auth = Utils.tokenForAPI(getState().user, getState().cart.cart)
        const current_item = Utils.lineItemExists(line_item, getState().cart.line_items)
        line_item['line_item_id'] = current_item.line_item_id
        return cartApi.updateLineItem({line_item, auth})
            .then((response) => {
                if(response.status == 200){
                    dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                    dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                }
                else {
                    dispatch({ type: DISPLAY_ERROR, payload: "error"})
                }
            })
            .catch((error) => {
                console.log ("catch - ", error)
                dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                dispatch({ type: DISPLAY_ERROR, payload: "error"})
            })
    }

}

export const removeProductFromCart = (product) => {
    return (dispatch, getState) => {
        dispatch({ type: ADDING_PRODUCT_TO_CART, payload: true})
        const {item_id} = product
        let auth = Utils.tokenForAPI(getState().user, getState().cart.cart)
        return cartApi.removeLineItem({item_id, auth})
            .then((response) => {
                if(response.status == 200){
                    dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body })
                    dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                }
                else {
                    dispatch({ type: ADDING_PRODUCT_TO_CART, payload: false })
                    dispatch({ type: DISPLAY_ERROR, payload: response.error})
                }
            })
    }
}