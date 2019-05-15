//import React from 'react'
//import { connect } from 'react-redux'
import _ from 'lodash'
import { userApi } from '../../api/userApi'
import { LOGIN_SUCCESS, USER_ERROR } from './types';
//import console = require('console');

export const Utils ={
    
  tokenForAPI: (user, orderToken) => {
      let tokenParam = {};
      //console.log ("utils - user", user)
      //console.log ("utils - order", orderToken)
      if (_.isEmpty(user.token)){ //si no hay usuario loggeado, usamos el token de la orden
        tokenParam = { "X-Spree-Order-Token": orderToken.data.attributes.token }
      }
      else {
        tokenParam = { 'Authorization': 'Bearer ' + user.token.access_token }
        // //Vamos a validar si el token todavia es valido. Si es valido lo retornamos, si no, hacemos un refresh
        // var timeStamp = Math.floor(Date.now() / 1000)
        // if ((user.token_created_at + user.token.expires_in) > timeStamp){
        //   tokenParam = { 'Authorization': 'Bearer ' + user.token.access_token }
        // } else {
        //     userApi.refreshToken(user.token.refresh_token)
        //         .then((response) => {
        //             console.log ("refresh token", response.body)
        //             dispatch({ type: LOGIN_SUCCESS, payload: response.body })

        //             tokenParam = { 'Authorization': 'Bearer ' + user.token.access_token } //debo cambiar el token aqui poruqe user no se ha actualizado
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //             dispatch({ type: USER_ERROR, payload: error})
        //             tokenParam = null
        //         })
        // }

        // if ( !_.isEmpty(orderToken) ) {
        //   tokenParam = { "X-Spree-Order-Token": orderToken.data.attributes.token };
        // }
      }
  
      return tokenParam;
    },

    getProductArray: (products) => {
      //console.log("productos en utils",products)
      return _.map(products.data, (product) => {
        return {
          id: product.id,
          name: product.attributes.name,
          slug: product.attributes.slug,
          display_price: product.attributes.display_price,
          image: product.relationships.images.data === null 
            ? null 
            : products.included.find((image) => image.id === product.relationships.images.data[0].id)
        }
      })
    },

    getLineItemsArray: (cart) => {
      console.log("getLineItemArray", cart)
      return _.compact(_.map(cart.included, (product) => {
        console.log("product - ", product)
        if (product.type == "line_item"){
          const current_variant = cart.included.find((variant) => (variant.id == product.relationships.variant.data.id && variant.type == "variant"))
          const current_images = cart.included.find((image) => (image.id == current_variant.relationships.images.data[0].id && image.type == "image"))
          return {
            line_item_id: product.id,
            slug: product.attributes.slug,
            variant_id: product.relationships.variant.data.id,
            variant: current_variant,
            images: current_images,
            quantity: product.attributes.quantity
          }
        } else { return }
      }))
    },

    lineItemExists: (line_item, cart) => {
      
      //console.log ("line_item - ", line_item)
      //console.log ("cart - ", cart)
      const resultado = cart.find(item => item.variant_id == line_item.variant_id)
      return resultado
      // console.log("resultado", resultado)
      // if (resultado === undefined){
      //     return false
      // }
      // return true
    }
    
  }

  // const mapStateToProps = (state) => {
  //   return state
  // }

  // export default connect(mapStateToProps, null)(Utils)