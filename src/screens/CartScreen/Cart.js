import React, { PureComponent } from 'react'
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
    List,
    ListItem,
    FooterTab
} from 'native-base'
import { getOrder } from '../../redux/actions'
import { Actions } from 'react-native-router-flux';
import OrderReducer from '../../redux/reducers/OrderReducer';

class ProductDetail extends PureComponent {
    //state = {selected: (new Map(): Map<string, boolean>)};
    
    // constructor(props){
    //     super(props)
    //     this.handleClick = this.handleClick.bind(this);
    // }
    
    componentWillMount(){
        this.props.getOrder();
    }

    // componentWillReceiveProps(){
    //     //this.props.getOrder();
    // }

    _keyExtractor = (item) => {
        //console.log("key extractor", item)
        return item.variant.id.toString()
    }

    handleClick(item) {
        console.log("item", item)
    }

    renderItem(item, key) {
        //console.log(`${MAIN_URL}${item.master.images[0].product_url}`)
        console.log("item:",item)
        const { variant } = item
        var variant_option = null
        if (!variant.is_master) {
            variant_option = 
                <Text>
                    {variant.options_text}
                </Text>
        }
        return (
            <TouchableWithoutFeedback key={key} onPress={() => this.handleClick({item})}>
                {/* <Content style={{flex: 1}}> */}
                <ListItem thumbnail key={key}>
                    <Left>
                        <Thumbnail square source={{ uri: `${variant.images[0].small_url}` }} />
                    </Left>
                    <Body>
                        <Text numberOfLines={1}>{variant.name}</Text>
                        {variant_option}
                        <Text>{`Qty: ${item.quantity}`}</Text>
                    </Body>
                    <Right>
                        <Text>{item.display_amount}</Text>
                    </Right>
                </ListItem>
                 {/* </Content> */}
            </TouchableWithoutFeedback>
        );
    }

    render(){
        let { cart, order } = this.props
        //console.log("order", order)
        console.log("data", cart)
        if (cart.line_items.length == 0){
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
                            onPress={()=>{Actions.pop()}}
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
                        data={cart.line_items}
                        //initialNumToRender={cart.cart.length}
                        //debug={true}
                        //extraData={this.props.navigation.state.focused}
                        //style={{ flex: 1 }}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={this._keyExtractor}
                        //stickyHeaderIndices={buttonIndex}
                    />
                    
                    
                        
                </Content>
                <Button
                    //transparent
                    primary
                    //block
                    full
                    large 
                    onPress={()=>{console.log("presionaron el boton")}}
                    style={{
                        position: 'absolute',
                        bottom:0,
                        left:0,
                        flex: 1,
                        width: '100%'
                    }}
                >
                    <Text>Checkout</Text>
                </Button>
            </Container>
        )
    }   
}

mapStateToProps = (state) => {
    //console.log(state.cart)
    const {cart, order} = state
    return {cart, order}
}

export default connect(mapStateToProps, { getOrder })(ProductDetail)