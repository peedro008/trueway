import { applyMiddleware, compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducer from './reducer'

const middleware = compose(applyMiddleware(promise, logger, thunk ),
persistState()
);

 const store = createStore(reducer, middleware)
export default store