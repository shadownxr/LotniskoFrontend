import React, {useState} from 'react';
import './App.css';
import Button from '@material-ui/core/button';
import UserMenu from './Components/UserMenu';
import AccountStatus from './Components/AccountStatus';
import Content from './Components/Content';

function App() {
  const [menuChoice, setMenuChoice] = useState(0);
  const [accountData, setAccountData] = useState();

  console.log(accountData);

  return (
    <div className="App">
      <div className="Header">
        <div className="Logo">Logo</div>
        <div style={{display:"flex",flexDirection:"column",flex:2}}>
          <div className="Login"><AccountStatus accountData={(accountData) => {setAccountData(accountData)}}/></div>
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
          <UserMenu userType={accountData?accountData.roles[accountData.roles.length - 1]:"Not logged"} menuChoice={(choice) => setMenuChoice(choice)} accountData={accountData}/>
        </div>
        <div className="Content">
          <div className="ContentContainer"><Content menuChoice={menuChoice} accountData={accountData}/></div>
        </div>
      </div>

      <div className="Footer">
        Footer
      </div>
    </div>
  );
}

export default App;
