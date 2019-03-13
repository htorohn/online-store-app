import React from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import {Button} from 'native-base'

import BadgedTabBarIcon from '../components/BadgedTabBarIcon'

class RightMenu extends React.Component {
    
    render(){
        //console.log("estoy aqui")
        return (
            <Button>
                <BadgedTabBarIcon
                    focused={true}
                    name='cart'
                    // name={
                    //     Platform.OS === 'ios' 
                    //         ? 'ios-cart-outline' //${focused ? '' : '-outline'}` 
                    //         : 'md-cart'
                    // }
                    itemCount={this.props.itemCount}

                />
            </Button>
        )
    }
}

const mapStateToProps = state => {
    return {itemCount: state.cart.itemCount}
};

export default connect(mapStateToProps, null)(RightMenu);
