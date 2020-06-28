import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import SearchEmployeeButton from "../Components/Manager/AdministerEmployees/SearchEmployeeButton";
import ViewFiredEmployees from "../Components/Manager/AdministerEmployees/ViewFiredEmployees";
import ViewFiredEmployeesList from "../Components/Manager/AdministerEmployees/ViewFiredEmpolyeesList";
import ViewEmployeesList from "../Components/Manager/AdministerEmployees/ViewEmployeesList";

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
    expect(usersList.text()).toContain("SzukajPodaj imie, nazwisko, stanowisko i datę zatrudnienia AnulujSzukaj")
});





it(`shows a list of fired employees`, () => {
    const employee = [];
    employee.name = "Adam";
    employee.surname="Adamowicz";
    employee. phoneNumber="123456789";
    employee.hiringDate="2020-06-01";
    employee.firingDate=null;

    let list = shallow(<ViewFiredEmployeesList search={""} employeesData={employee} />);
    expect(list.find('li').length).toEqual(employee.length);
});

describe('Passing employees works', () => {
    const name = "Adam";

    const employee = [];
    employee.name = "Adam";
    employee.surname="Adamowicz";
    employee. phoneNumber="123456789";
    employee.hiringDate="2020-06-01";
    employee.firingDate=null;

    let list = shallow(<ViewEmployeesList search={""} employeesData={employee} />);
    it(`it passes name Adam`, () => {
        expect(list.containsMatchingElement(name)).not.toEqual(true)
    });
});
