import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

//setup for middleware
const middlewares = [logger];// array
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;