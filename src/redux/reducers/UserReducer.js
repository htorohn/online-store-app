import {
    LOGIN_USER,
    //LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_USER,
    REGISTER_SUCCESS,
    USER_ACTION,
    USER_SUCCESS,
    USER_ERROR
} from '../actions/types'
//import console = require('console');
//import console = require('console');

const INITIAL_STATE = {
    id: null,
    email: '',
    token: {},
    token_created_at: null,
    spree_api_key: '',
    bill_address: null,
    ship_address: null,
    error: null,
    isLoggedIn: false,
    loading_user: false
}

export default (state = INITIAL_STATE, action) => {
    //console.log("payload", action.payload)
    let user
    switch (action.type) {
        case USER_ACTION:
            return {
                ...state,
                loading_user: true,
                error: null
            }

        case LOGIN_SUCCESS:
            //user = action.payload
            console.log("Estoy en login_success")
            var timeStamp = Math.floor(Date.now() / 1000)
            console.info("time", timeStamp)
            return {
                ...state,
                token: action.payload,
                token_created_at: timeStamp,
                error: null,
                isLoggedIn: true,
                loading_user: false
            }
        
        case LOGOUT:
            return INITIAL_STATE
       
        case USER_SUCCESS:
            console.log("user reducer", action.payload)
            user = action.payload
            return {
                ...state,
                id: user.data.id,
                email: user.data.attributes.email,
                //spree_api_key: user.spree_api_key,
                //bill_address: user.bill_address,
                //ship_address: user.ship_address,
                error: null,
                isLoggedIn: true,
                login_user: false
            }

        // case REGISTER_USER:
        //     return {
        //         ...state,
        //         login_user: true,
        //         error: null
        //     }

        
        case USER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading_user: false,
                user: {}
            }

        default:
            return state
    }
}