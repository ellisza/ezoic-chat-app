import React from 'react';
import "./Login.css";
import { signInWithGoogle} from '../../serviceProvider/firebase';
import { Button } from "@material-ui/core";
import {ReactComponent as EzoicLogo} from '../../ezoic.svg';

function Login() {
    const signIn = () =>{
        signInWithGoogle()
        .catch((error) => alert(error.message));
    }

  return(
    <div className='login'>
        <div>
          <EzoicLogo className="login_logo" />
        </div>

        <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
