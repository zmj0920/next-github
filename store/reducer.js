import { ADD, UPDATE_USERNAME } from './actionTypes'
import { combineReducers } from 'redux'

const initialState = {
    count: 0
}
const userinitialState = {
    username: 'zhazhaxin'
}
export  const  countreducer = (state = initialState, action)=> {
    console.log(state, action)
    switch (action.type) {
        case ADD:
            return { count: state.count + (action.num | 1) }
        default:
            return state
    }
}

export   const userReducers=(state = userinitialState, action) => {
    switch (action.type) {
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.name
            }
        default:
            return state
    }
}


export default combineReducers({
    counter: countreducer,
    user: userReducers,
});