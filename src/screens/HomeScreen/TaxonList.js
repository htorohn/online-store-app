import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, TouchableWithoutFeedback, Text } from 'react-native'
import {
    Container,
    Card,
    CardItem,
    Image,
    Left
} from 'native-base'

import { taxonomiesFetch } from '../../redux/actions'

class TaxonList extends Component {

    componentWillMount() {
        this.props.taxonomiesFetch()
    }

    _keyExtractor = (item) => item.id.toString()

    renderItem(item) {
        console.log ("item", item)
        console.log ("existen?", this.props.taxonomies)
        
        if (item.relationships.image.data === null) return null

        return (
            <TouchableWithoutFeedback> 
            {/* onPress={() => Actions.ProductDetail({item})}> */}

                <Card style={{flex: 1}}>
                    {/* <CardItem cardBody>
                        <Image 
                            source={{ uri: `${item.master.images[0].product_url}` }}
                            style={{ height: 200, width: null, flex: 1 }}
                        />
                    </CardItem> */}
                    <CardItem>
                        <Left>
                            <Text numberOfLines={1}>{item.attributes.name}</Text>
                        </Left>
                    </CardItem>
                    {/* <CardItem>
                        <Left>
                            <Text>{item.master.display_price}</Text>
                        </Left>
                    </CardItem> */}
                </Card>

            </TouchableWithoutFeedback>
        )
    }

    render(){
        console.log("taxonomies", this.props.taxonomies)
        const { taxonomies } = this.props.taxonomies
        return (
            <Container>
            <FlatList 
                data={taxonomies.data}
                style={{ flex: 1 }}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={this._keyExtractor}
                numColumns={2}

            />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    //console.log(state)
    const { taxonomies } = state
  return { taxonomies }
};

export default connect(mapStateToProps, { taxonomiesFetch })(TaxonList);