import React from 'react';
//import { connect } from 'react-redux';
import { View, Text, Platform } from 'react-native';
//import { Icon } from 'expo'
import { Icon } from 'native-base'

import Colors from '../constants/Colors';

export default BadgedTabBarIcon = ({focused, name, itemCount}) => {
  //render() {
    //console.log(focused, name, )
    return (
      <View style={styles.container}>
        {
            itemCount > 0 ?
            <View style={{ position: 'absolute', right: -5, top: 5, backgroundColor: 'red', borderRadius: 9, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>{itemCount}</Text>
            </View> : null
        }
        <Icon
          name={name}
          size={26}
          style={{ color: 'white' }}
          //style={{ width: 25, height: 25, marginBottom: -3 }}
          //color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          //color={Platform.OS === 'ios' ? Colors.tabIconSelected : 'white'}
        />
      </View>
    );
  //}
}

// const mapStateToProps = state => {
//     return {itemCount: state.cart.itemCount}
// };

//export default connect(mapStateToProps, null)(BadgedTabBarIcon);

const styles = {
  container: {
    width: 48,
    height: 42,
    //padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};