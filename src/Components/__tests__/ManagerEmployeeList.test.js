import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import ViewEmployees from "../Manager/AdministerEmployees/ViewEmployees";
import SearchEmployeeButton from "../Manager/AdministerEmployees/SearchEmployeeButton";
import AddEmployeeButton from "../Manager/AdministerEmployees/AddEmployeeButton";
import ViewEmployeesList from "../Manager/AdministerEmployees/ViewEmployeesList";
import ViewFiredEmployeesList from "../Manager/AdministerEmployees/ViewFiredEmpolyeesList";

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<ViewEmployees />);
});

it('includes SearchEmployeeButton', () => {
    const app = shallow(<ViewEmployees />);
    expect(app.containsMatchingElement(<SearchEmployeeButton />)).toEqual(true)
});
it('includes ViewEmployeesList', () => {
    const app = shallow(<ViewEmployees />);
    expect(app.containsMatchingElement(<ViewEmployeesList />)).toEqual(true)
});

it('includes AddEmployeeButton', () => {
    const app = shallow(<ViewEmployees />);
    expect(app.containsMatchingElement(<AddEmployeeButton />)).toEqual(true)
});


it('Opens and displayes text', () => {
    const usersList = shallow(<SearchEmployeeButton search={() => {setSearch()}} />);
    expect(usersList.text()).toContain("SzukajPodaj imię i nazwisko szukanego pracowwnikaAnulujSzukaj")
});

it('Opens and displayes text', () => {
    const usersList = shallow(<AddEmployeeButton refresh={true} />);
    expect(usersList.text()).toContain("Add a new EmployeeCancelAddOperation successfulA new employee was added. He can use following credentials to log in:Username:Password:Ok")
});


it(`shows a list of employees`, () => {
    const employee = [];
    employee.name = "Adam";
    employee.surname="Adamowicz";
    employee. phoneNumber="123456789";
    employee.hiringDate="2020-06-01";
    employee.firingDate="2020-06-02";

    let list = shallow(<ViewFiredEmployeesList employeesData={employee} />);
    expect(list.find('li').length).toEqual(employee.length);
});

describe('Passing employees works', () => {
    const name = "Adam";

    const employee = [];
    employee.name = "Adam";
    employee.surname="Adamowicz";
    employee. phoneNumber="123456789";
    employee.hiringDate="2020-06-01";
    employee.firingDate="2020-06-02";

    let list = shallow(<ViewFiredEmployeesList employeesData={employee} />);
    it(`it passes name Adam`, () => {
        expect(list.containsMatchingElement(name)).not.toEqual(true)
    });
});
