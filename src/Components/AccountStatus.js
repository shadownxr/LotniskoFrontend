import React, {useState,useEffect,useRef} from 'react';
import SignIn from './Authorization/SignIn';
import SignUp from './Authorization/SignUp';
import Button from '@material-ui/core/Button';
import Cookie from 'react-cookies';

export default function AccountStatus(props){
    const [isLogged,setIsLogged] = useState(0);
    const [accountData,setAccountData] = useState();
    const [userType,setUserType] = useState("Not logged");

    const useWindowUnloadEffect = (handler, callOnCleanup) => {
        const cb = useRef();
        
        cb.current = handler;
        
        useEffect(() => {
          const handler = () => cb.current();
        
          window.addEventListener('beforeunload', handler);
          
          return () => {
            if(callOnCleanup) handler();
          
            window.removeEventListener('beforeunload', handler);
          }
        }, [cb,callOnCleanup])
    };

    const Child = () => {
        useWindowUnloadEffect(() => Cookie.remove('userToken'), true);
    }
 
    useEffect(() => {
        if(Cookie.load('userToken')){
            setIsLogged(true);
        } else {
            setIsLogged(false);
        };
        props.accountData(accountData);
    },[isLogged,props,accountData])

    const logout = () => {
        if(Cookie.load('userToken')){
            console.log("Logged out");
            Cookie.remove('userToken');
            setIsLogged(false);
        }
    } 

    const accountStatusSwitch = () => {
        switch(isLogged){
            case false:
                return <div style={{display:"flex",flexDirection:"row-reverse"}}><SignIn style={{flex:"1"}} accountData={(accountData) => {setAccountData(accountData)}}/><SignUp style={{flex:"2"}} /></div>;
            case true:
                return <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>Witaj {accountData.username}!<Button>Dane Konta</Button><Button onClick={() => logout()}>Wyloguj</Button></div>;
            default:
                return <div style={{display:"flex",flexDirection:"row-reverse"}}><SignIn style={{flex:"1"}} /><SignUp style={{flex:"2"}} /></div>;
        }
    }
    return(
        <div>
            {Child()}
            <div className="AccountStatus">
                {accountStatusSwitch()}
            </div>
        </div>
    )
}