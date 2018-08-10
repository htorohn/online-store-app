import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
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
    Right,
    List,
    ListItem,
    H2, 
    H3
} from 'native-base'
import { View, Image } from 'react-native'
import _ from 'lodash'
import ImageSlider from 'react-native-image-slider'
import Hr from "react-native-hr-component";
import Modal from 'react-native-modal';
import { addProductToCart } from '../../redux/actions';

class ProductDetail extends Component {
    state = {
        visibleModal: null,
    };
    
    handleButtonPress() {
        this.setState({ visibleModal: 1 })
        //this.props.addProductToCart();
    }

    _handleAcceptButtonPress() {
        this.setState({ visibleModal: null })
        this.props.addProductToCart();
    }

    _handleCancelButtonPress() {
        this.setState({ visibleModal: null })
        //this.props.addProductToCart();
    }

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );

    _renderModalContent = () => (   
        <View style={styles.modalContent}>
            <Text>Hello!</Text>
          {/* {this._renderButton('Close', () => this.setState({ visibleModal: null }))} */}
            <Button 
                block 
                style={{marginLeft: 5, marginRight: 5}}
                onPress={() => {
                    this._handleAcceptButtonPress();
                    }}
            >
                <Text>Agregar</Text>
            </Button>
          {/* {this._renderButton('Close', () => this.setState({ visibleModal: null }))} */}
            <Button
                light
                block 
                style={{marginLeft: 5, marginRight: 5, marginTop: 10}}
                onPress={() => {
                    this._handleCancelButtonPress();
                    }}
            >
                <Text>Cancelar</Text>
            </Button>
        </View>
    );
 
    render() {
        //console.log(this.props.item)
        const { item } = this.props
        const images = _.map(item.master.images, 'large_url')
        const taxons = _.map(item.classifications, 'taxon')
        const properties = item.product_properties
        console.log(properties)
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
                            <H3>
                                {item.master.display_price}
                            </H3>
                        </CardItem>
                    </Card>
                    <Button 
                        block 
                        style={{marginLeft: 5, marginRight: 5}}
                        onPress={() => {
                            this.handleButtonPress();
                          }}
                    >
                        <Text>Agregar</Text>
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
                            {/* {
                                properties.map(
                                    (property, key) => {
                                        return (
                                            <Content padder>
                                                <Left>
                                                    <Text>{ property.property_name }</Text>
                                                </Left>
                                                <Right>
                                                    <Text>{ property.value }</Text>
                                                </Right>
                                                </Content>
                                        );
                                    }
                                )
                            } */}
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
                    
                    {/* Modal para agregar al carrito */}
                    <Modal isVisible={this.state.visibleModal === 1}>
                        {this._renderModalContent()}
                    </Modal>
                </Content>
            </Container>

        );
    }
}

export default connect(null, { addProductToCart })(ProductDetail);

const customStylesHere = {
    fontWeight: "bold",
    fontSize: 18
}
const styles = StyleSheet.create({
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });