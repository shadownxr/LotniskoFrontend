import React from 'react';
import Button from '@material-ui/core/button';
import red from "@material-ui/core/colors/red";

export default function NoLoginMenu(props){
    const handleMenuChoice = (choice) => {
        props.menuChoice(choice);
    }

    return(
        <div>
            <div className="UserMenu"><Button style={{color: '#fbfd8a'}} onClick={() => handleMenuChoice("View Flights")}>Flights</Button></div>
        </div>
    )
}