import React, {Component} from 'react'
import { 
    NavigationBar,
    Icon,
    Title,
    Button
  } from '@shoutem/ui'


class NavBar extends Component {
    render (){
        return (
            <NavigationBar
                leftComponent={<Icon name="sidebar" />}
                centerComponent={<Title>TITLE</Title>}
                rightComponent={(
                    <Button>
                        <Icon name="cart" />
                    </Button>
            )}
            />
        )
    }
}

export default NavBar