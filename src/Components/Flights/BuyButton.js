import React, { useState,useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import makeStyles from "@material-ui/core/styles/makeStyles";
import PaypalButton from './PaypalButton';

const MyButton = styled(Button)({
  color: 'black'
});
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function SearchButton(props){
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [ticketClass, setTicketClass] = useState('');
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setErr("");
      setOpen(false);
    };

    const handleClosePaypal = (close) => {
      setErr("");
      setOpen(close);
    };

    /*const handleBuy = () => {
        fetchBuy();
    }*/

    /*const fetchBuy = () => {
        let payload = {
            "flightId": props.flightId,
            "userId": props.accountData.id,
            "ticketClass": ticketClass,
            "paid": false
        }

        console.log(payload);

        const url = "http://localhost:8080/api/tickets/add";
  
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
            console.log(result);
            setOpen(false);
          });
      }*/

    const ticketClasses = ['Economic','Buisness'];

    return (
      <div>
      <MyButton color="primary" onClick={handleClickOpen}>Kup</MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Kup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wybierz klasę<br/>
            {err}
          </DialogContentText>
          <Autocomplete
            onChange={(event, newValue) => {
              setTicketClass(newValue);
            }}
            id="class"
            options={ticketClasses}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={"Klasa"} variant="outlined" />}
          />
        </DialogContent>
        <PaypalButton flightId={props.flightId} accountData={props.accountData} ticketClass={ticketClass} flightCost={(ticketClass === "Economic")?props.flight.priceEconomic:props.flight.priceBuisness} close={(close) => handleClosePaypal(close)}/>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          {/*<Button onClick={handleBuy} color="primary">
            Kup
          </Button>*/}
        </DialogActions>
      </Dialog>
    </div>
    )
}
