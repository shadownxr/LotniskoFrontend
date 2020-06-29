import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        const id = this.getUrlParameter('id');
        const username = this.getUrlParameter('username');
        const email = this.getUrlParameter('email');
        if(token) {
            localStorage.setItem('facebookToken', token);
            console.log("TOKEN = " + token);
            console.log(this.props.location);
            const accountData = {id: id,roles: ["ROLE_USER"],username:username,email:email};
            //console.log(accountData);
            return <Redirect to={{
                pathname: "",
                state: { accountData: accountData }
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
}

export default OAuth2RedirectHandler;