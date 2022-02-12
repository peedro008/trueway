import { applyMiddleware } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import reducer from "./reducer"
import {compose, createStore} from 'redux';

import persistState from 'redux-localstorage'
 
const enhancer = compose(
  composeWithDevTools(applyMiddleware(thunk)),
  persistState(/*paths, config*/),
)
 
const store = createStore(reducer, enhancer)


export default store
