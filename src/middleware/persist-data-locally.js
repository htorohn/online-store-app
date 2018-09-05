import { AsyncStorage } from "react-native"
import Expo from 'expo'

const persistDataLocally = (store) => (next) => async (action) => {
    //console.log("Estoy en persist Data")
    next(action)
    //console.log("store", JSON.stringify(store.getState()))
    const storage = Expo.SecureStore
    let data = {
        //"productsList": {},
        "cart": store.getState().cart,
        "order": store.getState().order
    }
    storage.setItemAsync('ecommerceState', JSON.stringify(data))
        .then(() => {
            console.log("El estado fue guardado")
        })
        .catch((error) => {
            console.log(error)
        })
    //localStorage['reduxStore'] = JSON.stringify(store.getState());
    // try {
    //     await AsyncStorage.setItem('reduxStore', JSON.stringify(store.getState()))
    //     console.log('se guardo el estado')
    // } catch (error) {
    // // Error saving data
    //     console.log("Error:", error)
    // }
    //console.log('Local Storage:', localStorage['reduxStore']);
  }
  
  export default persistDataLocally