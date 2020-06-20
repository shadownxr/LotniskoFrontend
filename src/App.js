import React, {useState} from 'react';
import './App.css';
import Button from '@material-ui/core/button';
import NoLoginMenu from './Components/NoLoginMenu';
import CustomerUserMenu from './Components/Customer/CustomerUserMenu';
import EmployeeUserMenu from './Components/Employee/EmployeeUserMenu';
import ManagerUserMenu from './Components/Manager/ManagerUserMenu';

function App() {

  const [user,setUser] = useState(0);

  const renderMenuSwitch = () => {
    switch(user){
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

  return (
    <div className="App">
      <div className="Header">
        <div className="Logo">Logo</div>
        <div style={{display:"flex",flexDirection:"column",flex:2}}>
          <div className="Login">Login</div>
          <div className="ContentMenu">Content Menu<Button>Strona główna</Button><Button>Wiadomości</Button></div>
        </div>
      </div>

      <div className="Main">
        <div className="UserMenu">
          {renderMenuSwitch()}
        </div>
        <div className="Content">Content</div>
      </div>

      <div className="Footer">
        Footer
      </div>
    </div>
  );
}

export default App;
