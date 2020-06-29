import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';;
import ViewEmployeesList from "../Components/Manager/AdministerEmployees/ViewEmployeesList";
import DeleteButton from "../Components/Manager/AdministerEmployees/DeleteEmployee";
import ViewFiredEmployeesList from "../Components/Manager/AdministerEmployees/ViewFiredEmpolyeesList";
import EmployeeViewAirportsList from "../Components/Employee/ManageAirports/EmployeeViewAirportsList";

configure({ adapter: new Adapter() });


const Test = {id:0, airportName:"Test", cityName:"Testowo"};

const Test2 = {id:0, airportName:"Test2", cityName:"Testowo2"};


const airports = [Test, Test2]

it('renders without crashing', () => {
    shallow(<EmployeeViewAirportsList airportsData={airports}/>);
});


describe('Passing employees works', () => {
    const list = shallow(<EmployeeViewAirportsList airportsData={airports}/>);
    it(`it has employees`, () => {
        expect(list.containsMatchingElement(Test)).toEqual(true)
    });
});

describe('Passing employees works', () => {
    const list = shallow(<EmployeeViewAirportsList airportsData={airports}/>);
    it(`it has employees`, () => {
        expect(list.containsMatchingElement(Test2)).toEqual(true)
    });
});

it('renders without crashing', () => {
    shallow(<EmployeeViewAirportsList airportsData={airports}/>);
});


describe('Passing employees works', () => {
    const list = shallow(<EmployeeViewAirportsList airportsData={airports}/>);
    it(`it has employees`, () => {
        expect(list.containsMatchingElement(Test)).toEqual(true)
    });
});

describe('Passing employees works', () => {
    const list = shallow(<EmployeeViewAirportsList airportsData={airports}/>);
    it(`it has employees`, () => {
        expect(list.containsMatchingElement(Test2)).toEqual(true)
    });
});
