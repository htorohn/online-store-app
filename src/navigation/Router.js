import React from 'react';
import { Scene, Router, Stack, Drawer, Overlay, Modal, Lightbox , Actions} from 'react-native-router-flux'
//import { StackViewStyleInterpolator } from 'react-navigation-stack';
//import { Text, Badge } from 'native-base'
import NavBar from './NavBar'
import DrawerContent from './DrawerContent'

import ProductsList from '../screens/HomeScreen/ProductsList'
import TaxonList from '../screens/HomeScreen/TaxonList'
import ProductDetail from '../screens/HomeScreen/ProductDetail'
import Cart from '../screens/CartScreen/Cart'
import Login from '../screens/UserScreen/Login'
import Register from '../screens/UserScreen/Register'

const AppNavigator = () => {
    return (
      <Router sceneStyle={{ backgroundColor: 'white' }}>
            <Modal key="modal" hideNavBar>
                <Drawer 
                    key="drawer"  
                    hideNavBar 
                    //drawer 
                    contentComponent={DrawerContent} 
                    //initial 
                    drawerPosition="left" 
                    drawerWidth={300} 
                    drawerLabel="Hi"
                >
                    <Stack key="root" >
                    <Scene
                        key="ProductsList"
                        component={TaxonList}
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
                </Drawer>
                <Stack key="login" headerLayoutPreset="center" path="login/:data" titleStyle={{ alignSelf: 'center' }}>
                    <Scene key="loginModal" component={Login} title="Login" onExit={() => console.log('Login: onExit')} leftTitle="Cancel" onLeft={Actions.pop} />
                </Stack>
                <Stack key="register" headerLayoutPreset="center" path="login/:data" titleStyle={{ alignSelf: 'center' }}>
                    <Scene key="registerModal" component={Register} title="Register" onExit={() => console.log('Login: onExit')} leftTitle="Cancel" onLeft={Actions.pop} />
                </Stack>
            </Modal>                
        {/* </Scene> */}
      </Router>
    )
}

export default AppNavigator
