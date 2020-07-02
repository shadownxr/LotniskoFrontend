import React from 'react';
import { shallow } from 'enzyme';
import Facebook from "../Authorization/Facebook";

it('renders without crashing', () => {
    shallow(<Facebook />);
});

it('Opens and displayes text', () => {
    const fb = shallow(<Facebook />);
    expect(fb.text()).toContain("")
});
