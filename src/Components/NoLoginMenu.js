import React from 'react';
import Button from '@material-ui/core/button';

export default function NoLoginMenu(props){
    const handleMenuChoice = (choice) => {
        props.menuChoice(choice);
    }

    return(
        <div>
            <div className="UserMenu"><Button onClick={() => handleMenuChoice("View Flights")}>Przeglądaj loty</Button></div>
        </div>
    )
}