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
        <DialogTitle id="form-dialog-title">Szczegóły</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Z : {props.reservation.flightID.sapid.airportName}  || Lotnisko : {props.reservation.flightID.sapid.cityName} <br/>
            Do : {props.reservation.flightID.dapid.airportName} || Lotnisko : {props.reservation.flightID.dapid.cityName} <br/>
            Data wylotu : {new Date(props.reservation.flightID.startDate).toLocaleDateString()} <br/>
            Data przylotu : {new Date(props.reservation.flightID.endDate).toLocaleDateString()} <br/>
            Cena za bilet : {props.reservation.price} <br/>
            Klasa : {props.reservation.className} <br/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Wróć
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}