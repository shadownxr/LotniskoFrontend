import React, { useState } from 'react';
import BriefableReservations from './BriefableReservations';
import UserDataForm from './UserDataForm';
import TicketPrinter from './TicketPrinter';
import SeatChooser from './SeatChooser';

export default function OnlineBriefing(props){
    const [briefingScreen, setBriefingScreen] = useState(1);
    const [reservation, setReservation] = useState([]);
    const [ticketData, setTicketData] = useState({});
    const [seat, setSeat] = useState("");
    const [refresh, setRefresh] = useState(false);

    const briefing = () => {
        switch(briefingScreen){
            case 1:
                return <BriefableReservations accountData={props.accountData} refresh={refresh} reservation={(reservation) => {setReservation(reservation)}} screen={(screen) => {setBriefingScreen(screen)}}/>;
            case 2:
                return <UserDataForm screen={(screen) => {setBriefingScreen(screen)}} ticketData={(ticketData) => {setTicketData(ticketData)}}/>;
            case 3:
                return <SeatChooser reservation={reservation} seat={(seat) => {setSeat(seat)}} screen={(screen) => {setBriefingScreen(screen)}}/>;
            case 4:
                return <TicketPrinter reservation={reservation} seat={seat} ticketData={ticketData} refresh={(refresh) => {setRefresh(refresh)}} screen={(screen) => {setBriefingScreen(screen)}}/>;
            default:
                return <BriefableReservations accountData={props.accountData} reservation={(reservation) => {setReservation(reservation)}} screen={(screen) => {setBriefingScreen(screen)}} refresh={(refresh) => {setRefresh(refresh)}}/>;
        }
    }

    return(
        <div>{briefing()}</div>
    )
}