import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reduceToGlobalStore from '../reducer/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';


/*
TODO : Explain
*/

//const composeEnhancers = composeWithDevTools({ realtime: true, port: 3000 });

const configureStore = (initState) => createStore(
  reduceToGlobalStore,
  initState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
)

export default configureStore
