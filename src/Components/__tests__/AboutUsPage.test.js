import React from 'react';
import { shallow } from 'enzyme';
import AboutUsPage from "../AirportPages/AboutUsPage";

it('renders without crashing', () => {
    shallow(<AboutUsPage />);
});

it('Opens and displayes text', () => {
    const usersList = shallow(<AboutUsPage />);
    expect(usersList.text()).toContain("")
});
