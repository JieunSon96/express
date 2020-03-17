import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise'; 
import ReduxThunk from 'redux-thunk';
import "materialize-css/dist/css/materialize.min.css";
import "bulma/css/bulma.css";
import reducers from './reducers';
import axios from 'axios';

import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import DashBoard from './components/Dashboard';


import authGuard from './components/HOCs/authGuard';

import './i18next';


// const createStoreWithMiddleware= applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);

// ReactDOM.render(
  
//    <Provider store={createStoreWithMiddleware(Reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
// <BrowserRouter>
//      <App>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/signup" component={SignUp} />
//         <Route exact path="/signin" component={SignIn} />
//         </App> 
//      </BrowserRouter>
//      </Provider>
//     , document.getElementById('root'));


// serviceWorker.unregister();

const createStoreWithMiddleware= applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);

const jwtToken = localStorage.getItem('JWT_TOKEN');

axios.defaults.headers.common['Authorization'] = jwtToken;

ReactDOM.render(
  
   <Provider store={createStore(reducers,{
      auth:{
         token:jwtToken,
         isAuthenticated:jwtToken ? true : false
      }
   },applyMiddleware(ReduxThunk))}>
<BrowserRouter>
     <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/dashboard" component={authGuard(DashBoard)} />
        </App> 
     </BrowserRouter>
     </Provider>
    , document.getElementById('root'));


serviceWorker.unregister();


