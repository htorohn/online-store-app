import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Button,
    Icon
} from 'native-base'

import BadgedTabBarIcon from '../components/BadgedTabBarIcon'
import Colors from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 20,
  },
  navBarItem: {
    flex: 1,
    justifyContent: 'center',
  },
});

class NavBar extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
    // static contextTypes = {
    //     drawer: PropTypes.object
    // }


  _renderLeft(index) {
    let backButton = null
    //console.log("index",index)
    if (index !== 0) {
        backButton = 
            <Button transparent onPress={ () => Actions.pop() }>
                <Icon 
                    name = {
                        Platform.OS === 'ios' 
                        ? 'ios-arrow-back' 
                        : 'md-arrow-back'
                    }
                    //size={26}
                    //color={Platform.OS === 'ios' ? Colors.tabIconSelected : 'white'}
                />
            </Button>
    }
    //console.log("context", this.context)
    return (
        <View style={{flexDirection: 'row', backgroundColor: 'transparent', marginLeft: 10}}>
            {backButton}
            <Button transparent onPress={ () => Actions.drawerOpen() }>
                <Icon 
                    name='menu' 
                    //size={26}
                    //color={Platform.OS === 'ios' ? Colors.tabIconSelected : Colors.noticeText}
                />
            </Button>
        </View>
    );
  }

  _renderMiddle() {
    return (
    //   <View style={styles.navBarItem}>
        <Title>{this.props.title}</Title>
      //{/* </View> */}
    );
  }

  _renderRight() {
    return (
    //   <View style={[styles.navBarItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
        <Button transparent onPress={() => Actions.Cart()}>
            <BadgedTabBarIcon
                focused={true}
                name={
                    Platform.OS === 'ios' 
                        ? 'ios-cart-outline' //${focused ? '' : '-outline'}` 
                        : 'md-cart'
                }
                itemCount={this.props.itemCount}

            />
        </Button>
      //{/* </View> */}
    );
  }

  render() {
    //console.log("nav bar", this.props)
    return (
          <Header>
              <Left style={{flex: 1}}>
                {this._renderLeft(this.props.index)}
              </Left>
              <Body>
                {this._renderMiddle()}
              </Body>
              <Right>
                {this._renderRight()}
              </Right>  
          </Header>
    );
  }
}

const mapStateToProps = state => {
    return {itemCount: state.cart.itemCount}
};

export default connect(mapStateToProps, null)(NavBar);