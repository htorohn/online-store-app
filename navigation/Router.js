import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Stack } from 'react-native-router-flux';
//import { Text, Badge } from 'native-base'
import ProductsList from '../screens/HomeScreen/ProductsList'
import ProductDetail from '../screens/HomeScreen/ProductDetail'
import Cart from '../screens/CartScreen/Cart'
import LinksScreen from '../screens/LinksScreen';
//import SettingsScreen from '../screens/SettingsScreen';
//import User from './components/User';
import TabBarIcon from '../components/TabBarIcon';
import BadgedTabBarIcon from '../components/BadgedTabBarIcon';

const AppNavigator = () => {
    return (
      <Router sceneStyle={{ backgroundColor: 'white' }}>
        <Scene key="root" tabs tabBarStyle={{ marginTop:25 }} type="reset" showLabel={true} >
            <Scene 
                key="ProductsListWrapper"
                icon={({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      name={
                        Platform.OS === 'ios'
                          ? `ios-home${focused ? '' : '-outline'}`
                          : 'md-home'
                      }
                    />
                  )}
                tabBarLabel='Home'
                hideNavBar
            >
                <Stack key="Products">
                    <Scene
                        key="ProductsList"
                        component={ProductsList}
                        title="Products"
                        //iconName='home'
                    />
                    <Scene
                        key="ProductDetail"
                        component={ProductDetail}
                    />
                </Stack>
            </Scene>  

            <Scene 
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
                    key="Links"
                    component={Cart}
                    title="Links"
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
            </Scene>
            
        </Scene>
      </Router>
    );
};


export default AppNavigator;
