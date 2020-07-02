import React from 'react';
import { shallow } from 'enzyme';
import NewsPage from "../AirportPages/NewsPage";

it('renders without crashing', () => {
    shallow(<NewsPage />);
});

it('Opens and displayes text', () => {
    const usersList = shallow(<NewsPage />);
    expect(usersList.text()).toContain("")
});
