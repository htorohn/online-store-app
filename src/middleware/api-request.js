import {
    ADDING_PRODUCT_TO_CART,
    LOGIN_SUCCESS,
    USER_ERROR,
    ADD_PRODUCT_TO_CART
} from '../redux/actions/types'
import { userApi } from '../api/userApi'
import { cartApi } from '../api/cartApi'
import { Utils } from '../redux/actions/utils'

export const tokenRefresh = (store) => (next) => (action) => {
    console.log ("api-request-mdw", action)
    //en este arreglo voy a poner todas las acciones qeu necesitan validar el token
    const validate_actions = [
        ADDING_PRODUCT_TO_CART
    ]
    const {user} = store.getState()
    if (validate_actions.includes(action.type)){
        console.log("vamos a validar el token", user)
        //if (!_.isEmpty(user.token)){ //si no hay usuario loggeado, usamos el token de la orden
        if (user.isLoggedIn) {
        //Vamos a validar si el token todavia es valido. Si es valido lo retornamos, si no, hacemos un refresh
            var timeStamp = Math.floor(Date.now() / 1000)
            console.log("timestamp", timeStamp)
            if ((user.token_created_at + user.token.expires_in) <= timeStamp){
                
                console.log("vamos a traer un nuevo token", user.token.refresh_token)
                const { refresh_token } = user.token
                userApi.refreshToken(refresh_token)
                    .then((response) => {
                        console.log ("refresh token", response.body)
                        store.dispatch({ type: LOGIN_SUCCESS, payload: response.body })
                        
                        //tokenParam = { 'Authorization': 'Bearer ' + user.token.access_token } //debo cambiar el token aqui poruqe user no se ha actualizado
                    })
                    .catch((error) => {
                        console.log(error)
                        store.dispatch({ type: USER_ERROR, payload: error})
                        tokenParam = null
                    })
            }
        }
    }
    next(action)
}

export const cartRequest = (store) => (next) => (action) => {
    next(action)
    const validate_actions = [
        LOGIN_SUCCESS
    ]
    const {user, cart} = store.getState()
    if (validate_actions.includes(action.type)){
        auth = Utils.tokenForAPI(user, cart.cart)
        cartApi.getCart({auth})
            .then((response) => {
                store.dispatch({ type: ADD_PRODUCT_TO_CART, payload: response.body})
            })
            .catch((error) => {
                console.log(error)
            })
    }
}