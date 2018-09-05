import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Image, TouchableWithoutFeedback, Text } from 'react-native';
import { Container, Content, Card, CardItem, Spinner, Left, Body, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { productsFetch } from '../../redux/actions';
//import { MAIN_URL } from '../../constants/Config';

//import { MonoText } from '../../components/StyledText';


class ProductList extends Component {
    // static navigationOptions = {
    //     title: 'Productos',
    // };

    componentWillMount() {
        this.props.productsFetch();
    }

    _keyExtractor = (item) => item.id;

    renderItem(item) {
        //console.log(`${MAIN_URL}${item.master.images[0].product_url}`)
        return (
            <TouchableWithoutFeedback onPress={() => Actions.ProductDetail({item})}>

                <Card>
                    <CardItem cardBody>
                        <Image 
                            source={{ uri: `${item.master.images[0].product_url}` }}
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
                            <Text>{item.master.display_price}</Text>
                        </Left>
                    </CardItem>
                </Card>

            </TouchableWithoutFeedback>
        );
    }

    render() {
        //console.log("products List", this.props.productsList);
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
        return (
            <FlatList 
                data={this.props.productsList.products.products}
                style={{ flex: 1 }}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={this._keyExtractor}
                numColumns={2}

            />
        );
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

export default connect(mapStateToProps, { productsFetch })(ProductList);
