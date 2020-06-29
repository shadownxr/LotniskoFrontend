import React from 'react';

export default function AccountPage(props){
    return(
        <div>
            <div className="Account">
                Username: {props.accountData.username} <br/>
                Email: {props.accountData.email} <br/>
            </div>
        </div>
    )
}