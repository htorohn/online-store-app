import React from 'react'
import SideBar from './sideBar/SideBar'

class DrawerContent extends React.Component {
  render() {
    return (
      <SideBar navigator={this.navigator}/>
      //null
    )
  }
}

export default DrawerContent