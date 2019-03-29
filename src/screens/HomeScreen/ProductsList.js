import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    FlatList, 
    Image, 
    TouchableWithoutFeedback, 
    Text, 
    Animated,
    ScrollView,
    StyleSheet,
    View,
    StatusBar,
    RefreshControl,
    Platform
} from 'react-native'
import { Container, Content, Card, CardItem, Spinner, Left, Body, Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'
import ImageOverlay from "react-native-image-overlay"
import { productsFetch, taxonProductsFetch } from '../../redux/actions'
import { getProductArray } from '../../redux/actions/utils'
import { MAIN_URL } from '../../constants/Config'

//import { MonoText } from '../../components/StyledText

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;



class ProductList extends Component {
    
    static onEnter = (props) => {
        Actions.refresh({
          title: props.item.attributes.name
        //   rightTitle: 'rightTitle',
        //   onRight: () => {},
        });
    }

    constructor(props) {
        super(props);
    
        this.state = {
          scrollY: new Animated.Value(
            // iOS has negative initial scroll value because content inset...
            Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
          ),
          refreshing: false,
        };
    }

    componentWillMount() {
        const { item } = this.props
        if (item === undefined) {
            this.props.productsFetch()
        } else {
            this.props.taxonProductsFetch(item)
        }

        //Actions.refresh({ title: this.props.item.attributes.name })
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps", nextProps)
    //     const { item } = nextProps
    //     Actions.refresh({ title: item.attributes.name })
    // }

    _keyExtractor = (item) => item.id.toString()

    renderItem(item) {
        //console.log(`${MAIN_URL}${item.master.images[0].product_url}`)

        return (
            <TouchableWithoutFeedback onPress={() => Actions.ProductDetail({item})}>

                <Card style={{flex: 1}}>
                    <CardItem cardBody>
                        <Image 
                            source={{ uri: MAIN_URL + item.image.attributes.styles[2].url }}
                            style={{ height: 200, width: null, flex: 1 }}
                        />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text numberOfLines={1}>{item.name}</Text>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{item.display_price}</Text>
                        </Left>
                    </CardItem>
                </Card>

            </TouchableWithoutFeedback>
        );
    }

    render() {
        console.log("taxon", this.props.item)

        // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        )
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        })
    
        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        })
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        })
    
        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.8],
            extrapolate: 'clamp',
        })
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        })

        if (this.props.productsList.isFetching){
            return (
                <Container>
                    <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                        <Spinner color='black' />
                    </Content>
                </Container>
            );
        }
        if (this.props.productsList.error){
            return (
                <Container>
                    <Content contentContainerStyle={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                        <Text style={{fontSize: 20}}>Oh no! Hay un problema</Text>
                            <Button 
                                iconLeft
                                transparent
                                primary
                                block
                                large
                                onPress={()=>{this.props.productsFetch()}}
                            >
                                <Icon ios='ios-refresh' android="md-refresh" style={{fontSize: 50}} />
                            </Button>
                    </Content>
                </Container>
            );
        }
        console.log("Products list", this.props.productsList)
        let productArray
        if (!_.isEmpty(this.props.productsList.products)){
            productArray = getProductArray (this.props.productsList.products)
            console.log("Product array", productArray)
        } else return null

        const { item, current_image } = this.props

        return (
            <View style={styles.fill}>
              <StatusBar
                translucent
                barStyle="light-content"
                //backgroundColor="rgba(0, 0, 0, 0.251)"
              />
              <Animated.ScrollView
                style={styles.fill}
                scrollEventThrottle={1}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                  { useNativeDriver: true },
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                      this.setState({ refreshing: true });
                      setTimeout(() => this.setState({ refreshing: false }), 1000);
                    }}
                    // Android offset for RefreshControl
                    progressViewOffset={HEADER_MAX_HEIGHT}
                  />
                }
                // iOS offset for RefreshControl
                contentInset={{
                  top: HEADER_MAX_HEIGHT,
                }}
                contentOffset={{
                  y: -HEADER_MAX_HEIGHT,
                }}
              >
                {/* {this._renderScrollViewContent()} */}
                <FlatList 
                    data={productArray}
                    style={{ flex: 1, paddingTop: 5 }}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={this._keyExtractor}
                    numColumns={2}

                />

              </Animated.ScrollView>
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.header,
                  { transform: [{ translateY: headerTranslate }] },
                ]}
              >
                <Animated.Image
                  style={[
                    styles.backgroundImage,
                    {
                      opacity: imageOpacity,
                      transform: [{ translateY: imageTranslate }],
                    },
                  ]}
                  source={{ uri: MAIN_URL + current_image.attributes.styles[3].url }}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    transform: [
                      { scale: titleScale },
                      { translateY: titleTranslate },
                    ],
                  },
                ]}
              >
                {/* <Text style={styles.title}>Title</Text> */}
              </Animated.View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    //console.log(state)
    if (state.productsList.products) {
        const productsList = state.productsList;
        //console.log(productsList);
        return { productsList };
    }

    return state;
};

export default connect(mapStateToProps, { productsFetch, taxonProductsFetch })(ProductList);


const styles = StyleSheet.create({
    fill: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      //backgroundColor: '#03A9F4',
      overflow: 'hidden',
      height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: null,
      height: HEADER_MAX_HEIGHT,
      resizeMode: 'cover',
    },
    bar: {
      backgroundColor: 'transparent',
      marginTop: Platform.OS === 'ios' ? 28 : 38,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    title: {
      color: 'white',
      fontSize: 18,
    },
    scrollViewContent: {
      // iOS uses content inset, which acts like padding.
      paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    },
    row: {
      height: 40,
      margin: 16,
      backgroundColor: '#D3D3D3',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });