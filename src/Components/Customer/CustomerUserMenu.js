import React from 'react';
import Button from '@material-ui/core/button';

export default function CustomerUserMenu(props){
    const handleMenuChoice = (choice) => {
        props.menuChoice(choice);
    }

    return(
        <div>
            <div className="UserMenu">
                <Button style={{color: '#fbfd8a'}} onClick={() => handleMenuChoice("View Flights")}>FLIGHTS</Button>
                <Button style={{color: '#fbfd8a'}}  onClick={() => handleMenuChoice("Customer Reservations")}>MY TICKETS</Button>
                <Button style={{color: '#fbfd8a'}}  onClick={() => handleMenuChoice("Online Briefing")}>CHECK IN</Button>
            </div>
        </div>
    )
}