import React from 'react';
import Button from '@material-ui/core/button';

export default function CustomerUserMenu(props){
    const handleMenuChoice = (choice) => {
        props.menuChoice(choice);
    }

    return(
        <div>
            <div className="UserMenu">
                <Button onClick={() => handleMenuChoice("View Flights")}>Przeglądaj loty</Button>
                <Button onClick={() => handleMenuChoice("Customer Reservations")}>Zarządzaj rezerwacjami</Button>
                <Button onClick={() => handleMenuChoice("Online Briefing")}>Odprawa online</Button>
            </div>
        </div>
    )
}