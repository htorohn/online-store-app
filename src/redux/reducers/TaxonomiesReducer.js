import {
    TAXONOMIES_FETCH_SUCCESS,
    TAXONOMIES_FETCH_ERROR,
    TAXONOMIES_FETCHING
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    taxonomies: {},
    error: false

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAXONOMIES_FETCHING:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case TAXONOMIES_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                taxonomies: action.payload
            }
        case TAXONOMIES_FETCH_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state;
    }
};