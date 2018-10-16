import React from 'react';
import { Scene, Router, Stack, Drawer, Overlay, Modal, Lightbox } from 'react-native-router-flux'
import { StackViewStyleInterpolator } from 'react-navigation-stack';
//import { Text, Badge } from 'native-base'
import NavBar from './NavBar'
import DrawerMenu from './DrawerMenu'

import ProductsList from '../screens/HomeScreen/ProductsList'
import ProductDetail from '../screens/HomeScreen/ProductDetail'
import Cart from '../screens/CartScreen/Cart'
import LinksScreen from '../screens/LinksScreen';
import RightMenu from './RightMenu'
//import SettingsScreen from '../screens/SettingsScreen';
//import User from './components/User';

//import BadgedTabBarIcon from '../components/BadgedTabBarIcon';

const transitionConfig = () => ({
    screenInterpolator:
      StackViewStyleInterpolator.forFadeFromBottomAndroid,
  });

const AppNavigator = () => {
    return (
      <Router sceneStyle={{ backgroundColor: 'white' }}>
            
                <Scene key="drawer"  hideNavBar drawer contentComponent={DrawerMenu} initial drawerPosition="left" drawerWidth={200} drawerLabel="Hi"
                            >
                    <Stack key="root" >
                    <Scene
                        key="ProductsList"
                        component={ProductsList}
                        title="My Shop"
                        navBar={NavBar}
                        
                        //iconName='home'
                    />
                    <Scene
                        key="ProductDetail"
                        component={ProductDetail}
                        title="My Shop"
                        navBar={NavBar}
                    />
                    <Scene
                        key="Cart"
                        component={Cart}
                        navBar={NavBar}
                        //title="My Shop"
                        title="Carrito de Compra"
                        //focused
                        //onEnter={this.onEnterCart}
                    //iconName='links'
                    />
                    </Stack>
                </Scene>                    
        {/* </Scene> */}
      </Router>
    )
}

export default AppNavigator
