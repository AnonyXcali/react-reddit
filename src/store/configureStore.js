import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reduceToGlobalStore from '../reducer/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (initState) => createStore(
  reduceToGlobalStore,
  initState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
)

export default configureStore
