import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
//import { Text, Badge } from 'native-base'
import ProductsList from '../screens/HomeScreen/ProductsList'
import ProductDetail from '../screens/HomeScreen/ProductDetail'
import Cart from '../screens/CartScreen/Cart'
import LinksScreen from '../screens/LinksScreen';
import RightMenu from './RightMenu'
//import SettingsScreen from '../screens/SettingsScreen';
//import User from './components/User';
import NavBar from './NavBar'
//import BadgedTabBarIcon from '../components/BadgedTabBarIcon';

const AppNavigator = () => {
    return (
      <Router sceneStyle={{ backgroundColor: 'white' }}>
        {/* <Stack key="root" hideTabBar headerLayoutPreset="center">
              <Scene key="productsList" title="Products" navBar={NavBar} component={ProductsList}/>
              <Scene key="productDetail" navBar={NavBar} component={ProductDetail}/>
              
        </Stack> */}
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
            {/* </Scene>   */}

            {/* <Scene 
                key="CartWrapper"
                icon={({ focused }) => (
                    <BadgedTabBarIcon
                        focused={focused}
                        name={
                            Platform.OS === 'ios' 
                                ? `ios-cart${focused ? '' : '-outline'}` 
                                : 'md-cart'
                        }
                    />
                )}
                tabBarLabel='Cart'
            >
                <Scene
                    key="Cart"
                    component={Cart}
                    title="Carrito de Compra"
                    //focused
                    //onEnter={this.onEnterCart}
                //iconName='links'
                />
            </Scene>

            <Scene 
                key="UserWrapper"
                icon={({ focused }) => (
                    <TabBarIcon
                        focused={focused}
                        name={
                            Platform.OS === 'ios' 
                                ? `ios-person${focused ? '' : '-outline'}` 
                                : 'md-person'
                        }
                    />
                )}
                tabBarLabel='User'
            >
                <Scene
                    key="User"
                    component={LinksScreen}
                    title="User"
                //iconName='links'
                />
            </Scene> */}
            
        {/* </Scene> */}
      </Router>
    );
};


export default AppNavigator;
