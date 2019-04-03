import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, TouchableWithoutFeedback, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
    Container,
    Card,
    Content,
    Spinner,
    CardItem,
    Text,
    Left
} from 'native-base'
import ImageOverlay from "react-native-image-overlay"


import { taxonomiesFetch, latestProductsFetch } from '../../redux/actions'
import { MAIN_URL } from '../../constants/Config'

class TaxonList extends Component {

    // componentWillMount() {
    //     this.props.taxonomiesFetch()
    // }

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

    _keyExtractor = (item) => item.id.toString()

    renderItem(item) {
        console.log ("item", item)
        //console.log ("existen?", this.props.taxonomies)
        
        if (item.relationships.image.data === null || !item.attributes.is_leaf) return null

        const { taxonomies } = this.props.taxonomies
        //obtenemos la imagen del taxon
        const current_image = taxonomies.included.find((image) => image.id === item.relationships.image.data.id)

        return (
            <TouchableWithoutFeedback onPress={() => Actions.ProductsList({item, current_image})}>
                        
                <Card style={{flex: 1}}>
                    <ImageOverlay 
                        source={ { uri: MAIN_URL + current_image.attributes.styles[3].url }}
                        title={item.attributes.name}
                        titleStyle={{ fontSize: 50, fontWeight: 'bold' }}
                    />
                </Card>
            </TouchableWithoutFeedback>
        )
    }

    render(){
        console.log("taxonomies", this.props.taxonomies)
        const { taxonomies } = this.props.taxonomies
        if (this.props.taxonomies.isFetching || this.props.productsList.isFetching){
            return (
                <Container>
                    <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                        <Spinner color='black' />
                    </Content>
                </Container>
            );
        }
        
        return (
            <Container>
            <FlatList 
                data={taxonomies.data}
                style={{ flex: 1 }}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={this._keyExtractor}
                numColumns={1}

            />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    console.log("taxon list", state)
    const { taxonomies, productsList } = state
  return { taxonomies, productsList }
};

export default connect(mapStateToProps, { taxonomiesFetch, latestProductsFetch })(TaxonList);