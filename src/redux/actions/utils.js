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
    }
    
  }
  
  const {tokenForAPI, newOrderParams} = Utils.tokenForAPI;
  
  export { tokenForAPI, newOrderParams };