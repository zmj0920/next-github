import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const initialState = {
    count: 0
}
const userinitialState = {
    username: 'zhazhaxin'
}
const ADD = 'ADD'
function countreducer(state = initialState, action) {
    console.log(state, action)
    switch (action.type) {
        case ADD:
            return { count: state.count + (action.num | 1) }
        default:
            return state
    }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducers(state = userinitialState, action) {
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


const allReducers = combineReducers({
    counter: countreducer,
    user: userReducers,
})


const store = createStore(allReducers, {
    counter: initialState,
    user: userinitialState
},composeWithDevTools(applyMiddleware(thunk)))


//action creatore
function add(num) {
    return {
        type: ADD,
        num
    }
}

console.log(store.getState())

store.dispatch({ type: ADD })
store.dispatch(add(3))

store.dispatch({ type: 'UPDATE_USERNAME', name: 'zmj' })


console.log(store.getState())
console.log(store)
export default store


