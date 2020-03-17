import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_IN, AUTH_ERROR, DASHBOARD_GET_DATA } from './types';
/*
ActionCreators -> create/return Actions ({ }) -> dispatched -> middlewares -> reducers

*/

//Google Action
export const oauthGoogle = data => { 
    return async dispatch => {
        console.log('we received',data);
        const res =  await axios.post('http://localhost:3005/users/oauth/google',{
            access_token: data
        })
        console.log('res',res);

        dispatch({
            type:AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN',res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
    };
}


//Facebook Action
export const oauthFacebook = data => { 
    return async dispatch => {
        console.log('we received',data);
        const res =  await axios.post('http://localhost:3005/users/oauth/facebook',{
            access_token: data
        })
        console.log('res',res);

        dispatch({
            type:AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN',res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
    };
}

//SignUp Action
export const signUp = data => {
  
        /*
          Step 1 ) Use the data and to make HTTP request to our BE and send it along
          Step 2 ) Take the BE's response(jwtToken is here now!)
          Step 3 ) Dispatch user just signed up ( with jwtToken )
          Step 4 ) Save the jwtToken into our localStorage

        */
       return async dispatch => {

        try{
            console.log('[ActionCreator] signup called!');
           const res = await axios.post('http://localhost:3005/users/signup', data)
           

           console.log('[ActionCreator] signup dispatched an action !');
            dispatch({
                type:AUTH_SIGN_UP,
                payload:res.data.token
            });

            localStorage.setItem('JWT_TOKEN',res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        }catch(err){
            dispatch({
                type:AUTH_ERROR,
                payload: 'Email is already in use'
            })

            console.log('err',err);
        }
    };
}

//SignIn Action
export const signIn = data => {
  
   return async dispatch => {

    try{
        console.log('[ActionCreator] signIn called!');
       const res = await axios.post('http://localhost:3005/users/signin', data)
       

       console.log('[ActionCreator] signIn dispatched an action !');
       
        dispatch({
            type:AUTH_SIGN_IN,
            payload:res.data.token
        });

        localStorage.setItem('JWT_TOKEN',res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
    }catch(err){
        dispatch({
            type:AUTH_ERROR,
            payload: 'Email and password combination isn\'t valid'
        })
    }
};
}

export const getSecret = () => {
    return async dispatch => {

        try{
        console.log('[ActionCreator] Trying to get B SECRET');
        const res = await axios.get('http://localhost:3005/users/secret');
        console.log('res',res);

        dispatch({
            type: DASHBOARD_GET_DATA,
            payload:res.data.secret
        })
            }catch(err){
                console.error('err',err);
            }
    }
}

//SignOut Action
export const signOut = () => {
    return dispatch => { 
        localStorage.removeItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = '';
        dispatch({
            type:AUTH_SIGN_OUT,
            payload: ''
        })
    };
}