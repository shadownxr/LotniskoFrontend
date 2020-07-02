import React from 'react';
import { shallow } from 'enzyme';

import MainPage from "../AirportPages/MainPage";
import Content from "../Content";
import NewsPage from "../AirportPages/NewsPage";
import AboutUsPage from "../AirportPages/AboutUsPage";
import AccountPage from "../AccountPage";
import ViewFlights from "../Flights/ViewFlights";
import OnlineBriefing from "../Customer/OnlineBriefing";
import EmployeeViewFlights from "../Employee/ManageFlights/EmployeeViewFlights";
import EmployeeViewAirports from "../Employee/ManageAirports/EmployeeViewAirports";
import EmployeeViewPlanes from "../Employee/ManagePlanes/EmployeeViewPlanes";
import ViewEmployees from "../Manager/AdministerEmployees/ViewEmployees";
import ViewFiredEmployees from "../Manager/AdministerEmployees/ViewFiredEmployees";
import CustomerReservations from "../Customer/CustomerReservations";
import CustomerUserMenu from "../Customer/CustomerUserMenu";


const accountData = {username: "Admin", email: "Admin@Example.com"};

describe('CustomerUserMenu test',() =>{
    it('Renders when loaded',() =>{
        const wrapper = shallow(<CustomerUserMenu />);
        expect(wrapper.find(<MainPage />)).toMatchSnapshot();
    })
    it('Renders OnlineBriefing on change',() => {
        const choice = "Online Briefing";
        const wrapper = shallow(<CustomerUserMenu menuChoice={choice}/>);
        expect(wrapper.find(<OnlineBriefing accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders CustomerReservations menu on change',() => {
        const choice = "Customer Reservations";
        const wrapper = shallow(<CustomerUserMenu menuChoice={choice}/>);
        expect(wrapper.find(<CustomerReservations accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders ViewFlights menu on change',() => {
        const choice = "View Flights";
        const wrapper = shallow(<CustomerUserMenu menuChoice={choice}/>);
        expect(wrapper.find(<ViewFlights accountData={accountData}/>)).toMatchSnapshot();
    })
})
