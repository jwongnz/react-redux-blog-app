import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import './index.css';
import App from './components/app/app';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store';
import { saveState, loadState } from './localStorage';
import throttle from 'lodash/throttle';
import ReduxPromise from 'redux-promise';

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(ReduxPromise)
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
