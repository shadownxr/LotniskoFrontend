import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';;

import BriefableReservations from "../Customer/BriefableReservations";
import DetailsButton from "../Customer/DetailsButton";
import SeatChooser from "../Customer/SeatChooser";


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

it('renders without crashing', () => {
    shallow(<SeatChooser reservation={Test} seat={1}/>);
});
