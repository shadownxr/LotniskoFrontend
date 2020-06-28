import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import SearchEmployeeButton from "../Components/Manager/AdministerEmployees/SearchEmployeeButton";
import ViewFiredEmployees from "../Components/Manager/AdministerEmployees/ViewFiredEmployees";
import ViewFiredEmployeesList from "../Components/Manager/AdministerEmployees/ViewFiredEmpolyeesList";

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<ViewFiredEmployees />);
});

it('includes SearchEmployeeButton', () => {
    const app = shallow(<ViewFiredEmployees />);
    expect(app.containsMatchingElement(<SearchEmployeeButton />)).toEqual(true)
});
it('includes ViewEmployeesList', () => {
    const app = shallow(<ViewFiredEmployees />);
    expect(app.containsMatchingElement(<ViewFiredEmployeesList />)).toEqual(true)
});


it('Opens and displayes text', () => {
    const usersList = shallow(<SearchEmployeeButton search={() => {setSearch()}} />);
    expect(usersList.text()).toContain("SzukajPodaj imię i nazwisko szukanego pracowwnikaAnulujSzukaj")
});




