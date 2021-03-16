import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/reducer';
import { getUser } from './store/actions/actions';
import 'antd/dist/antd.css';
import App from './compoments/App';

const actionSanitizer = (action) =>
  action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ? { ...action, data: '<<LONG_BLOB>>' } : action;

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionSanitizer,
        stateSanitizer: (state) => (state.data ? { ...state, data: '<<LONG_BLOB>>' } : state),
      })
    : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const { dispatch } = store;

const update = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
};

// eslint-disable-next-line no-return-await
dispatch(getUser()).then((res) => {
  if (res === false) {
    update();
  }
});

store.subscribe(update);
