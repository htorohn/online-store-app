import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { Field,reduxForm } from 'redux-form'
import {
    Container,
    Content,
    Grid,
    Col,
    Icon,
    Button,
    Spinner
} from 'native-base'
import {renderTextField, renderPasswordField} from '../../components/RenderTextField'
import { login } from '../../redux/actions'

const validate = values => {
    const errors = {}
    const requiredFields = [
      'email',
      'password'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    return errors
}

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.submitForm = this.submitForm.bind(this)
    }
    
    submitForm(values){
        if (values.email === undefined){
            return null
        }
        this.props.login(values)
            .then((response) => {
                console.log("se hizo login", response)
                if (response){
                    Actions.pop()
                }
            })
    }
    
    render(){
        console.log("user", this.props.user)
        const { handleSubmit, user } = this.props
        return (
            <Container style={{ alignContent: 'center', flex: 1, padding: 20 }}>
                <Content padder style={{ alignContent: 'center'}}>
                    <Icon name='cart' style={{fontSize: 200, alignSelf: 'center'}} />
                    <Field 
                        name="email"
                        keyboardType = 'email-address'
                        label = 'email'
                        textContentType = 'emailAddress'
                        component = {renderTextField} 
                        
                    />
                    <Field 
                        name="password" 
                        component={renderPasswordField} 
                        
                    />
                    <Button block primary rounded onPress={handleSubmit(this.submitForm)} style={{marginTop: 10}}>
                            {user.loading_user?<Spinner color='white'/>:<Text style={{color: 'white'}}>Login</Text>}
                    </Button>
                    {
                        user.error !== null?<Text style={{color: 'red'}}>Email o Password incorrecto</Text>:null
                    }
                    <Grid style={{alignItems: 'center'}}>
                        <Col >
                            <Text>¿Aún no eres usuario? </Text>
                        </Col>
                        <Col >
                            {
                            user.isLoggedIn 
                            ? 
                                Actions.pop()
                            :
                                <Button
                                transparent 
                                title="Go to Login" 
                                onPress={() => Actions.register({ data: 'Custom data', title: 'Custom title' })}
                                >
                                <Text style={{color: 'blue'}}>Regístrate</Text>
                                </Button>
                            }
                        </Col>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state
    return { user }
}

Login = connect (mapStateToProps, { login })(Login)

export default reduxForm({
    form: 'Login',
    validate
  })(Login)