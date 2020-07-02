import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';;

import BriefableReservations from "../Customer/BriefableReservations";
import DetailsButton from "../Customer/DetailsButton";
import SeatChooser from "../Customer/SeatChooser";
import TicketPrinter from "../Customer/TicketPrinter";


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
        planeID:{
          planeName: "TestowySamolocik",
        },
    },
    className: "Economic"};

it('renders without crashing', () => {
    shallow(<TicketPrinter reservation={Test} seat={1} ticketData={"2020-10-01"}/>);
});
