import React from 'react'
import { TextField } from 'react-native-material-textfield'
import PasswordInputText from 'react-native-hide-show-password-input'

export const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      label={label}
      floatingLabelText={label}
      error={(touched && error)?error:null}
      {...input}
      {...custom}
    />
  )

export const renderPasswordField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
    <PasswordInputText
      //label={label}
      //floatingLabelText={label}
      error={(touched && error)?error:null}
      {...input}
      {...custom}
    />
)