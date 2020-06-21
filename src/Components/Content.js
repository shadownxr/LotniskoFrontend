import React from 'react';
import NewsPage from './AirportPages/NewsPage';
import AboutUsPage from './AirportPages/AboutUsPage';
import MainPage from './AirportPages/MainPage';
import AccountPage from './AccountPage';
import ViewFlights from './Flights/ViewFlights';
import OnlineBriefing from './Customer/OnlineBriefing';
import EmployeeViewFlights from './Employee/EmployeeViewFlights';
import ViewEmployees from './Manager/ViewEmployees';
import CustomerReservations from './Customer/CustomerReservations';

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
            return <AccountPage />;
          case "View Flights":
            return <ViewFlights />;
          case "Online Briefing":
            return <OnlineBriefing />;
          case "Employee View Flights":
            return <EmployeeViewFlights />;
          case "View Employees":
            return <ViewEmployees />;
          case "Customer Reservations":
            return <CustomerReservations />;
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