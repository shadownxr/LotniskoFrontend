import React, {useState,useEffect,useRef} from 'react';
import SignIn from './Authorization/SignIn';
import SignUp from './Authorization/SignUp';
import Button from '@material-ui/core/Button';
import Cookie from 'react-cookies';

/**
 * Component that render upper right corner buttons for user to sign in, sign up or when user is logged in
 * Button to check current user account data or to logout
 * @param {accountData,accountData2,refresh,menuChoice} props 
 */
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

    /**
     * Function that clears localStorage and removes cookie when page is refreshed
     */
    const Child = () => {
        useWindowUnloadEffect(() => Cookie.remove('userToken'), true);
        useWindowUnloadEffect(() => localStorage.clear(), true);
    }
 
    useEffect(() => {
        if(Cookie.load('userToken')){
            setAccountData(props.accountData2);
            setIsLogged(true);
        } else {
            setIsLogged(false);
        };
    },[isLogged,props,accountData])

    const handleMyAccount = () => {
        props.menuChoice("Account Page");
    }

    const logout = () => {
        if(Cookie.load('userToken')){
            Cookie.remove('userToken');
            localStorage.clear()
            setIsLogged(false);
            window.location.reload();
        }
    } 

    const accountStatusSwitch = () => {
        switch(isLogged){
            case false:
                return <div style={{display:"flex",flexDirection:"row-reverse"}}>
                        <SignIn style={{flex:"1"}} accountData={(accountData) => {props.accountData(accountData)}}/>
                        <SignUp style={{flex:"2"}} refresh={(refresh) => {props.refresh(refresh)}} />
                    </div>;
            case true:
                return (<div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                            <div><Button onClick={() => handleMyAccount()}>My Account</Button></div>
                            <div onClick={() => logout()}><Button >Sign out</Button></div>
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
