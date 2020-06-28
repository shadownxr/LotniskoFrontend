import React, {useState,useEffect,useRef} from 'react';
import SignIn from './Authorization/SignIn';
import SignUp from './Authorization/SignUp';
import Button from '@material-ui/core/Button';
import Cookie from 'react-cookies';

export default function AccountStatus(props){
    const [isLogged,setIsLogged] = useState(0);
    const [accountData,setAccountData] = useState();

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
            window.location.reload();
        }
    } 

    const accountStatusSwitch = () => {
        switch(isLogged){
            case false:
                return <div style={{display:"flex",flexDirection:"row-reverse"}}><SignIn style={{flex:"1"}} accountData={(accountData) => {setAccountData(accountData)}}/><SignUp style={{flex:"2"}} refresh={(refresh) => {props.refresh(refresh)}} /></div>;
            case true:
                return (<div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                            <div className={'userGreet'}>Hello {accountData.username}!</div>
                            <div className={'authButton'}><Button>My Account</Button></div>
                            <div className={'authButton'} onClick={() => logout()}><Button >Sign out</Button></div>
                        </div>)
            default:
                return <div style={{display:"flex",flexDirection:"row-reverse"}}><SignIn style={{flex:"1"}} /><SignUp style={{flex:"2"}} refresh={(refresh) => {props.refresh(refresh)}}/></div>;
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
