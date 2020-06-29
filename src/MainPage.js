import React, {useEffect, useState} from 'react';
import './App.css';
import Button from '@material-ui/core/button';
import UserMenu from './Components/UserMenu';
import AccountStatus from './Components/AccountStatus';
import Content from './Components/Content';
import logo from './resources/logo.png';
import Cookie from "react-cookies";

function MainPage(props) {
  const [menuChoice, setMenuChoice] = useState(0);
  const [accountData, setAccountData] = useState();
  const [thyme, setThyme] = useState("");
  const [refresh,setRefresh] = useState(true);

  let dt = new Date();
  dt.setMinutes( dt.getMinutes() + 15 );

  useEffect(() => {
      if(refresh === true){
          fetchUsers();
          setRefresh(false);
      }
  },[refresh])

  useEffect(() => {
    if(localStorage.getItem('facebookToken') !== null){
      setAccountData(props.location.state.accountData);
      Cookie.save('userToken',{token:localStorage.getItem('facebookToken'),tokenType:"Bearer"},{path:'/',expires: dt});
      console.log(Cookie.load('userToken').token);
    }
  },[dt]);

  const fetchUsers = () => {
      const url = "https://localhost:8443/thyme";

      fetch(url)
          .then(response => response.text())
          .then(result => {
              console.log(result);
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
          <div className="Login"><AccountStatus accountData={(accountData) => {setAccountData(accountData)}} accountData2={accountData} refresh={(refresh) => {setRefresh(true)}}/></div>
          <div className="AirportPageMenu">
            <div className="AirportMenuButtonCluster">
                <Button className={"menuButton"} onClick={() => setMenuChoice("Main Page")}>Home</Button>
                <Button className={"menuButton"} onClick={() => setMenuChoice("News")}>News</Button>
                <Button className={"menuButton"} onClick={() => setMenuChoice("About Us")}>About</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="Main">
        <div className="UserMenu">
          <UserMenu userType={accountData?accountData.roles[accountData.roles.length - 1]:"Not logged"} menuChoice={(choice) => setMenuChoice(choice)} accountData={accountData}/>
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
