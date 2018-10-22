import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { FlatList, TouchableWithoutFeedback, Alert, View } from 'react-native';
import { 
    Container,
    Content, 
    Body, 
    Text, 
    H3,
    Icon, 
    Button,
    Left,
    Right,
    Thumbnail,
    ListItem,
    Picker,
    Toast,
    Spinner
} from 'native-base'
//import NumericInput from 'react-native-numeric-input'
import { getOrder } from '../../redux/actions'
import { Actions } from 'react-native-router-flux';
import { updateProductOnCart, removeProductFromCart } from '../../redux/actions'
import OrderReducer from '../../redux/reducers/OrderReducer';

class ProductDetail extends PureComponent {
    //state = {selected: (new Map(): Map<string, boolean>)};
    
    // constructor(props){
    //     super(props)
    //     this.handleClick = this.handleClick.bind(this);
    // }
    
    componentWillMount(){
        this.props.getOrder()
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

    handleRemoveClick(item) {
        Alert.alert(
            'Eliminar Producto',
            'Esta seguro que desea eliminar el producto?',
            [
                {text: 'Si', onPress: () => {
                        console.log('Ok Pressed', item)
                        this.props.removeProductFromCart(item)
                            .then (() => {
                                //alert("Producto Agregado!")
                                Toast.show({
                                    text: "Carrito Actualizado!",
                                    buttonText: "Ok",
                                    duration: 2000
                                })
                                console.log("Carrito Actualizado")
                            })
                    }
                },
                {text: 'Cancelar', onPress: () => console.log('Cancelar Pressed'), style: 'cancel'},
            ],
            { cancelable: true }
        )
    }

    handleQtyChange(item, newQty) {
        console.log("update item", item)
        console.log("new qty", newQty)
        let line_item = {
            variant_id: item.variant.id,
            quantity: newQty
        }
        const item_id = item.id
        this.props.updateProductOnCart({item_id, line_item})
            .then (() => {
                //alert("Producto Agregado!")
                this.props.getOrder()
                Toast.show({
                    text: "Carrito Actualizado!",
                    buttonText: "Ok",
                    duration: 2000
                  })
                console.log("Carrito Actualizado")
            })
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
        let cantidad = []
        for (let i = 0; i < variant.total_on_hand; i++){
            cantidad.push(i+1)
        }
        let qtyPicker = null
        qtyPicker = 
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                //placeholderStyle={{ color: "#bfc6ea" }}
                //placeholderIconColor="#007aff"
                style={{ width: 120 }}
                selectedValue={item.quantity}
                onValueChange={(value) => {this.handleQtyChange(item, value)}}
            >
                {
                    cantidad.map(
                        (qty, id) => {
                            return (                                        
                                <Picker.Item label={qty.toString()} value={qty} key={id} />
                            );
                        }
                    )
                }
            </Picker>
        console.log(variant.images[0].small_url)
        return (
            <TouchableWithoutFeedback key={key} onPress={() => this.handleClick({item})}>
                {/* <Content style={{flex: 1}}> */}
                <ListItem thumbnail key={key}>
                    <Left>
                        <Thumbnail square source={{ uri: `${variant.images[0].small_url}` }} />
                    </Left>
                    <Body>
                        <H3 numberOfLines={1}>{variant.name}</H3>
                        <Text style={{color: "red"}}>{item.single_display_amount}</Text>
                        {variant_option}
                        {/* <Text>{`Qty: ${item.quantity}`}</Text> */}
                        {qtyPicker}
                    </Body>
                    <Right>            
                        <Button 
                            iconCenter 
                            transparent 
                            danger 
                            onPress={()=>{this.handleRemoveClick(item)}}
                        >
                            <Icon ios='ios-trash-outline' android='md-trash' />
                        </Button>
                    </Right>
                </ListItem>
                 {/* </Content> */}
            </TouchableWithoutFeedback>
        );
    }

    render(){
        let { cart, order } = this.props
        console.log("order", order)
        console.log("data", cart)
        let showLoader = null
        if (cart.addingProductToCart) {
            showLoader = 
                <View style= {{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center' 
                    }}
                >
                    <Spinner color='black' />
                </View>
        }

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
                            onPress={()=>{Actions.popTo('ProductsList')}}
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
                {showLoader} 
                <Button
                    //transparent
                    primary
                    //block
                    full
                    large 
                    onPress={()=>{console.log("presionaron el boton")}}
                    style={{
                        //position: 'absolute',
                        bottom:0,
                        left:0,
                        //flex: 1,
                        width: '100%'
                    }}
                >
                    <Text>Checkout {order.isFetching?"":order.order.display_item_total}</Text>
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

export default connect(mapStateToProps, { removeProductFromCart, updateProductOnCart, getOrder })(ProductDetail)