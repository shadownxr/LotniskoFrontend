import React from 'react';
import Button from '@material-ui/core/Button';
import jsPDF from 'jspdf';
import Cookie from 'react-cookies';

/**
 * Creates pdf ticket and checks that breiefing was compleated
 * @param {ticketData,reservation,seat} props 
 */
export default function TicketPrinter(props){
    const jsPdfGenerator = () => {
        let doc = new jsPDF('p','pt');
        doc.text(20,20,"Imie: "+props.ticketData.name);
        doc.text(20,35,"Nazwisko: "+props.ticketData.surename);
        doc.text(20,50,"Data urodzenia: "+new Date(props.ticketData.birthDate).toLocaleDateString());
        doc.text(20,65,"Kraj: "+props.ticketData.country);
        doc.text(20,80,"Miejscowosc: "+props.ticketData.address);
        doc.text(20,95,"Ulica: "+props.ticketData.street);
        doc.text(20,110,"Numer domu/mieszkania: "+props.ticketData.homeNr);

        doc.text(300,20,"Z: "+props.reservation.flightID.sapid.airportName+" "+props.reservation.flightID.sapid.cityName);
        doc.text(300,35,"Do: "+props.reservation.flightID.dapid.airportName+" "+props.reservation.flightID.dapid.cityName);
        doc.text(300,50,"Data wylotu: "+new Date(props.reservation.flightID.startDate).toLocaleDateString());
        doc.text(300,65,"Data przylotu: "+new Date(props.reservation.flightID.endDate).toLocaleDateString());
        doc.text(300,80,"Nazwa samolotu: "+props.reservation.flightID.planeID.planeName);
        doc.text(300,95,"Miejsce: "+props.seat);

        doc.save('Bilet.pdf');
    }

    const fetchCheckIn = () => {
        let payload = {
            "ticketID": props.reservation.id,
            "seat": props.seat
          }
  
        const url = "https://localhost:8443/api/tickets/checkIn";
  
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + Cookie.load('userToken').token,
            },
            body: JSON.stringify(payload),
        };
  
        fetch(url, options)
          .then(response => response.json())
          .then(result => {
            console.log(result)
          });
    }

    const handleTicket = () => {
        fetchCheckIn();
        jsPdfGenerator();
        props.refresh(true);
        props.screen(1);
    }

    return(
        <div style={{backgroundColor:"white"}}>
            <h1>Dane biletu</h1>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                <div style={{flex:"1",alignContent:"center",maxWidth:"50%"}}>
                    Imie: {props.ticketData.name} <br/>
                    Nazwisko: {props.ticketData.surename} <br/>
                    Data urodzenia: {new Date(props.ticketData.birthDate).toLocaleDateString()} <br/>
                    Kraj: {props.ticketData.country} <br/>
                    Miejscowość: {props.ticketData.address} <br/>
                    Ulica: {props.ticketData.street} <br/>
                    Numer domu/mieszkania: {props.ticketData.homeNr} <br/>
                </div>
                <div style={{flex:"2",alignContent:"center",maxWidth:"50%"}}>
                    Z: {props.reservation.flightID.sapid.airportName} {props.reservation.flightID.sapid.cityName}<br/>
                    Do: {props.reservation.flightID.dapid.airportName} {props.reservation.flightID.dapid.cityName}<br/>
                    Data wylotu: {new Date(props.reservation.flightID.startDate).toLocaleDateString()}<br/>
                    Data przylotu: {new Date(props.reservation.flightID.endDate).toLocaleDateString()}<br/>
                    Nazwa samolotu: {props.reservation.flightID.planeID.planeName}<br/>
                    Miejsce: {props.seat}<br/>
                </div>
            </div>
            <Button onClick={() => handleTicket()}>Otrzymaj Bilet</Button>
        </div>
    )
}