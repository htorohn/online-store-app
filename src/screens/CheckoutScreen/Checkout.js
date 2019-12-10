import React from 'react'
import { Content, Text, Container, View, Button, Body } from 'native-base'
import StepIndicator from 'react-native-step-indicator'
//import { ViewPager } from 'rn-viewpager'

import AddressForm from './AddressForm'

const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}


class Checkout extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            currentPosition: 0,
            currentPage: null
        }
    }

    onPageChange(position){
        this.setState({currentPosition: position});
    }
    
    renderViewPagerPage = data => {
        console.log("data", data)
        return (
          <Container>
            <Text>Hola Mundo</Text>
          </Container>
        )
      }

    _renderTitleIndicator() {
        return 
    }

    _moveNext(){
        this.setState({...this.state, currentPosition: this.state.currentPosition + 1})
        console.log("current position", this.state.currentPosition)
        this.viewPager.setPage(this.state.currentPosition)
    }
    
    render () {
        return (
            <Container>
                <Content padder contentContainerStyle={{ flex: 1 }}>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={this.state.currentPosition}
                        labels={labels}
                    />
                    <Body style={{flexDirection: 'row'}}>
                        <AddressForm />
                    </Body>
                </Content>
            </Container>
        )
    }
}

export default Checkout