import React from 'react';
import {useGoogleLogin} from  '@react-oauth/google'
import {googleAuth} from './api';
import { useNavigate } from 'react-router-dom';

function GoogleLogin() {
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try{
        console.log(authResult);
        if(authResult['code']){
          const result = await googleAuth(authResult['code']);
          const {email, name,image} = result.data.user;
          const token = result.data.token;
          const obj = {email, name, image, token};
          localStorage.setItem('user-info', JSON.stringify(obj));
          console.log('token : ', token)
          console.log('email name and image', result.data.user);
          navigate('/dashboard');
        }
    }
    catch(err){
      console.log('error while requesting google', err);
    }
  } 

  const googleLogin = useGoogleLogin({
    onSuccess : responseGoogle,
    onError : responseGoogle,
    flow : 'auth-code' 
  });
  return (
    <div>
      <button onClick={googleLogin}>Login</button>
    </div>
  );
}

export default GoogleLogin;