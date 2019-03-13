import { MAIN_URL } from '../constants/Config'

export const userApi = {

    login: (params) => {
        var request = require('superagent')
        return request
            .post(`${MAIN_URL}/api/users/sign_in`)
            .set('Content-Type', 'application/json')
            .send({
                "user": {
                    "email": params.email,
                    "password": params.password
                }
            })
            .then((response) => {
                //console.log("response api", response)
                return response
            })
            .catch((error) => {
                //console.log("error", Object.keys(error), error.response, error)
                
                return error.response
            })
    },

    register: (params) => {
        var request = require('superagent')
        return request
            .post(`${MAIN_URL}/api/users/register`)
            .set('Content-Type', 'application/json')
            .send({
                "user": {
                    "email": params.email,
                    "password": params.password,
                    "password_confirmation": params.password_confirmation
                }
            })
            .then((response) => {
                //console.log("response api", response)
                return response
            })
            .catch((error) => {
                //console.log("error", Object.keys(error), error.response, error)
                
                return error.response
            })
    }
}