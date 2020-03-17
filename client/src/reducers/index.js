// import {combineReducers} from 'redux';

// import user from './user_reducer';
// import chats from './chat_reducer';

// const rootReducer =combineReducers({
//     user,chats

// })

// export default rootReducer;


import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import dashBoardReducer from './dashBoard';

export default combineReducers({
  form: formReducer,
  auth:authReducer,
  dash: dashBoardReducer
});
