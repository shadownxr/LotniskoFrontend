import React from 'react';
import { shallow } from 'enzyme';

import AccountPage from '../AccountPage';

describe('AccountPage test',() =>{
    it('Renders when loaded',() =>{
        const accountData = {username: "Admin", email: "Admin@Example.com"};
        const wrapper = shallow(<AccountPage accountData={accountData}/>);

        expect(wrapper.contains(<div className="Account">
                                    Username: Admin <br/>
                                    Email: Admin@Example.com <br/>
                                </div>)).toBeTruthy();
    })
})