import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Image, TouchableWithoutFeedback, Text } from 'react-native';
import { Container, Content, Card, CardItem, Spinner, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { productsFetch } from '../../redux/actions';
import { MAIN_URL } from '../../constants/Config';

import { MonoText } from '../../components/StyledText';


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
        //console.log(this.props);
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
                    <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                        <Text>Hay un error</Text>
                    </Content>
                </Container>
            );
        }
        return (
            <FlatList 
                data={this.props.productsList.products}
                style={{ flex: 1 }}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={this._keyExtractor}
                numColumns={2}

            />
        );
    }
}

const mapStateToProps = state => {
    if (state.productsList.products.data) {
        const productsList = state.productsList.products.data;
        //console.log(productsList);
        return { productsList };
    }

    return state;
};

export default connect(mapStateToProps, { productsFetch })(ProductList);
