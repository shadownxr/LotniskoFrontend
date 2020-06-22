import React, {useState, useEffect} from 'react';
import './App.css';
import Button from '@material-ui/core/button';
import UserMenu from './Components/UserMenu';
import AccountStatus from './Components/AccountStatus';
import Content from './Components/Content';

function App() {
  const [userType,setUserType] = useState("");
  const [menuChoice, setMenuChoice] = useState(0);
  const [tokenId, setTokenId] = useState(0);

  useEffect(() => {
    setUserType("Manager");
  },[userType]);

  return (
    <div className="App">
      <div className="Header">
        <div className="Logo">Logo</div>
        <div style={{display:"flex",flexDirection:"column",flex:2}}>
          <div className="Login"><AccountStatus isLogged={1}/></div>
          <div className="AirportPageMenu">
            <div className="AirportMenuButtonCluster">
            <Button onClick={() => setMenuChoice("Main Page")}>Strona główna</Button>
            <Button onClick={() => setMenuChoice("News")}>Wiadomości</Button>
            <Button onClick={() => setMenuChoice("About Us")}>O nas</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="Main">
        <div className="UserMenu">
          <UserMenu userType={userType} menuChoice={(choice) => setMenuChoice(choice)} tokenId={tokenId}/>
        </div>
        <div className="Content">
          <div className="ContentContainer"><Content menuChoice={menuChoice} /></div>
        </div>
      </div>

      <div className="Footer">
        Footer
      </div>
    </div>
  );
}

export default App;
