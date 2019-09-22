import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { allReducers, userinitialState } from "./reducer";

export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    { ...userinitialState, ...state },
    composeWithDevTools(applyMiddleware(thunk)),
  )
  return store
}



