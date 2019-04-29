import React, {Component} from 'react'
import Carousel from 'react-native-snap-carousel'
import { 
    FlatList, 
    Image, 
    TouchableWithoutFeedback, 
    Text,
    View,
    Dimensions
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Card, CardItem, Spinner, Left, Icon, Button, Right } from 'native-base'
import ImageOverlay from "react-native-image-overlay"
import { MAIN_URL } from '../../constants/Config'
import { Utils } from '../../redux/actions/utils'
import { sliderWidth, itemWidth } from './carouselStyles'
import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get('window')

class ProductSwiper extends Component {
    
    // constructor(props) {
    //     super(props);
    
    //     this.state = {
    //       size: { width, height },
    //     }
    //   }
    
    //   _onLayoutDidChange = e => {
    //     const layout = e.nativeEvent.layout;
    //     this.setState({ size: { width: layout.width, height: layout.height } });
    //   }


    _renderItem(item){

        //console.log("item latest", item)
        //const {item} = product
        return (
            <TouchableWithoutFeedback onPress={() => Actions.ProductDetail({item})} key={item.id}>

                <Card transparent style={{flex: 1}}>
                    <CardItem cardBody>
                        <Image 
                            source={{ uri: MAIN_URL + item.image.attributes.styles[2].url }}
                            style={{ height: 200, width: null, flex: 1, resizeMode: 'contain' }}
                        />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text numberOfLines={1}>{item.name}</Text>
                        </Left>
                    {/* </CardItem>
                    <CardItem> */}
                        <Right>
                            <Text>{item.display_price}</Text>
                        </Right>
                    </CardItem>
                </Card>
                        
                {/* <Card>
                    <ImageOverlay 
                        source={ { uri: MAIN_URL + item.image.attributes.styles[2].url }}
                        containerStyle={{ resizeMode: 'stretch' }}
                        title={item.name}
                        titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
                        contentPosition="bottom"
                        overlayAlpha={0.1}
                        height={250}
                    />
                </Card> */}

            </TouchableWithoutFeedback>
        )
    }

    render(){
        const {products} = this.props
        //console.log("latest products", products)
        const productArray = Utils.getProductArray(products)
        //console.info("array", productArray)
        return (
            // <Carousel
            //     layout={'default'}
            //     ref={(c) => { this._carousel = c; }}
            //     data={productArray}
            //     renderItem={this._renderItem}
            //     sliderWidth={sliderWidth}
            //     itemWidth={itemWidth}
            //     //hasParallaxImages={true}
            // />
        <Swiper height={300} >
            {
                productArray.map((product) => {
                    return this._renderItem(product)
                })
            }
        </Swiper>
        )
    }
}

export default ProductSwiper