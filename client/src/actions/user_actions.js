import axios from 'axios';

import{
LOGIN_USER,
REGISTER_USER
}from './types';

export function loginUser(dataToSubmit){
    const request=axios.post('/api/users/login',dataToSubmit)
    .then(response=>response.data)
    

    return{
        type:LOGIN_USER,
        payload:request
    }
}



//Google Login Request
// export function googleLoginUser(){
//     const request=axios.get('/api/auth/google')
//     .then(response=>response.data).catch((e)=>{console.log(e)})
//     return{
//         type:LOGIN_USER,
//         payload:request
//     }
// }

export function googleLoginUser(){
    window.open('/api/auth/google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
        console.log(message);
      });
    return{
        type:LOGIN_USER
    }

}

export function registerUser(dataToSubmit){
    const request=axios.post('/api/users/register',dataToSubmit)
    .then(response=>response.data)
    

    return{
        type:REGISTER_USER,
        payload:request
    }
}