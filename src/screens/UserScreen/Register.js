import React from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Field,reduxForm } from 'redux-form'
import { Text } from 'react-native'
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
import { register } from '../../redux/actions'

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

class Register extends React.Component {

    constructor(props) {
        super(props)
        this.submitForm = this.submitForm.bind(this)
    }
    
    submitForm(values){
        //console.log("submitting values", values)
        //console.log("props", this.props)
        if (values.email === undefined){
            return null
        }
        if (values.password === undefined){
            return null
        }
        values['password_confirmation'] = values.password

        //console.log("agregue confirmation", values)

        this.props.register(values)
            .then((response) => {
                console.log("Se registró el usuario", response)
                if (response){
                    Actions.pop()
                }
            })
    }
    
    render(){
        //console.log("user", this.props.user)
        const { handleSubmit, user } = this.props
        return (
            <Container style={{ alignContent: 'center', flex: 1, padding: 20 }}>
                <Content padder style={{ alignContent: 'center'}}>
                    <Icon name='cart' style={{fontSize: 200, alignSelf: 'center'}} />
                    <Field 
                        name="email" 
                        keyboardType = 'email-address'
                        autoCapitalize= 'none'
                        label = 'email'
                        textContentType = 'emailAddress'
                        component = {renderTextField} 
                        
                    />
                    <Field 
                        name="password" 
                        component={renderPasswordField} 
                        
                    />
                    <Button block primary rounded onPress={handleSubmit(this.submitForm)} style={{marginTop: 10}}>
                            {user.loading_user?<Spinner color='white'/>:<Text style={{color: 'white'}}>Register</Text>}
                    </Button>
                    {
                        user.error !== null?<Text style={{color: 'red'}}>Error al registrar usuario</Text>:null
                    }
                    <Grid style={{alignItems: 'center'}}>
                        <Col >
                            <Text>¿Ya eres usuario? </Text>
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
                                onPress={() => Actions.login({ data: 'Custom data', title: 'Custom title' })}
                                >
                                <Text style={{color: 'blue'}}>Login</Text>
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

Register = connect (mapStateToProps, { register })(Register)

export default reduxForm({
    form: 'Register',
    validate
  })(Register)