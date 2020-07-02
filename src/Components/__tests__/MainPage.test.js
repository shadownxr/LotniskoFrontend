import React from 'react';
import { shallow } from 'enzyme';
import MainPage from "../../MainPage";

it('renders without crashing', () => {
    shallow(<MainPage />);
});

it('Opens and displayes text', () => {
    const usersList = shallow(<MainPage />);
    expect(usersList.text()).toContain("")
});
