// import { ADD, UPDATE_USERNAME } from './actionTypes'
import { combineReducers } from 'redux'

const userinitialState = {}

export const userReducers = (state = userinitialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}


export default combineReducers({
    user: userReducers,
});