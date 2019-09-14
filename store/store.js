import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ADD, UPDATE_USERNAME } from './actionTypes'
import { add } from './actionCreatores'
import reducer from "./reducer";





























// const initialState = {
//     count: 0
// }
// const userinitialState = {
//     username: 'zhazhaxin'
// }
// function countreducer(state = initialState, action) {
//     console.log(state, action)
//     switch (action.type) {
//         case ADD:
//             return { count: state.count + (action.num | 1) }
//         default:
//             return state
//     }
// }

// function userReducers(state = userinitialState, action) {
//     switch (action.type) {
//         case UPDATE_USERNAME:
//             return {
//                 ...state,
//                 username: action.name
//             }
//         default:
//             return state
//     }
// }


// const allReducers = combineReducers({
//     counter: countreducer,
//     user: userReducers,
// })


// const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
// console.log(store.getState())
// store.dispatch({ type: ADD })
// store.dispatch(add(3))
// store.dispatch({ type: 'UPDATE_USERNAME', name: 'Lilei' })
// console.log(store.getState())
// console.log(store)


export default function initializeStore(state) {
    const store = createStore(
        reducer,
      {...state },
      composeWithDevTools(applyMiddleware(thunk)),
    )
    return store
  }
  


