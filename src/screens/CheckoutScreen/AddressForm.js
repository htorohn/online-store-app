import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { View, Dimensions } from 'react-native'
import { Form } from 'native-base'

import { renderTextField, renderPasswordField } from '../../components/RenderTextField'

const { width } = Dimensions.get('window')

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


class AddressForm extends React.Component {
    render() {
        return (
            // firstname: 'John',
            // lastname: 'Snow',
            // address1: '7735 Old Georgetown Road',
            // city: 'Bethesda',
            // phone: '3014445002',
            // zipcode: '20814',
            // state_name: 'MD',
            // country_iso: 'US'
            <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: width * 0.1}}>
                <Field
                    name="firstname"
                    label='Nombre'
                    component={renderTextField}
                />
                <Field
                    name="lastname"
                    label='Apellido'
                    component={renderTextField}
                />
                <Field
                    name="address1"
                    label='Nombre'
                    component={renderTextField}
                />

            </View>
        )
    }
}

export default reduxForm({
    form: 'Address',
    validate
})(AddressForm)