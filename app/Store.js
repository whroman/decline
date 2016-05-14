import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createLogger from 'redux-logger';

import adjectiveTrainerReducer from './dux/adjectiveTrainer';

const middleware = [
    createLogger()
];

const storeEnhancer = compose(applyMiddleware(...middleware));
const rootReducer = combineReducers({
    routing: routerReducer,
    adjectiveTrainer: adjectiveTrainerReducer
});

export default function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, storeEnhancer);
  return store;
}
