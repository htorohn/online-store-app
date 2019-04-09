import {
    LOGIN_USER,
    //LOGIN_ERROR,
    LOGIN_SUCCESS,
    USER_ACTION,
    USER_SUCCESS,
    USER_ERROR
} from './types'
import { userApi } from '../../api/userApi'
import { MAIN_URL } from '../../constants/Config'

export const login = (params) => {
    //console.log("estoy login", params)
    return (dispatch) => {
        dispatch({type: USER_ACTION})

        return userApi.login(params)
            .then((response) => {
                //console.log("action response", response)
                if (response.status == 200){
                    //console.log("login", response)
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

        // try{
        //     const token = userApi.login(params)
          
        //     const account = userApi.getAccount({
        //         bearerToken: token.access_token
        //     })

        //     dispatch({ type: LOGIN_SUCCESS, payload: token })
        //     dispatch({ type: USER_SUCCESS, payload: account })

        // } catch(error){
        //     console.error(error)
        //     dispatch({ type: USER_ERROR, payload: error })
        // }
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