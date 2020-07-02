import React, {useEffect, useState} from 'react';
import './App.css';
import Button from '@material-ui/core/button';
import UserMenu from './Components/UserMenu';
import AccountStatus from './Components/AccountStatus';
import Content from './Components/Content';
import logo from './resources/logo.png';
import Cookie from "react-cookies";

/**
 * MainPage of website
 * @param {location.state.accountData} props 
 */

function MainPage(props) {
  const [menuChoice, setMenuChoice] = useState(0);
  const [accountData, setAccountData] = useState();
  const [thyme, setThyme] = useState("");
  const [refresh,setRefresh] = useState(true);
  const [role, setRole] = useState("Not logged");

  let dt = new Date();
  dt.setMinutes( dt.getMinutes() + 15 );

  useEffect(() => {
      if(refresh === true){
          fetchUsers();
          setRefresh(false);
      }
  },[refresh])

  /**
   * UseEffect that takes care of logging via Facebook
   */
  useEffect(() => {
    if(localStorage.getItem('facebookToken') !== null){
      const {location,history} = props;
      setAccountData(props.location.state.accountData);
      Cookie.save('userToken',{token:localStorage.getItem('facebookToken'),tokenType:"Bearer"},{path:'/',expires: dt});
      localStorage.clear();
      history.replace();
    }
  },[dt]);

  /**
   * UseEffect that sets role of a user by checking array of users roles
   */
  useEffect(() => {
    if(accountData){
      if(accountData.roles.indexOf("ROLE_MANAGER") > -1){
        setRole("ROLE_MANAGER");
        return;
      } else if(accountData.roles.indexOf("ROLE_EMPLOYEE") > -1){
        setRole("ROLE_EMPLOYEE");
        return;
      } else if(accountData.roles.indexOf("ROLE_USER") > -1){
        setRole("ROLE_USER");
        return;
      }
    }
  })

  /**
   * Fetches last logged in users and number of created accounts using Thymeleaf
   */
  const fetchUsers = () => {
      const url = "https://localhost:8443/thyme";

      fetch(url)
          .then(response => response.text())
          .then(result => {
              setThyme(result);
          });

  }

  return (
    <div className="App">
      <div className="Header">
        <div className="Logo">
            <img alt="logo" src={logo} className={'LogoImage'}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",flex:2, height:"100%"}}>
          <div className="Login"><AccountStatus accountData={(accountData) => {setAccountData(accountData)}} menuChoice={(choice) => setMenuChoice(choice)} accountData2={accountData} refresh={(refresh) => {setRefresh(true)}}/></div>
          <div className="AirportPageMenu">
            <div className="AirportMenuButtonCluster">
                <Button className={"menuButton"} onClick={() => setMenuChoice("Main Page")}>Strona główna</Button>
                <Button className={"menuButton"} onClick={() => setMenuChoice("News")}>Nowości</Button>
                <Button className={"menuButton"} onClick={() => setMenuChoice("About Us")}>O nas</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="Main">
        <div className="UserMenu">
          <UserMenu userType={role} menuChoice={(choice) => setMenuChoice(choice)} accountData={accountData}/>
        </div>
        <div className="Content">
          <div className="ContentContainer"><Content menuChoice={menuChoice} accountData={accountData}/></div>
        </div>
      </div>

      <div  dangerouslySetInnerHTML={{__html: thyme}} />
      <div className="Footer">
        3ID12B Filipowicz Artur, Grzyb Piotr, Klusek Tobiasz, Świątek Kamil
      </div>
    </div>
  );
}

export default MainPage;
