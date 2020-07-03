import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/**
 * Form for ticket data
 * @param {ticketData, screen} props 
 */
export default function UserDataForm(props){
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [surename, setSurename] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');
    const [homeNr, setHomeNr] = useState('');
    const [err, setErr] = useState('');

    const handleName = (event) => {
      setName(event.target.value);
    };

    const handleSurename = (event) => {
      setSurename(event.target.value);
    };

    const handleDate = (event) => {
      setDate(event.target.value);
    };

    const handleCountry = (event) => {
      setCountry(event.target.value);
    };

    const handleAddress = (event) => {
      setAddress(event.target.value);
    };

    const handleStreet = (event) => {
      setStreet(event.target.value);
    };

    const handleHomeNr = (event) => {
      setHomeNr(event.target.value);
    };

    const handleNext = () => {
      if(((name !== null) && (name !== ""))&&((surename !== null) && (surename !== ""))&&((date !== null) && (date !== ""))&&((country !== null) && (country !== ""))&&((address !== null) && (address !== ""))&&((street !== null) && (street !== ""))&&((homeNr !== null) && (homeNr !== ""))){
        props.ticketData({name: name, surename: surename, birthDate: date, country: country, address: address, street: street, homeNr: homeNr});
        props.screen(3);
      } else {
        setErr("All fields must be filled!");
      }
    }

    return (
      <div style={{backgroundColor:"white"}}>
        {err}<br/>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={handleName}
        /><br/>
        <TextField
            margin="dense"
            id="surename"
            label="Surname"
            type="text"
            onChange={handleSurename}
        /><br/>
        <TextField
            margin="dense"
            id="country"
            label="Country"
            type="text"
            onChange={handleCountry}
        /><br/>
        <TextField
            margin="dense"
            id="address"
            label="City"
            type="text"
            onChange={handleAddress}
        /><br/>
        <TextField
            margin="dense"
            id="street"
            label="Street"
            type="text"
            onChange={handleStreet}
        /><br/>
        <TextField
            margin="dense"
            id="homenr"
            label="Home Number"
            type="text"
            onChange={handleHomeNr}
        /><br/>
        <TextField
            id="date"
            label="DOB"
            type="date"
            value={date}
            onChange={handleDate}
            InputLabelProps={{
              shrink: true,
            }}
        /><br/>
        <Button onClick={() => handleNext()}>Next</Button>
    </div>
    )
}