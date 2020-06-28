import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function OAuth2RedirectHandler(){
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    let dt = new Date();
    dt.setMinutes( dt.getMinutes() + 15 );

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        let results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');

    if(token) {
        setCookie('userToken',{token:token,tokenType:"Bearer"},{expires: dt});
        return <Redirect to={{
            pathname: "/",
            state: { from: this.props.location }
        }}/>; 
    } else {
        return <Redirect to={{
            pathname: "/",
            state: { 
                from: this.props.location,
                error: error 
            }
        }}/>; 
    }
}