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
        doc.text(20,20,"Name: "+props.ticketData.name);
        doc.text(20,35,"Surname: "+props.ticketData.surename);
        doc.text(20,50,"DOB: "+new Date(props.ticketData.birthDate).toLocaleDateString());
        doc.text(20,65,"Country: "+props.ticketData.country);
        doc.text(20,80,"City: "+props.ticketData.address);
        doc.text(20,95,"Street: "+props.ticketData.street);
        doc.text(20,110,"House number:" +props.ticketData.homeNr);

        doc.text(300,20,"From: "+props.reservation.flightID.sapid.airportName+" "+props.reservation.flightID.sapid.cityName);
        doc.text(300,35,"To: "+props.reservation.flightID.dapid.airportName+" "+props.reservation.flightID.dapid.cityName);
        doc.text(300,50,"Departure: "+new Date(props.reservation.flightID.startDate).toLocaleDateString());
        doc.text(300,65,"Arrival: "+new Date(props.reservation.flightID.endDate).toLocaleDateString());
        doc.text(300,80,"Plane: "+props.reservation.flightID.planeID.planeName);
        doc.text(300,95,"Seat: "+props.seat);

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
            <h1>Check-in</h1>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                <div style={{flex:"1",alignContent:"center",maxWidth:"50%"}}>
                    Name: {props.ticketData.name} <br/>
                    Surname: {props.ticketData.surename} <br/>
                    DOB: {new Date(props.ticketData.birthDate).toLocaleDateString()} <br/>
                    Country: {props.ticketData.country} <br/>
                    City: {props.ticketData.address} <br/>
                    Street: {props.ticketData.street} <br/>
                    House number: {props.ticketData.homeNr} <br/>
                </div>
                <div style={{flex:"2",alignContent:"center",maxWidth:"50%"}}>
                    From: {props.reservation.flightID.sapid.airportName} {props.reservation.flightID.sapid.cityName}<br/>
                    To: {props.reservation.flightID.dapid.airportName} {props.reservation.flightID.dapid.cityName}<br/>
                    Departure: {new Date(props.reservation.flightID.startDate).toLocaleDateString()}<br/>
                    Arrival: {new Date(props.reservation.flightID.endDate).toLocaleDateString()}<br/>
                    Plane: {props.reservation.flightID.planeID.planeName}<br/>
                    Seat: {props.seat}<br/>
                </div>
            </div>
            <Button onClick={() => handleTicket()}>Get the ticket</Button>
        </div>
    )
}