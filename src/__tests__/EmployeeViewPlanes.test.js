import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import EmployeeViewPlanesList from "../Components/Employee/ManagePlanes/EmployeeViewPlanesList";
import AddPlaneButton from "../Components/Employee/ManagePlanes/AddPlaneButton";
import SearchPlaneButton from "../Components/Employee/ManagePlanes/SeachPlaneButton";
import EmployeeViewPlanes from "../Components/Employee/ManageAirports/EmployeeViewAirports";


configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<EmployeeViewPlanes />);
});


