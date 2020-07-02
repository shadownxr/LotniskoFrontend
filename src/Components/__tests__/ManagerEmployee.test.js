import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import ViewEmployeesList from "../Manager/AdministerEmployees/ViewEmployeesList";
import DeleteButton from "../Manager/AdministerEmployees/DeleteEmployee";

configure({ adapter: new Adapter() });


const Test = {firingDate:null, hiringDate:"2020-06-21T00:00:00.000+00:00", id:0,
    personID:{name:"Test", surname:"Testowy", phoneNumber:"476348980"}, salary:3000};

const Test2 = {firingDate:null, hiringDate:"2020-06-22T00:00:00.000+00:00", id:0,
    personID:{name:"Test2", surname:"Testowy2", phoneNumber:"476348982"}, salary:3020};

const employees = [Test, Test2]

it('renders without crashing', () => {
    shallow(<ViewEmployeesList employeesData={employees}/>);
});

it('includes DeleteButton', () => {
    const app = shallow(<ViewEmployeesList employeesData={employees} />);
    expect(app.containsMatchingElement(<DeleteButton />)).toEqual(true)
});


describe('Passing employees works', () => {
    const list = shallow(<ViewEmployeesList employeesData={employees} />);
    it(`it has employees`, () => {
        expect(list.containsMatchingElement(Test)).toEqual(true)
    });
});

describe('Passing employees works', () => {
    const list = shallow(<ViewEmployeesList employeesData={employees} />);
    it(`it has employees`, () => {
        expect(list.containsMatchingElement(Test2)).toEqual(true)
    });
});
