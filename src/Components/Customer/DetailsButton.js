import React, {useState} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const MyButton = styled(Button)({
  color: 'black'
});

/**
 * Shows detailed data about reservation
 * @param {reservation} props 
 */
export default function SearchButton(props){
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
      <MyButton color="primary" onClick={handleClickOpen}>Szczegóły</MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            From: {props.reservation.flightID.sapid.airportName} | {props.reservation.flightID.sapid.cityName} <br/>
            To: {props.reservation.flightID.dapid.airportName} | {props.reservation.flightID.dapid.cityName} <br/>
            Departure: {new Date(props.reservation.flightID.startDate).toUTCString()} <br/>
            Arrival: {new Date(props.reservation.flightID.endDate).toUTCString()} <br/>
            Price : {props.reservation.price} <br/>
            Class : {props.reservation.className} <br/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}