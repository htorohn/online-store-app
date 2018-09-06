import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { AsyncStorage } from "react-native"
import { AppLoading, Asset, Font, Icon, SecureStore } from 'expo'
import reducers from './src/redux/reducers'
//import AppNavigator from './navigation/AppNavigator';
import AppNavigator from './src/navigation/Router'
import persistDataLocally from './src/middleware/persist-data-locally'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    initial_state: {}
  };

  render() {

    //var initial_state = this._loadInitialState()
    //console.log('initial_state', initial_state)
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      const store = createStore(reducers, this.state.initial_state, applyMiddleware(ReduxThunk, persistDataLocally));
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>          
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // Asset.loadAsync([
      //   require('./src/assets/images/robot-dev.png'),
      //   require('./src/assets/images/robot-prod.png'),
      // ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
        'Roboto': require("native-base/Fonts/Roboto.ttf"),
        'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf")
      }),
      SecureStore.getItemAsync('ecommerceState')
        .then((ecommerceState) => {
          //console.log("ecommerce", ecommerceState)
          if (ecommerceState !== null){
            this.setState({initial_state: JSON.parse(ecommerceState)})
          }
        })
        .catch((error) => {
          console.log(error)
        })
    ]);
  }

  // _loadInitialState = async () => {
  //   console.log("Vamos a obtener el estado")
  //   try {
  //     const retrievedState = await AsyncStorage.getItem('reduxStore')
  //     if (retrievedState !== null) {
  //       // We have data!!
  //       console.log("initial_State", retrievedState)
  //       return retrievedState
  //     } else {
  //       return {}
  //     }
  //    } catch (error) {
  //      console.log('error:', error)
  //      return {}
  //      // Error retrieving data
  //    }
  // };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
