import React from 'react';
import fbLogo from './fb-logo.png';

export default function Facebook(){
    return(
        <div>
            <a className="btn btn-block social-btn facebook" href={"http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/oauth2/redirect"}>
                    <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
        </div>
    )
}