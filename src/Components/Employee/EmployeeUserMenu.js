import React from 'react';
import Button from '@material-ui/core/button';

export default function EmployeeUserMenu(props){
    const handleMenuChoice = (choice) => {
        props.menuChoice(choice);
    }

    return(
        <div>
            <div className="UserMenu">

            <Button onClick={() => handleMenuChoice("Employee View Flights")}>Zarządzaj lotami</Button>
            <Button onClick={() => handleMenuChoice("Employee View Airports")}>Zarządzaj lotniskami</Button>
            <Button onClick={() => handleMenuChoice("Employee View Planes")}>Zarządzaj samolotami</Button>
            </div>

        </div>
    )
}
