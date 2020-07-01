import React from 'react';
import { shallow } from 'enzyme';

import UserMenu from '../UserMenu';
import NoLoginMenu from '../NoLoginMenu';
import CustomerUserMenu from '../Customer/CustomerUserMenu';
import EmployeeUserMenu from '../Employee/EmployeeUserMenu';
import ManagerUserMenu from '../Manager/ManagerUserMenu';

describe('UserMenu test',() =>{
    it('Renders when loaded',() =>{
        const wrapper = shallow(<UserMenu />);
        expect(wrapper.find(<NoLoginMenu />)).toMatchSnapshot();
    })
    it('Renders ROLE_USER menu on change',() => {
        const role = "ROLE_USER";
        const wrapper = shallow(<UserMenu userType={role}/>);
        expect(wrapper.find(<CustomerUserMenu />)).toMatchSnapshot();
    })
    it('Renders ROLE_EMPLOYEE menu on change',() => {
        const role = "ROLE_EMPLOYEE";
        const wrapper = shallow(<UserMenu userType={role}/>);
        expect(wrapper.find(<EmployeeUserMenu />)).toMatchSnapshot();
    })
    it('Renders ROLE_MANAGER menu on change',() => {
        const role = "ROLE_MANAGER";
        const wrapper = shallow(<UserMenu userType={role}/>);
        expect(wrapper.find(<ManagerUserMenu />)).toMatchSnapshot();
    })
})