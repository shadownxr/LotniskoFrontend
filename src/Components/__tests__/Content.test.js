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


const accountData = {username: "Admin", email: "Admin@Example.com"};

describe('UserMenu test',() =>{
    it('Renders when loaded',() =>{
        const wrapper = shallow(<Content />);
        expect(wrapper.find(<MainPage />)).toMatchSnapshot();
    })
    it('Renders Main Page menu on change',() => {
        const choice = "Main Page";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<MainPage />)).toMatchSnapshot();
    })
    it('Renders Main Page menu on change',() => {
        const choice = "Main Page";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<MainPage />)).toMatchSnapshot();
    })
    it('Renders NewsPage menu on change',() => {
        const choice = "News";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<NewsPage />)).toMatchSnapshot();
    })
    it('Renders AboutUsPage menu on change',() => {
        const choice = "About Us";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<AboutUsPage />)).toMatchSnapshot();
    })
    it('Renders AccountPage on change',() => {
        const choice = "Account Page";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<AccountPage accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders ViewFlights on change',() => {
        const choice = "View Flights";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<ViewFlights accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders OnlineBriefing on change',() => {
        const choice = "Online Briefing";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<OnlineBriefing accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders OnlineBriefing menu on change',() => {
        const choice = "Online Briefing";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<OnlineBriefing accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders EmployeeViewFlights menu on change',() => {
        const choice = "Employee View Flights";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<EmployeeViewFlights accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders EmployeeViewAirportsmenu on change',() => {
        const choice = "Employee View Airports";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<EmployeeViewAirports accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders EmployeeViewPlanes menu on change',() => {
        const choice = "Employee View Planes";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<EmployeeViewPlanes accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders ViewEmployees menu on change',() => {
        const choice = "View Employees";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<ViewEmployees accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders ViewFiredEmployees menu on change',() => {
        const choice = "View Fired Employees";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<ViewFiredEmployees accountData={accountData}/>)).toMatchSnapshot();
    })
    it('Renders CustomerReservations menu on change',() => {
        const choice = "Customer Reservations";
        const wrapper = shallow(<Content menuChoice={choice}/>);
        expect(wrapper.find(<CustomerReservations accountData={accountData}/>)).toMatchSnapshot();
    })
})
