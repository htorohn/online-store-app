import {
    LOGIN_USER,
    LOGIN_ERROR,
    LOGIN_SUCCESS
} from './types'
import { userApi } from '../../api/userApi'

export const login = (params) => {
    console.log("estoy login", params)
    return (dispatch) => {
        dispatch({type: LOGIN_USER})
        return userApi.login(params)
            .then((response) => {
                if (response.status == 200){
                    console.log("login", response)
                    dispatch({ type: LOGIN_SUCCESS, payload: response.body })
                } else {
                    console.log("response", response.error)
                    dispatch({ type: LOGIN_ERROR, payload: response.error })
                }
            })
    }
}