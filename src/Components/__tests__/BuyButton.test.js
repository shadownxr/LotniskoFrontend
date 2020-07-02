import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import SearchFlightButton from "../Flights/SearchFlightButton";
import ViewFlightsList from "../Flights/ViewFlightsList";
import SearchButton from "../Flights/BuyButton";
import PaypalButton from "../Flights/PaypalButton";

configure({ adapter: new Adapter() });

const accountData = {username: "Admin", email: "Admin@Example.com"};

const flight = [];
flight.id = 1;
flight.cityName = "TestoweOD";
flight. cityName="TestoweDO";
flight.startDate="2020-10-02";
flight.endDate="2020-10-03";
flight.planeID=3
flight.priceEconomic=100;
flight.priceBuisness=200;

it('renders without crashing', () => {
    shallow(<SearchButton flightId={flight.id} accountData={accountData} flight={flight} />);
});
const ticketClass="Economic";

it('includes EmployeeViewAirportsList', () => {
    const app = shallow(<SearchButton flightId={flight.id} accountData={accountData} flight={flight}/>);
    expect(app.containsMatchingElement(<PaypalButton flightId={flight.id} accountData={accountData} ticketClass={ticketClass} flightCost={(ticketClass === "Economic")?flight.priceEconomic:flight.priceBuisness} />)).not.toEqual(true)
});



it('Opens and displayes text', () => {
    const usersList = shallow(<SearchButton flightId={flight.id} accountData={accountData} flight={flight} />);
    expect(usersList.text()).toContain("KupKupWybierz klasę<ScriptLoader />Anuluj")
});


