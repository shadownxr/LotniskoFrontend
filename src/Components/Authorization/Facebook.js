import React from 'react';
//import fbLogo from './fb-logo.png';
import Link from '@material-ui/core/Link';
import '../../App.css';
import Box from "@material-ui/core/Box";

/**
 * Facebook login link
 */
export default function Facebook(){

    const API_BASE_URL = 'https://localhost:8443';
    const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
    const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
    const theme = {
        spacing: 8,
    }
    return(

        <Box  m={3}>
            {/*<a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>*/}
            <Link color="whitesmoke" className={'facebookButton'} href={FACEBOOK_AUTH_URL}>Join through Facebook</Link>
        </Box>
    )
}