import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import SignIn from "../Authorization/SignIn";
import Facebook from "../Authorization/Facebook";


configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<SignIn />);
});

it('includes AddAirportButton', () => {
    const app = shallow(<SignIn />);
    expect(app.containsMatchingElement(<Facebook />)).toEqual(true)
});


it('Opens and displayes text', () => {
    const usersList = shallow(<SignIn  />);
    expect(usersList.text()).toContain("")
});
