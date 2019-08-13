import { compose, createStore } from 'redux';
import Immutable from 'seamless-immutable';

import persistState, { mergePersistedState, transformState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import debounce from 'redux-localstorage-debounce';
import filter from 'redux-localstorage-filter';

import rootReducer from 'store/reducers';
import initialState from 'store/initial-state';
import { PERSISTANCE_FILTER } from 'store/constants';

const middleware = [];

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const reducer = compose()(rootReducer);
mergePersistedState((initialState, persistedState) => initialState.merge(persistedState));

const storage = compose(
  transformState(null, Immutable),
  filter(PERSISTANCE_FILTER),
  debounce(100)
)(adapter(window.localStorage));

middleware.push(persistState(storage, 'br-808'));

const enhancer = compose(...middleware);

export default createStore(reducer, initialState, enhancer);
