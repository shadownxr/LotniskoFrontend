import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import PaypalButton from './PaypalButton';

const MyButton = styled(Button)({
  color: 'black'
});

/**
 * Dialog used to buy ticket
 * @param {accountData, flight} props 
 */
export default function SearchButton(props){
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

    const ticketClasses = ['Economic','Business'];

    return (
      <div>
      <MyButton color="primary" onClick={handleClickOpen}>Kup</MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Kup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ticket class<br/>
            {err}
          </DialogContentText>
          <Autocomplete
            onChange={(event, newValue) => {
              setTicketClass(newValue);
            }}
            id="class"
            options={ticketClasses}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={"Class"} variant="outlined" />}
          />
        </DialogContent>
        <PaypalButton flightId={props.flightId} accountData={props.accountData} ticketClass={ticketClass} flightCost={(ticketClass === "Economic")?props.flight.priceEconomic:props.flight.priceBuisness} close={(close) => handleClosePaypal(close)}/>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}
