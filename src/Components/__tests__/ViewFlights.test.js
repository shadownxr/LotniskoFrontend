import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import ViewFlights from "../Flights/ViewFlights";
import SearchFlightButton from "../Flights/SearchFlightButton";
import ViewFlightsList from "../Flights/ViewFlightsList";


configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<ViewFlights />);
});


it('includes EmployeeViewAirportsList', () => {
    const app = shallow(<ViewFlights />);
    expect(app.containsMatchingElement(<ViewFlightsList />)).toEqual(true)
});
it('includes EmployeeViewAirportsList', () => {
    const app = shallow(<ViewFlights />);
    expect(app.containsMatchingElement(<SearchFlightButton />)).toEqual(true)
});


it('Opens and displayes text', () => {
    const usersList = shallow(<SearchFlightButton search={() => {setSearch()}} />);
    expect(usersList.text()).toContain("SzukajPodaj miejsce początkowe, dolecowe, datę odlotu i klasęAnulujSzukaj")
});


it(`shows a list of planes`, () => {
    const flight = [];
    flight.id = 1;
    flight.cityName = "TestoweOD";
    flight. cityName="TestoweDO";
    flight.startDate="2020-10-02";
    flight.endDate="2020-10-03";
    flight.planeID=3
    flight.priceEconomic=100;
    let list = shallow(<ViewFlightsList flightsData={flight} />);
    expect(list.find('li').length).toEqual(flight.length);
});

describe('Passing employees works', () => {
    const id = 1;

    const flight = [];
    flight.id = 1;
    flight.cityName = "TestoweOD";
    flight. cityName="TestoweDO";
    flight.startDate="2020-10-02";
    flight.endDate="2020-10-03";
    flight.planeID=3
    flight.priceEconomic=100;

    let list = shallow(<ViewFlightsList flightsData={flight} />);
    it(`it passes airport`, () => {
        expect(list.containsMatchingElement(id)).not.toEqual(true)
    });
});
