import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';;

import CustomerReservations from "../Customer/CustomerReservations";
import CustomerReservationsList from "../Customer/CustomerReservationsList";


configure({ adapter: new Adapter() });


const Test = {flightID: {
        sapid: {
            airportName: "testOD",
            cityName: "OD",
        },
        dapid: {
            airportName: "testDO",
            cityName: "DO",
        },
        startDate: "2020-10-02",
    },
    className: "Economic"};

const Test2 = {flightID: {
        sapid: {
            airportName: "testOD2",
            cityName: "OD2",
        },
        dapid: {
            airportName: "testDO2",
            cityName: "DO2",
        },
        startDate: "2020-10-03",
    },
    className: "Economic"};



const reservation = [Test, Test2];
const reservation2 = [Test];
const accountData = {username: "Admin", email: "Admin@Example.com"};


it('renders without crashing', () => {
    shallow(<CustomerReservations accountData={accountData}/>);
});


it('includes EmployeeViewAirportsList', () => {
    const app = shallow(<CustomerReservations accountData={accountData} />);
    expect(app.containsMatchingElement(<CustomerReservationsList customerReservationsData={reservation} />)).not.toEqual(true)
});
