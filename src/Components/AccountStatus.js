import React, {useState,useEffect} from 'react';
import Link from '@material-ui/core/Link';

export default function AccountStatus(props){
    const [isLogged,setIsLogged] = useState(0);

    useEffect(() => {
      setIsLogged(props.isLogged);  
    },[props.isLogged]);

    const accountStatusSwitch = () => {
        switch(isLogged){
            case 0:
                return <Link>Nie jesteś zalogowany, kliknij aby się zalogować.</Link>;
            case 1:
                return <div>Witaj nazwa_użytkownika!</div>;
            default:
                return <Link>Nie jesteś zalogowany, kliknij aby się zalogować.</Link>;
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