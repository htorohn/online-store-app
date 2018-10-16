import React, { Component } from 'react'
import { Drawer } from 'native-base'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native'
import { Button, Container } from 'native-base'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
})

class DrawerMenu extends React.Component {

    componentDidMount() {
        Actions.refresh({key: 'drawer', ref: this.refs.navigation});
    }
    closeDrawer = () => {
        this.drawer._root.close()
      };

      openDrawer = () => {
        this.drawer._root.open()
      };
    render() {
        
        
        return (
          <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<Text>Hola mundo</Text>}
            onClose={() => this.closeDrawer()} >
          // Main View
          </Drawer>
        );
      }
}

export default DrawerMenu