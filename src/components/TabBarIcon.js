import React from 'react';
import { View } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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

const styles = {
  container: {
    width: 48,
    height: 42,
    //padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};