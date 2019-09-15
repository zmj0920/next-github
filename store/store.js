import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import { ADD, UPDATE_USERNAME } from './actionTypes'
// import { add } from './actionCreatores'
import reducer from "./reducer";
export default function initializeStore(state) {
  const store = createStore(
    reducer,
    Object.assign({}, { ...state }),
    composeWithDevTools(applyMiddleware(thunk)),
  )
  // console.log(store.getState())
  // store.dispatch({ type: ADD })
  // store.dispatch(add(3))
  // store.dispatch({ type: UPDATE_USERNAME, name: 'Lilei' })
  // console.log(store.getState())
  // console.log(store)

  return store
}



