import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import DetailsButton from "../Customer/DetailsButton";

configure({ adapter: new Adapter() });

const reservation = {
    flightID:{
        id: 0,
        sapid:{
            id: 0,
            airportName: "testoweOD",
            cityName:"miastoOD"
        },
        dapid:{
            id: 1,
            airportName: "testoweDO",
            cityName:"miastoDO"
        },
        startDate:"2020-10-02",
        endDate: "2020-10-03"
    }
};

reservation.flightID.sapid.airportName = "TestoweOD";
reservation.flightID.sapid.cityName="TestoweOD";
reservation.flightID.dapid.airportName = "TestoweDO";
reservation.flightID.dapid.cityName="TestoweDO";
reservation.flightID.startDate ="2020-10-02";
reservation.flightID.endDate="2020-10-03";


it('renders without crashing', () => {
    shallow(<DetailsButton flight={reservation} />);
});

it('Opens and displayes text', () => {
    const usersList = shallow(<DetailsButton flight={flight} />);
    expect(usersList.text()).toContain("KupKupWybierz klasę<ScriptLoader />Anuluj")
});


