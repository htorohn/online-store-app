import { MAIN_URL } from '../constants/Config'

export const userApi = {

    login: (params) => {
        var request = require('superagent')
        return request
            .post(`${MAIN_URL}/spree_oauth/token`)
            .set('Content-Type', 'application/json')
            .query({
                grant_type: 'password',
                username: params.email,
                password: params.password
            })
            .then((response) => {
                console.log("response api", response.body)
                return response
            })
            .catch((error) => {
                //console.log("error", Object.keys(error), error.response, error)  
                return error.response
            })
    },

    refreshToken: (params) => {
        var request = require('superagent')
        return request
            .post(`${MAIN_URL}/spree_oauth/token`)
            .set('Content-Type', 'application/json')
            .query({
                grant_type: 'refresh_token',
                refresh_token: params,
            })
            .then((response) => {
                console.log("response api", response.body)
                return response
            })
            .catch((error) => {
                //console.log("error", Object.keys(error), error.response, error)  
                return error.response
            })
    },

    getAccount: (params) => {
        var request = require('superagent')
        return request
            .get(`${MAIN_URL}/api/v2/storefront/account`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${params}`)
            // .query({
            //     grant_type: 'password',
            //     username: params.email,
            //     password: params.password
            // })
            
            .then((response) => {
                console.log("get account", response.body)
                return response.body
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