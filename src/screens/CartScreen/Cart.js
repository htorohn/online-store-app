import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    Container,
    Content, 
    Body, 
    Text, 
    Icon, 
    Button,
    Footer
} from 'native-base'
import { getOrder } from '../../redux/actions'
import { Actions } from 'react-native-router-flux';

class ProductDetail extends Component {
    componentWillMount(){
        this.props.getOrder();
    }

    render(){
        if (this.props.itemCount === 0){
            return(
                <Container>
                    <Content contentContainerStyle={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                        <Icon ios='ios-cart-outline' android="md-cart" style={{fontSize: 200}} />
                        <Text style={{fontSize: 20}}>Oh no! El carrito esta vacio</Text>
                        <Button
                            transparent
                            primary
                            block 
                            large 
                            onPress={()=>{Actions.replace("Products")}}
                        >
                            <Text style={{fontSize: 18}}>Ir a la tienda</Text>
                        </Button>
                    </Content>
                </Container>
            )
        }
        return(
            <Container>
                <Content>
                    <Text>Agregar</Text>
                </Content>
                <Footer>
                    <Button
                        block
                    >
                        <Text>
                            Checkout
                        </Text>
                    </Button>
                </Footer>
            </Container>
        )
    }   
}

mapStateToProps = (state) => {
    console.log(state.cart)
    return state.cart
}

export default connect(mapStateToProps, { getOrder })(ProductDetail)