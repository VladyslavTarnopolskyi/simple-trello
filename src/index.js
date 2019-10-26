import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/rootReducers';


const store = createStore(
  rootReducer
);


const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render( app, document.getElementById('root'));
