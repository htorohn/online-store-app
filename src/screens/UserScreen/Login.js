import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import Expo from 'expo'
import { Actions } from 'react-native-router-flux'
import { Field,reduxForm } from 'redux-form'
import {
    Container,
    Content,
    Form,
    Item,
    Label,
    Input,
    Icon,
    Button
} from 'native-base'

const validate = values => {
    //console.log("validating values", values)
    const error= {}
    error.email= ''
    error.password= ''
    var ema = values.email
    var pw = values.password
    if(values.email === undefined){
      ema = ''
    }
    if(values.password === undefined){
      pw = ''
    }
    if(ema.length < 8 && ema !== ''){
      error.email= 'too short'
    }
    if(!ema.includes('@') && ema !== ''){
      error.email= '@ not included'
    }
    if(pw.length > 8){
      error.name= 'max 8 characters'
    }
    return error
}

// const submitForm = values => {
//     console.log("Submitting form", values)
// }

const renderInput = ({ input, addons, icon, type, meta: { touched, error, warning } }) => {
    //console.log('input', input)
    var hasError= false
    if(error !== undefined){
      hasError= true
    }
    return( 
      <Item rounded error={hasError} style={{marginTop: 10}}>
        <Icon {...icon} />
        <Input {...input} {...addons}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
}

class Login extends React.Component {

    submitForm(values){
        console.log("submitting values", values)
    }
    
    render(){
        const { handleSubmit } = this.props
        return (
            <Container style={{ alignContent: 'center', flex: 1, padding: 20 }}>
                <Content padder>
                    <Icon ios='ios-cart-outline' android="md-cart" style={{fontSize: 200, alignSelf: 'center'}} />
                    {/* <Form onSubmit={handleSubmit}> */}
                    <Field 
                        name="email" 
                        addons={{placeholder:'email', keyboardType: 'email-address'}} 
                        icon={{active: true, name: 'person'}}
                        component={renderInput} 
                    />
                    <Field 
                        name="password" 
                        addons={{placeholder: 'password', secureTextEntry: true}} 
                        icon={{active: true, name: 'lock'}}
                        component={renderInput} 
                    />
                    <Button block primary rounded onPress={handleSubmit(this.submitForm)} style={{marginTop: 10}}>
                        <Text style={{color: 'white'}}>Login</Text>
                    </Button>
                    {/* </Form> */}
                </Content>
            </Container>
        )
    }
}

export default connect(null, null)(reduxForm({
    form: 'Login',
    validate
  })(Login))