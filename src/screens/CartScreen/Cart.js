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
    ListItem
} from 'native-base'
import { getOrder } from '../../redux/actions'
import { Actions } from 'react-native-router-flux';

class ProductDetail extends Component {
    componentWillMount(){
        this.props.getOrder();
    }

    _keyExtractor = (item) => item.variant.id;

    renderItem(item) {
        //console.log(`${MAIN_URL}${item.master.images[0].product_url}`)
        //console.log(item)
        const { variant } = item
        return (
            <TouchableWithoutFeedback onPress={() => Actions.ProductDetail({item})}>
                <Content>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail square source={{ uri: `${variant.images[0].mini_url}` }} />
                    </Left>
                    <Body>
                        <Text>Hola Mundo</Text>
                        <Text numberOfLines={1}>{variant.name}</Text>
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
        const { cart, order } = this.props
        console.log(order)
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
                    <FlatList 
                        data={cart.cart}
                        style={{ flex: 1 }}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={this._keyExtractor}
                    />
                </Content>
                <Footer>
                    <Container>
                    <Button
                        full
                    >
                        <Text>
                            {`Checkout ${order.order.display_item_total}`}
                        </Text>
                    </Button>
                    </Container>
                </Footer>
            </Container>
        )
    }   
}

mapStateToProps = (state) => {
    //console.log(state.order)
    return state
}

export default connect(mapStateToProps, { getOrder })(ProductDetail)