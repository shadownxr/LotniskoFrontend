import React, {useState,useEffect} from 'react';
import SignIn from './Authorization/SignIn';
import SignUp from './Authorization/SignUp';
import Button from '@material-ui/core/Button';

export default function AccountStatus(props){
    const [isLogged,setIsLogged] = useState(0);

    useEffect(() => {
      setIsLogged(props.isLogged);  
    },[props.isLogged]);

    const accountStatusSwitch = () => {
        switch(isLogged){
            case 0:
                return <div style={{display:"flex",flexDirection:"row-reverse"}}><SignIn style={{flex:"1"}} /><SignUp style={{flex:"2"}} /></div>;
            case 1:
                return <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>Witaj nazwa_użytkownika!<Button>Dane Konta</Button><Button>Wyloguj</Button></div>;
            default:
                return <div style={{display:"flex",flexDirection:"row-reverse"}}><SignIn style={{flex:"1"}} /><SignUp style={{flex:"2"}} /></div>;
        }
    }

    return(
        <div>
            <div className="AccountStatus">
                {accountStatusSwitch()}
            </div>
        </div>
    )
}