import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';

import SignUp from "../Authorization/SignUp";


configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<SignUp />);
});

it('Opens and displayes text', () => {
    const usersList = shallow(<SignUp  />);
    expect(usersList.text()).toContain("")
});
