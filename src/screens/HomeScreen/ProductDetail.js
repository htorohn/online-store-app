import React, { Component } from 'react'
import { connect } from 'react-redux';
import { 
    Container, 
    Content, 
    Text, 
    Card, 
    CardItem,
    Body, 
    Badge,
    Button,
    Left,
    List,
    ListItem,
    H2, 
    H3,
    Picker,
    Icon,
    Right,
    Spinner,
    Toast
} from 'native-base'
import _ from 'lodash'
import ImageSlider from 'react-native-image-slider'
import Hr from "react-native-hr-component"
import NumericInput from 'react-native-numeric-input'
import { addProductToCart, productExistOnCart } from '../../redux/actions'
import { orderApi } from '../../api/orderApi'

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          current_variant: 0,
          qty: 1,
          showToast: false
        };
    }

    static navigationOptions = {
        title: 'Producto X',
    };

    onVariantChange(key) {
        this.setState({
            current_variant: key
        });
    }

    handleButtonPress(variant) {
        let line_item = {
            variant_id: variant.id,
            quantity: this.state.qty
        }
        this.props.addProductToCart({line_item})
            .then (() => {
                //alert("Producto Agregado!")
                Toast.show({
                    text: "Producto Agregado!",
                    buttonText: "Ok",
                    duration: 2000
                  })
                console.log("Producto Agregado")
            })
    }

 
    render() {
        //console.log("Product Props", this.props)
        const { item } = this.props
        var selected_variant = {}
        var images = _.map(item.master.images, 'large_url')
        if (item.has_variants){
            selected_variant = item.variants[this.state.current_variant]
            images.push.apply(images, _.map(selected_variant.images, 'large_url'))
        }else {
            selected_variant = item.master
        }
        //const selected_variant = item.has_variants?item.variants[this.state.current_variant]:item.master
        //const images = _.map(selected_variant.images, 'large_url')
        
        const taxons = _.map(item.classifications, 'taxon')
        const properties = item.product_properties
        //console.log(properties)

        //seleccionamos el variant que deseamos
        let variant_picker = null
        if (item.has_variants){
            const variants = item.variants
            variant_picker =
                <CardItem>
                    <Left>    
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={{ width: undefined }}
                            selectedValue={this.state.current_variant}
                            onValueChange={this.onVariantChange.bind(this)}
                        >
                            {
                                variants.map(
                                    (variant, id) => {
                                        return (                                        
                                            <Picker.Item label={variant.options_text} value={id} key={id} />
                                        );
                                    }
                                )
                            }
                        </Picker>
                    </Left>
                </CardItem>
        }

        //Cantidad de items disponibles

        //Validamos si el producto ya existe en el carro y restamos la cantidad de productos que ya se escogieron
        let line_item = {
            variant_id: selected_variant.id,
            quantity: 0
        }
        let available_quantity = selected_variant.total_on_hand
        //console.log("available quantity 1", available_quantity)
        const existe = orderApi.lineItemExists(line_item, this.props.state.cart.line_items)
        //console.log("existe", existe)
        if ( existe !== undefined ){
            available_quantity = available_quantity - existe.quantity
        }

        let qty_picker
        //console.log("available quantity", available_quantity)
        if (available_quantity === 0){
            qty_picker = 
                    <Text note style={{ color: 'red' }}>
                        No Disponible
                    </Text>
        }else{
            qty_picker = 
                <NumericInput 
                    value={this.state.qty} 
                    onChange={(num)=>{this.setState({qty: num})}} 
                    totalWidth={100} 
                    totalHeight={35} 
                    iconSize={25}
                    step={1}
                    minValue={1}
                    maxValue={available_quantity}
                    //valueType='real'
                    rounded 
                    textColor='black' 
                    iconStyle={{ color: 'black' }} 
                    rightButtonBackgroundColor='white' 
                    leftButtonBackgroundColor='white'
                />
        }
        return (
            <Container>
                <Content>
                    <Card transparent>
                        <CardItem cardBody>
                            <ImageSlider
                                style={{flex: 1, height: 400, width: null}}
                                images={ images }
                            />
                        </CardItem>
                        <CardItem>
                            {/* <Body> */}
                                <H2>{item.name}</H2>
                            </CardItem>
                            <CardItem> 
                                {
                                    taxons.map(
                                        (taxon, id) => {
                                            return (
                                                <Badge key={id} style={{ backgroundColor: 'black' }}>
                                                    <Text note style={{ color: 'white' }}>
                                                        {taxon.name}
                                                    </Text>
                                                </Badge>
                                            );
                                        }
                                    )
                                }
                            {/* </Body> */}
                        </CardItem>
                        <CardItem>
                            <Left>
                                <H3>
                                    { selected_variant.display_price }
                                </H3>
                            </Left>
                            <Right>
                                { qty_picker }
                            </Right>
                        </CardItem>
                        { variant_picker }
                    </Card>
                    <Button 
                        block 
                        style={ {marginLeft: 5, marginRight: 5} }
                        disabled={ selected_variant.total_on_hand === 0?true:false }//|| this.props.state.cart.addingProductToCart?true:false }
                        onPress={() => {
                            this.handleButtonPress(selected_variant);
                          }}
                    >
                        {this.props.state.cart.addingProductToCart?<Spinner color='white'/>:<Text>Agregar</Text>}
                    </Button>
                    <Card transparent >
                        <CardItem header>
                            <Hr 
                                lineColor="#eee" 
                                width={1}
                                thickness={3} 
                                text="Descripción" 
                                textStyles={customStylesHere}
                            />
                        </CardItem>
                        <CardItem cardBody>
                            <Content padder>
                                <Text style={{textAlign: 'justify'}}>
                                    {item.description}
                                </Text>
                            </Content>
                        </CardItem>
                        <CardItem cardBody> 
                            <List dataArray={properties}
                                renderRow={(property) =>
                                <ListItem>
                                    <Left>
                                        <Text style={{fontWeight: "bold"}}>{property.property_name}</Text>
                                    </Left>
                                    <Body>
                                        <Text>{ property.value }</Text>
                                    </Body>
                                </ListItem>
                                }>
                            </List>
                        </CardItem>
                    </Card>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = state => {
    //console.log(state.order);
    return {
        state
    };
};

export default connect(mapStateToProps, { addProductToCart, productExistOnCart })(ProductDetail);

const customStylesHere = {
    fontWeight: "bold",
    fontSize: 18
}