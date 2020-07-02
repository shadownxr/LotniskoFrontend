import React from 'react';
import NewsPage from './AirportPages/NewsPage';
import AboutUsPage from './AirportPages/AboutUsPage';
import MainPage from './AirportPages/MainPage';
import AccountPage from './AccountPage';
import ViewFlights from './Flights/ViewFlights';
import OnlineBriefing from './Customer/OnlineBriefing';
import EmployeeViewFlights from './Employee/ManageFlights/EmployeeViewFlights';
import ViewEmployees from './Manager/AdministerEmployees/ViewEmployees';
import ViewFiredEmployees from "./Manager/AdministerEmployees/ViewFiredEmployees";
import CustomerReservations from './Customer/CustomerReservations';
import EmployeeViewPlanes from "./Employee/ManagePlanes/EmployeeViewPlanes";
import EmployeeViewAirports from "./Employee/ManageAirports/EmployeeViewAirports";

/**
 * Component that render pages in Content div depending on user choice
 * @param {menuChoice,accountData} props 
 */
export default function Content(props){
    const renderContentSwitch = () => {
        switch(props.menuChoice){
          case "Main Page":
            return <MainPage />;
          case "News":
            return <NewsPage />;
          case "About Us":
            return <AboutUsPage />;
          case "Account Page":
            return <AccountPage accountData={props.accountData}/>;
          case "View Flights":
            return <ViewFlights accountData={props.accountData}/>;
          case "Online Briefing":
            return <OnlineBriefing accountData={props.accountData}/>;
          case "Employee View Flights":
            return <EmployeeViewFlights accountData={props.accountData}/>;
          case "Employee View Airports":
            return <EmployeeViewAirports accountData={props.accountData}/>;
          case "Employee View Planes":
            return <EmployeeViewPlanes accountData={props.accountData}/>;
          case "View Employees":
            return <ViewEmployees accountData={props.accountData}/>;
          case "View Fired Employees":
            return <ViewFiredEmployees accountData={props.accountData}/>;
          case "Customer Reservations":
            return <CustomerReservations accountData={props.accountData}/>;
          default:
            return <MainPage />;
        }
      }

      return(
        <div>
          {renderContentSwitch()}
        </div>
      )
}
