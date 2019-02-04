import {
    LOGIN_USER,
    LOGIN_ERROR,
    LOGIN_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    id: null,
    email: '',
    spree_api_key: '',
    bill_address: null,
    ship_address: null,
    error: null,
    isLoggedIn: false,
    login_user: false
}

export default (state = INITIAL_STATE, action) => {
    //console.log("payload", action.payload)
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                login_user: true,
                error: null
            }

        case LOGIN_SUCCESS:
            const user = action.payload
            return {
                ...state,
                id: user.id,
                email: user.email,
                spree_api_key: user.spree_api_key,
                bill_address: user.bill_address,
                ship_address: user.ship_address,
                error: null,
                isLoggedIn: true,
                login_user: false
            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.payload,
                login_user: false
            }

        default:
            return state
    }
}