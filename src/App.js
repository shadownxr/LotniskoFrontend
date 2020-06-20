import React, {useState} from 'react';
import './App.css';
import Button from '@material-ui/core/button';
import NoLoginMenu from './Components/NoLoginMenu';
import CustomerUserMenu from './Components/Customer/CustomerUserMenu';
import EmployeeUserMenu from './Components/Employee/EmployeeUserMenu';
import ManagerUserMenu from './Components/Manager/ManagerUserMenu';
import NewsPage from './Components/AirportPages/NewsPage';
import AboutUsPage from './Components/AirportPages/AboutUsPage';
import MainPage from './Components/AirportPages/MainPage';
import AccountPage from './Components/AccountPage';
import AccountStatus from './Components/AccountStatus';


function App() {
  const [userType,setUserType] = useState(0);
  const [menuChoice, setMenuChoice] = useState(0);

  const renderMenuSwitch = () => {
    switch(userType){
      case 0:
        return <NoLoginMenu />;
      case 1:
        return <CustomerUserMenu />;
      case 2:
        return <EmployeeUserMenu />;
      case 3:
        return <ManagerUserMenu />;
      default:
        return <NoLoginMenu />;
    }
  }

  const renderContentSwitch = () => {
    switch(menuChoice){
      case 0:
        return <MainPage />;
      case 1:
        return <NewsPage />;
      case 2:
        return <AboutUsPage />;
      case 3:
        return <AccountPage />;
      default:
        return <MainPage />;
    }
  }

  return (
    <div className="App">
      <div className="Header">
        <div className="Logo">Logo</div>
        <div style={{display:"flex",flexDirection:"column",flex:2}}>
          <div className="Login"><AccountStatus isLogged={0}/></div>
          <div className="AirportPageMenu">
            Content Menu
            <Button onClick={() => setMenuChoice(0)}>Strona główna</Button>
            <Button onClick={() => setMenuChoice(1)}>Wiadomości</Button>
            <Button onClick={() => setMenuChoice(2)}>O nas</Button>
          </div>
        </div>
      </div>

      <div className="Main">
        <div className="UserMenu">
          {renderMenuSwitch()}
        </div>
        <div className="Content">
          {renderContentSwitch()}
        </div>
      </div>

      <div className="Footer">
        Footer
      </div>
    </div>
  );
}

export default App;
