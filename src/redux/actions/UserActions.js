import {
    //LOGIN_USER,
    //LOGIN_ERROR,
    LOGIN_SUCCESS,
    USER_ACTION,
    USER_SUCCESS,
    USER_ERROR
} from './types'
import { userApi } from '../../api/userApi'
//import { MAIN_URL } from '../../constants/Config'

export const login = (params) => {
    //console.log("estoy login", params)
    return (dispatch) => {
        dispatch({type: USER_ACTION})

        return userApi.login(params)
            .then((response) => {
                //console.log("action response", response)
                if (response.status == 200){
                    console.log("login", response.body)
                    // var timeStamp = Math.floor(Date.now() / 1000)
                    // console.info("time", timeStamp)
                    dispatch({ type: LOGIN_SUCCESS, payload: response.body })
                    userApi.getAccount(response.body.access_token)
                        .then((response) => {
                            dispatch({ type: USER_SUCCESS, payload: response })
                        })
                    return true
                } else {
                    //console.log("response", response.error)
                    dispatch({ type: USER_ERROR, payload: response.error })
                    return false
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}


export const register = (params) => {
    console.log("estoy register", params)
    return (dispatch) => {
        dispatch({type: USER_ACTION})
        return userApi.register(params)
            .then((response) => {
                console.log("action response", response)
                if (response.status == 200){
                    console.log("register", response.body)
                    dispatch({ type: USER_SUCCESS, payload: response.body })
                    return true
                } else {
                    //console.log("response", response.error)
                    dispatch({ type: USER_ERROR, payload: response.error })
                    return false
                }
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT })
    }
}

export const getValidToken = () => {
    return (dispatch, getState) => {
        const {token, token_created_at} = getState().user
        if (_.isEmpty(token)){
            return null
        }
        //Vamos a validar si el token todavia es valido. Si es valido lo retornamos, si no, hacemos un refresh
        var timeStamp = Math.floor(Date.now() / 1000)
        if ((token_created_at + token.expires_in) < timeStamp){
            return token.access_token
        } else {
            return userApi.refreshToken(token.refresh_token)
                .then((response) => {
                    console.log ("refresh token", response)
                    dispatch({ type: LOGIN_SUCCESS, payload: response.body })
                    return response.body.access_token
                })
                .catch((error) => {
                    console.log(error)
                    return null
                })
        }
    }
}