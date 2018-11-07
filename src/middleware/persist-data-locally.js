import Expo from 'expo'

const persistDataLocally = (store) => (next) => async (action) => {
    next(action)
    const storage = Expo.SecureStore
    let data = {
        //"productsList": {}, Este campo no se guarda, para que al iniciar la 
        //aplicacion se actualice la lista de productos
        "cart": store.getState().cart,
        "order": store.getState().order
    }
    //console.log("form", store.getState().form)
    storage.setItemAsync('ecommerceState', JSON.stringify(data))
        .then(() => {
            console.log("El estado fue guardado")
        })
        .catch((error) => {
            console.log(error)
        })
  }
  
  export default persistDataLocally