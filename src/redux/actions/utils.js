import _ from 'lodash'

const Utils = {
    tokenForAPI: (userToken, orderToken) => {
      let tokenParam = {};
  
      if ( userToken ) {
        tokenParam = { token: userToken };
      }
      else {
        if ( orderToken ) {
          tokenParam = { order_token: orderToken };
        }
      }
  
      return tokenParam;
    },
    newOrderParams: () => {
        const params = {
            "order": {
                "order_token": ""
            }
        };
        return params;
    },

    getProductArray: (products) => {
      console.log("productos en utils",products)
      return _.map(products.data, (product) => {
        return {
          id: product.id,
          name: product.attributes.name,
          display_price: product.attributes.display_price,
          image: product.relationships.images.data === null 
            ? null 
            : products.included.find((image) => image.id === product.relationships.images.data[0].id)
        }
      })
    }
    
  }
  
  const {tokenForAPI, newOrderParams, getProductArray} = Utils
  
  export { tokenForAPI, newOrderParams, getProductArray };