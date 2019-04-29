import React, { Component } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'
import {
    Card,
} from 'native-base'
import ImageOverlay from "react-native-image-overlay"
import { MAIN_URL } from '../../constants/Config'

class TaxonList extends Component {

    _keyExtractor = (item) => {
        if (item.id === undefined) {
            return 0
        }
        return item.id.toString()
    }

    renderItem(item) {
        //console.log ("item", item)

        if (item.relationships.image.data === null || !item.attributes.is_leaf) return null

        const { taxonomies } = this.props
        //obtenemos la imagen del taxon
        const current_image = taxonomies.included.find((image) => image.id === item.relationships.image.data.id)

        return (
            <TouchableWithoutFeedback onPress={() => Actions.ProductsList({item, current_image})} key={item.id}>
                        
                <Card cardBody> 
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
        //console.log("taxonomieseses", this.props)
        const { taxonomies } = this.props
        return (      
            taxonomies.data.map((taxonomy) => {
                return this.renderItem(taxonomy)
            })
        )
    }
}

export default TaxonList