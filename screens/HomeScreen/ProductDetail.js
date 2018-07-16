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
    H2, 
    H3
} from 'native-base'
import { View, Image } from 'react-native'
import _ from 'lodash'
import ImageSlider from 'react-native-image-slider'
import Hr from "react-native-hr-component";
import { addProductToCart } from '../../redux/actions';

class ProductDetail extends Component {
    handleButtonPress() {
        this.props.addProductToCart();
    }
 
    render() {
        console.log(this.props.item)
        const { item } = this.props
        const images = _.map(item.master.images, 'large_url')
        let taxons = _.map(item.classifications, 'taxon')
        console.log(taxons)
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
                    </Card>
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