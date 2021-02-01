import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import App from './App';

const loggerMiddleware = (store) => (next) => (action) =>{
  const result = next(action);
  console.log('Middleware', store.getState());
  return result;
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);