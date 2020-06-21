import React from 'react';
import NoLoginMenu from './NoLoginMenu';
import CustomerUserMenu from './Customer/CustomerUserMenu';
import EmployeeUserMenu from './Employee/EmployeeUserMenu';
import ManagerUserMenu from './Manager/ManagerUserMenu';

export default function UserMenu(props){
    const renderMenuSwitch = () => {
        switch(props.userType){
          case "Not Logged":
            return <NoLoginMenu menuChoice={(choice) => props.menuChoice(choice)}/>;
          case "Customer":
            return <CustomerUserMenu menuChoice={(choice) => props.menuChoice(choice)}/>;
          case "Employee":
            return <EmployeeUserMenu menuChoice={(choice) => props.menuChoice(choice)}/>;
          case "Manager":
            return <ManagerUserMenu menuChoice={(choice) => props.menuChoice(choice)}/>;
          default:
            return <NoLoginMenu menuChoice={(choice) => props.menuChoice(choice)}/>;
        }
      }
      return(
        <div>
          {renderMenuSwitch()}
        </div>
      )
}