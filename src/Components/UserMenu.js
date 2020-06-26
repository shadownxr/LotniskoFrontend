import React, { useEffect, useState } from 'react';
import NoLoginMenu from './NoLoginMenu';
import CustomerUserMenu from './Customer/CustomerUserMenu';
import EmployeeUserMenu from './Employee/EmployeeUserMenu';
import ManagerUserMenu from './Manager/ManagerUserMenu';

export default function UserMenu(props){
    const [userType,setUserType] = useState("Not Logged");

    useEffect(() => {
        setUserType(props.userType);
    },[props.userType])

    const renderMenuSwitch = () => {
        switch(userType){
          case "Not Logged":
            return <NoLoginMenu menuChoice={(choice) => props.menuChoice(choice)}/>;
          case "ROLE_USER":
            return <CustomerUserMenu menuChoice={(choice) => props.menuChoice(choice)}/>;
          case "ROLE_EMPLOYEE":
            return <EmployeeUserMenu menuChoice={(choice) => props.menuChoice(choice)}/>;
          case "ROLE_MANAGER":
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
