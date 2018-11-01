import { createBrowserHistory } from 'history';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import * as reducers from '../ducks/';

export const history = createBrowserHistory();
const reducer = combineReducers({ ...reducers });

const store = compose(
  applyMiddleware(thunk, routerMiddleware(history)),
  // Provides support for DevTools via Chrome extension
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(connectRouter(history)(reducer));

export default store;
