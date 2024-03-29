import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import ViewFlights from "../Employee/ManageFlights/EmployeeViewFlights";
import AddFlightButton from "../Employee/ManageFlights/AddFlightButton";
import EmployeeViewFlightsList from "../Employee/ManageFlights/EmployeeViewFlightsList";
import SearchFlightButton from "../Flights/SearchFlightButton";


configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<ViewFlights />);
});

it('includes AddAirportButton', () => {
    const app = shallow(<ViewFlights />);
    expect(app.containsMatchingElement(<AddFlightButton />)).toEqual(true)
});
it('includes EmployeeViewAirportsList', () => {
    const app = shallow(<ViewFlights />);
    expect(app.containsMatchingElement(<EmployeeViewFlightsList />)).toEqual(true)
});
it('includes EmployeeViewAirportsList', () => {
    const app = shallow(<ViewFlights />);
    expect(app.containsMatchingElement(<SearchFlightButton />)).toEqual(true)
});

it('Opens and displayes text', () => {
    const usersList = shallow(<AddFlightButton search={() => {setSearch()}} />);
    expect(usersList.text()).toContain("Add flightCancelAdd")
});

it('Opens and displayes text', () => {
    const usersList = shallow(<SearchFlightButton search={() => {setSearch()}} />);
    expect(usersList.text()).toContain("SearchCancelSearch")
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
    let list = shallow(<EmployeeViewFlightsList flightsData={flight} />);
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

    let list = shallow(<EmployeeViewFlightsList flightsData={flight} />);
    it(`it passes airport`, () => {
        expect(list.containsMatchingElement(id)).not.toEqual(true)
    });
});
