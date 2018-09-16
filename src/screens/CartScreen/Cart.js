import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { 
    Container,
    Content, 
    Body, 
    Text, 
    Icon, 
    Button,
    Footer,
    Card,
    CardItem,
    Left,
    Right,
    Thumbnail,
    ListItem,
    FooterTab
} from 'native-base'
import { getOrder } from '../../redux/actions'
import { Actions } from 'react-native-router-flux';

class ProductDetail extends Component {
    componentWillMount(){
        this.props.getOrder();
    }

    _keyExtractor = (item) => {
        //console.log("key extractor", item)
        return item.variant.id.toString()
    }

    renderItem(item) {
        //console.log(`${MAIN_URL}${item.master.images[0].product_url}`)
        //console.log("item:",item)
        const { variant } = item
        // if (item.button) {
        //     return (
        //         item.button
        //     )
        // }
        return (
            <TouchableWithoutFeedback onPress={() => Actions.ProductDetail({item})}>
                <Content>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail square source={{ uri: `${variant.images[0].mini_url}` }} />
                    </Left>
                    <Body>
                        <Text numberOfLines={1}>{variant.name}</Text>
                        <Text>{`Qty: ${item.line_item.quantity}`}</Text>
                    </Body>
                    <Right>
                        <Text>{variant.display_price}</Text>
                    </Right>
                </ListItem>
                </Content>
            </TouchableWithoutFeedback>
        );
    }

    render(){
        let { cart, order } = this.props
        //console.log("cart", cart)
        //var data = JSON.parse(JSON.stringify(cart.cart))
        //data.push(cart.cart)
        // const button = {
        //     variant: {id: -1},
        //     button:  function() {return(<Button
        //         transparent
        //         primary
        //         block 
        //         large 
        //         onPress={()=>{console.log("presionaron el boton")}}
        //      />)}
        // }
        //console.log("boton", button)
        //var data = cart.cart.concat(button)
        //data.push(button)
        //const buttonIndex = [data.length - 1]
        //console.log("data", data)
        if (cart.itemCount === 0){
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
                    <FlatList 
                        data={cart.cart}
                        style={{ flex: 1 }}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={this._keyExtractor}
                        //stickyHeaderIndices={buttonIndex}
                    />
                    <Button
                        transparent
                        primary
                        block 
                        large 
                        onPress={()=>{console.log("presionaron el boton")}}
                    >
                    <Text>Checkout</Text>
                    </Button>
                </Content>
            </Container>
        )
    }   
}

mapStateToProps = (state) => {
    //console.log(state.order)
    return state
}

export default connect(mapStateToProps, { getOrder })(ProductDetail)