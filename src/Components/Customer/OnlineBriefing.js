import React, { useState } from 'react';
import BriefableReservations from './BriefableReservations';
import UserDataForm from './UserDataForm';
import TicketPrinter from './TicketPrinter';
import SeatChooser from './SeatChooser';

export default function OnlineBriefing(props){
    const [briefingScreen, setBriefingScreen] = useState(1);
    const [reservation, setReservation] = useState([]);
    const [ticketData, setTicketData] = useState({});

    const briefing = () => {
        switch(briefingScreen){
            case 1:
                return <BriefableReservations accountData={props.accountData} reservation={(reservation) => {setReservation(reservation)}} screen={(screen) => {setBriefingScreen(screen)}}/>;
            case 2:
                return <UserDataForm screen={(screen) => {setBriefingScreen(screen)}} ticketData={(ticketData) => {setTicketData(ticketData)}}/>;
            case 3:
                return <SeatChooser reservation={reservation} screen={(screen) => {setBriefingScreen(screen)}}/>;
            case 4:
                return <TicketPrinter reservation={reservation} ticketData={ticketData} screen={(screen) => {setBriefingScreen(screen)}}/>;
            default:
                return <BriefableReservations accountData={props.accountData} reservation={(reservation) => {setReservation(reservation)}} screen={(screen) => {setBriefingScreen(screen)}}/>;
        }
    }

    return(
        <div>{briefing()}</div>
    )
}