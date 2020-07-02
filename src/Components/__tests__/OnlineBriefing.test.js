import React from 'react';
import { shallow } from 'enzyme';

import ViewFlights from "../Flights/ViewFlights";
import OnlineBriefing from "../Customer/OnlineBriefing";
import CustomerReservations from "../Customer/CustomerReservations";
import CustomerUserMenu from "../Customer/CustomerUserMenu";
import BriefableReservations from "../Customer/BriefableReservations";
import SeatChooser from "../Customer/SeatChooser";
import TicketPrinter from "../Customer/TicketPrinter";

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
const accountData = {username: "Admin", email: "Admin@Example.com"};

it('renders without crashing', () => {
    shallow(<OnlineBriefing accountData={accountData}/>);
});

describe('CustomerUserMenu test',() =>{
    it('Renders when loaded',() =>{
        const wrapper = shallow(<OnlineBriefing accountData={accountData} briefingScreen={1}/>);
        expect(wrapper.find(<BriefableReservations accountData={accountData} reservation={reservation} />)).toMatchSnapshot();
    })

    it('Renders when loaded',() =>{
        const wrapper = shallow(<OnlineBriefing accountData={accountData} briefingScreen={3}/>);
        expect(wrapper.find(<SeatChooser reservation={Test} seat={1} />)).toMatchSnapshot();
    })

    it('Renders when loaded',() =>{
        const wrapper = shallow(<OnlineBriefing accountData={accountData} briefingScreen={4} />);
        expect(wrapper.find(<TicketPrinter reservation={Test} seat={1} ticketData={"2020-10-01"} />)).toMatchSnapshot();
    })

    it('Renders when loaded',() =>{
        const wrapper = shallow(<OnlineBriefing accountData={accountData} />);
        expect(wrapper.find(<BriefableReservations accountData={accountData} reservation={reservation} />)).toMatchSnapshot();
    })

})
