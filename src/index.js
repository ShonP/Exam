import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './shared/reducers/appReducers';
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
const store = createStore(reducers, composeWithDevTools());
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
