import React from 'react';
import Button from '@material-ui/core/button';

export default function EmployeeUserMenu(props){
    const handleMenuChoice = (choice) => {
        props.menuChoice(choice);
    }

    return(
        <div>
            <div className="UserMenu">

            <Button style={{color: '#fbfd8a'}} onClick={() => handleMenuChoice("Employee View Flights")}>FLIGHTS</Button>
            <Button style={{color: '#fbfd8a'}} onClick={() => handleMenuChoice("Employee View Airports")}>AIRPORTS</Button>
            <Button style={{color: '#fbfd8a'}} onClick={() => handleMenuChoice("Employee View Planes")}>PLANES</Button>
            </div>

        </div>
    )
}
