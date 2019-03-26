import {
    TAXONOMIES_FETCHING,
    TAXONOMIES_FETCH_SUCCESS,
    TAXONOMIES_FETCH_ERROR
} from './types';
import { MAIN_URL } from '../../constants/Config';

// import { makeClient } from '@spree/storefront-api-v2-sdk'


// const client = makeClient({
//   host: MAIN_URL
// })

export const taxonomiesFetch = () => {
    return (dispatch) => {
        dispatch({ type: TAXONOMIES_FETCHING });
        var request = require('superagent')
        request
            .get(`${MAIN_URL}/api/v2/storefront/taxons`)
            .query( { include: "image" } )
            .set('Content-Type', 'application/json')
            //.set('Access-Control-Allow-origin', '*')
            .then ((response) => {
                //console.log('action', response)
                dispatch({ type: TAXONOMIES_FETCH_SUCCESS, payload: response.body });
            })
            .catch ((error) => {
                console.log(error);
                dispatch({ type: TAXONOMIES_FETCH_ERROR, payload: error})
            })
    };
}

// export const getTaxonomiesProduct = (taxonID) => {
//     return (dispatch) => {

//     }
// }