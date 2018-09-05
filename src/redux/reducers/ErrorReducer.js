import { DISPLAY_ERROR } from '../actions/types'

const INITIAL_STATE = {
    error: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DISPLAY_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}