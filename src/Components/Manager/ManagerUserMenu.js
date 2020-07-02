import React from 'react';
import Button from '@material-ui/core/button';

/**
 * Manager menu
 * @param {menuChoice} props 
 */
export default function ManagerUserMenu(props){
    const handleMenuChoice = (choice) => {
        props.menuChoice(choice);
    }

    return(
        <div>
            <div className="UserMenu">
                <Button style={{color: '#fbfd8a'}} onClick={() => handleMenuChoice("View Employees")}>CURRENT EMPLOYEES</Button>
                <Button style={{color: '#fbfd8a'}} onClick={() => handleMenuChoice("View Fired Employees")}>FORMER EMPLOYEES</Button>
            </div>
        </div>
    )
}
