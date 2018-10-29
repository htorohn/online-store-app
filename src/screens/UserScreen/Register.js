import React from 'react'
import { Actions } from 'react-native-router-flux'
import {
    Container,
    Text
} from 'native-base'

class Register extends React.Component {
    static onEnter = () => {
        Actions.refresh({
          title: 'Register',
          //rightTitle: 'rightTitle',
          //onRight: () => {},
        })
      }
    
    
    render(){
        return (
            <Container>
                <Text>Register</Text>
            </Container>
        )
    }
}

export default Register