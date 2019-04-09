import React, { Component } from 'react'
import { connect } from 'react-redux'
import {View} from 'react-native'
import { 
    Content,
    Text,
    Icon,
    Container,
    Spinner,
    Card,
    CardItem,
} from 'native-base'
import _ from 'lodash'

import { taxonomiesFetch, latestProductsFetch } from '../../redux/actions'
import ProductSwiper from './ProductSwiper'
import TaxonList from './TaxonList'


class Home extends Component {

    componentWillMount() {
        // const { item } = this.props
        // if (item === undefined) {
        //     this.props.productsFetch()
        // } else {
        //     this.props.taxonProductsFetch(item)
        // }
        this._AsyncLoad()
        //Actions.refresh({ title: this.props.item.attributes.name })
    }

    _AsyncLoad = async (item) => {
        return Promise.all([
            this.props.taxonomiesFetch(),
            this.props.latestProductsFetch()
        ])
    }

    render() {
        const {latestProducts} = this.props.productsList
        const { taxonomies } = this.props.taxonomies
        //console.log("home", this.props)
        if (_.isEmpty(this.props.taxonomies.taxonomies) || _.isEmpty(this.props.productsList.latestProducts)){
            return (
                <Container>
                    <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                        <Spinner color='black' />
                    </Content>
                </Container>
            );
        }

        return (
            // <Container >
                <Content style={{ backgroundColor: '#d5d5d6'}}>
                
                    <View style={{
                        height: 50,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        paddingHorizontal: 5,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text>
                            Hello, Login
                        </Text>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text> Your Account </Text>
                            <Icon 
                                name='arrow-forward'
                                style={{ fontSize: 18 }}
                            />
                        </View>
                    </View>

                    {/* <View style={{
                        height: 300,
                        backgroundColor: 'white'
                    }}> */}
                        
                    <Card>
                        <CardItem header>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Latest Products</Text>
                        </CardItem>
                        <CardItem body>
                            <ProductSwiper products={latestProducts} />
                        </CardItem>
                    </Card> 
                    {/* </View> */}
                    {/* </Swiper> */}
                    <Card>
                        <CardItem header>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Categories</Text>
                        </CardItem>
                        </Card>
                        {/* <CardItem body> */}
                            <TaxonList taxonomies={taxonomies} />
                        {/* </CardItem> */}
                     
                </Content>
            // </Container>

        )
    }
}

const mapStateToProps = state => {
    //console.log("taxon list", state)
    const { taxonomies, productsList } = state
  return { taxonomies, productsList }
};

export default connect(mapStateToProps, { taxonomiesFetch, latestProductsFetch })(Home)