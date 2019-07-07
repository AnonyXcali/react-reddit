import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reduceToGlobalStore from '../reducer/reducer'

const configureStore = (initState) => createStore(
  reduceToGlobalStore,
  initState,
  applyMiddleware(thunkMiddleware)
)

export default configureStore
