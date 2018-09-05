import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

class BadgedTabBarIcon extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {
            this.props.itemCount > 0 ?
            <View style={{ position: 'absolute', right: -5, top: 5, backgroundColor: 'red', borderRadius: 9, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>{this.props.itemCount}</Text>
            </View> : null
        }
        <Icon.Ionicons
          name={this.props.name}
          size={26}
          //style={{ width: 25, height: 25, marginBottom: -3 }}
          color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {itemCount: state.cart.itemCount}
};

export default connect(mapStateToProps, null)(BadgedTabBarIcon);

const styles = {
  container: {
    width: 48,
    height: 42,
    //padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};