import React from 'react'
import { Actions } from 'react-native-router-flux'
import {
    Container,
    Content,
    Form,
    Item,
    Label,
    Input,
    Icon
} from 'native-base'

class Login extends React.Component {
    static onEnter = () => {
        Actions.refresh({
          title: 'Login',
          //rightTitle: 'rightTitle',
          //onRight: () => {},
        })
      }
    
    
    render(){
        return (
            <Container>
            <Content>
                <Form>
                    <Item rounded>
                        <Icon active name='person' />
                        <Input placeholder='email'/>
                    </Item>
                    <Item>
                        <Icon active name='lock' />
                        <Input placeholder='password' secureTextEntry={true} />
                    </Item>
                </Form>
            </Content>
        </Container>
        )
    }
}

export default Login