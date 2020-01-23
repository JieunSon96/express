import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise'; 
import ReduxThunk from 'redux-thunk';
import "materialize-css/dist/css/materialize.min.css";
import Reducer from './reducers';

import './i18next';
const createStoreWithMiddleware= applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);

ReactDOM.render(
  
   <Provider store={createStoreWithMiddleware(Reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>

   

     <BrowserRouter>
     <Suspense fallback={(<div>Loading~~~</div>)}>
     <App />
     </Suspense>
     </BrowserRouter>
     </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


