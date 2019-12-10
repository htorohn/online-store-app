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
import { Actions } from 'react-native-router-flux'
import { updateProductOnCart, removeProductFromCart } from '../../redux/actions'
import { MAIN_URL } from '../../constants/Config'

class ProductDetail extends PureComponent {

    _keyExtractor = (item) => {
        return item.line_item_id.toString()
    }

    handleClick(item) {
        Actions.ProductDetail({item})
    }

    handleRemoveClick(item) {
        Alert.alert(
            'Eliminar Producto',
            'Esta seguro que desea eliminar el producto?',
            [
                {text: 'Si', onPress: () => {
                        console.log('Ok Pressed', item)
                        const item_id = item.line_item_id
                        this.props.removeProductFromCart({item_id})
                            .then (() => {
                                Toast.show({
                                    text: "Carrito Actualizado!",
                                    buttonText: "Ok",
                                    duration: 2000
                                })
                            })
                    }
                },
                {text: 'Cancelar', onPress: () => console.log('Cancelar Pressed'), style: 'cancel'},
            ],
            { cancelable: true }
        )
    }

    handleQtyChange(item, newQty) {
        let line_item = {
            line_item_id: item.line_item_id,
            variant_id: item.variant.id,
            quantity: newQty
        }
        const item_id = item.id
        this.props.updateProductOnCart({item_id, line_item})
            .then (() => {
                Toast.show({
                    text: "Carrito Actualizado!",
                    buttonText: "Ok",
                    duration: 2000
                  })
            })
    }

    renderItem(item, key) {

        const { variant, images } = item
        var variant_option = null
        if (!variant.attributes.is_master) {
            variant_option = 
                <Text>
                    {variant.attributes.options_text}
                </Text>
        }
        let cantidad = []
        for (let i = 0; i < variant.attributes.total_on_hand; i++){
            cantidad.push(i+1)
        }
        let qtyPicker = null
        qtyPicker = 
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
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
        return (
            <TouchableWithoutFeedback key={key} onPress={() => Actions.ProductDetail({item})}>
                <ListItem thumbnail key={key}>
                    <Left>
                        <Thumbnail square source={{ uri: `${MAIN_URL}${images.attributes.styles[1].url}` }} />
                    </Left>
                    <Body>
                        <H3 numberOfLines={1}>{variant.attributes.name}</H3>
                        <Text style={{color: "red"}}>{variant.attributes.display_price}</Text>
                        {variant_option}
                        {qtyPicker}
                    </Body>
                    <Right>            
                        <Button 
                            iconCenter 
                            transparent 
                            danger 
                            onPress={()=>{this.handleRemoveClick(item)}}
                        >
                            <Icon name='trash' />
                        </Button>
                    </Right>
                </ListItem>
            </TouchableWithoutFeedback>
        );
    }

    render(){
        let { cart } = this.props
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
                        <Icon name='cart' style={{fontSize: 200}} />
                        <Text style={{fontSize: 20}}>Oh no! El carrito esta vacio</Text>
                        <Button
                            transparent
                            primary
                            block 
                            large 
                            onPress={()=>{Actions.popTo('Home')}}
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
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={this._keyExtractor}
                    />    
                </Content>
                {showLoader} 
                <Button
                    primary
                    full
                    large 
                    onPress={()=>{
                        console.log("presionaron el boton")
                        Actions.checkout()
                    }}
                    style={{
                        bottom:0,
                        left:0,
                        width: '100%'
                    }}
                >
                    <Text>Checkout {cart.isFetching?"":cart.cart.data.attributes.display_total}</Text>
                </Button>
            </Container>
        )
    }   
}

mapStateToProps = (state) => {
    console.log(state.cart)
    const {cart} = state
    return {cart}
}

export default connect(mapStateToProps, { removeProductFromCart, updateProductOnCart })(ProductDetail)