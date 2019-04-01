import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    FlatList, 
    Image, 
    TouchableWithoutFeedback, 
    Text
} from 'react-native'
import { Container, Content, Card, CardItem, Spinner, Left, Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'
import { productsFetch, taxonProductsFetch } from '../../redux/actions'
import { getProductArray } from '../../redux/actions/utils'
import { MAIN_URL } from '../../constants/Config'


class ProductList extends Component {
    
    static onEnter = (props) => {
        Actions.refresh({
          title: props.item.attributes.name
        //   rightTitle: 'rightTitle',
        //   onRight: () => {},
        });
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
        //console.log("taxon", this.props.item)
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

        //const { item, current_image } = this.props

        return (
          <FlatList 
              data={productArray}
              style={{ flex: 1, paddingTop: 5 }}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={this._keyExtractor}
              numColumns={2}

          />
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
