import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import EmployeeViewPlanes from "../Employee/ManageAirports/EmployeeViewAirports";
import AddAirportButton from "../Employee/ManageAirports/AddAirportButton";
import EmployeeViewAirportsList from "../Employee/ManageAirports/EmployeeViewAirportsList";


configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<EmployeeViewPlanes />);
});

it('includes AddAirportButton', () => {
    const app = shallow(<EmployeeViewPlanes />);
    expect(app.containsMatchingElement(<AddAirportButton />)).toEqual(true)
});
it('includes EmployeeViewAirportsList', () => {
    const app = shallow(<EmployeeViewPlanes />);
    expect(app.containsMatchingElement(<EmployeeViewAirportsList />)).toEqual(true)
});


it('Opens and displayes text', () => {
    const usersList = shallow(<AddAirportButton search={() => {setSearch()}} />);
    expect(usersList.text()).toContain("Dodaj samolotAnulujDodaj")
});



it(`shows a list of planes`, () => {
    const airport = [];
    airport.id = "13";
    airport.airportName="TestoweLotnisko";
    airport. cityName="Testowe";

    let list = shallow(<EmployeeViewAirportsList airportsData={airport} />);
    expect(list.find('li').length).toEqual(airport.length);
});

describe('Passing employees works', () => {
    const name = "TestoweLotnisko";

    const airport = [];
    airport.id = "13";
    airport.airportName="TestoweLotnisko";
    airport. cityName="Testowe";

    let list = shallow(<EmployeeViewAirportsList airportsData={airport} />);
    it(`it passes airport`, () => {
        expect(list.containsMatchingElement(name)).not.toEqual(true)
    });
});
