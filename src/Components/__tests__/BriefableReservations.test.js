import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';;

import BriefableReservations from "../Customer/BriefableReservations";


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
const accountData = {username: "Admin", email: "Admin@Example.com"};


it('renders without crashing', () => {
    shallow(<BriefableReservations accountData={accountData} reservation={reservation}/>);
});

describe('Passing props works', () => {
    const list = shallow(<BriefableReservations accountData={accountData} reservation={reservation}/>);
    it(`it has employees`, () => {
        expect(list.containsMatchingElement(Test)).toEqual(true)
    });
});

describe('Passing props works', () => {
    const list = shallow(<BriefableReservations accountData={accountData} reservation={reservation}/>);
    it(`it has employees`, () => {
        expect(list.containsMatchingElement(Test2)).toEqual(true)
    });
});

