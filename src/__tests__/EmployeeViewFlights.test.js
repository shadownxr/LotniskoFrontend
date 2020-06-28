import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import EmployeeViewPlanes from "../Components/Employee/ManageAirports/EmployeeViewAirports";
import ViewFlights from "../Components/Employee/ManageFlights/EmployeeViewFlights";
import AddFlightButton from "../Components/Employee/ManageFlights/AddFlightButton";
import EmployeeViewFlightsList from "../Components/Employee/ManageFlights/EmployeeViewFlightsList";
import SearchFlightButton from "../Components/Flights/SearchFlightButton";


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
    expect(usersList.text()).toContain("Dodaj lotAnulujDodaj")
});

it('Opens and displayes text', () => {
    const usersList = shallow(<SearchFlightButton search={() => {setSearch()}} />);
    expect(usersList.text()).toContain("SzukajPodaj miejsce początkowe, dolecowe, datę odlotu i klasęAnulujSzukaj")
});

