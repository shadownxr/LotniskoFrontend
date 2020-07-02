import React, { useState, useEffect } from 'react';
import Cookie from 'react-cookies';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/**
 * Form to choose seat in a plane
 * @param {reservation,seat,screen} props 
 */
export default function SeatChooser(props){
    const [value,setValue] = useState("");
    const [seats,setSeats] = useState([]);

    useEffect(() => {
        fetchFreeSeats();
    },[])

    const handleNext = () => {
      props.seat(value);
      props.screen(4);
    }

    const fetchFreeSeats = () => {
        let payload = {
            "flightId": props.reservation.flightID.id,
            "className": props.reservation.className
          }
  
        const url = "https://localhost:8443/api/flights/getFreeSeats";
  
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
            setSeats(result.map((number) => number.toString()));
          });
      }

    return(
        <div>
            <div style={{display:"flex",flexDirection:"column",backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                <div style={{flex:"1"}}>Wybierz miejsce</div>
                  <div style={{flex:"2"}}>
                    <Autocomplete
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      id="Seats"
                      options={seats}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label={props.reservation.className} variant="outlined" />}
                    />
                  </div>
                  <div style={{flex:"3"}}><Button onClick={() => handleNext()}>Dalej</Button></div>
            </div>
        </div>
    )
}