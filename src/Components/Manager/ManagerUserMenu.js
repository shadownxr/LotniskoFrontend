import React from 'react';
import Button from '@material-ui/core/button';

export default function ManagerUserMenu(props){
    const handleMenuChoice = (choice) => {
        props.menuChoice(choice);
    }

    return(
        <div>
            <div className="UserMenu">
                <Button onClick={() => handleMenuChoice("View Employees")}>Przeglądaj pracowników</Button>
            </div>
        </div>
    )
}