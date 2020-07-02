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
 * Renders more data about choosen flight
 * @param {flight} props 
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
        <DialogTitle id="form-dialog-title"> <h1 style={{textAlign: 'center'}}>{props.flight.sapid.cityName} - {props.flight.dapid.cityName}</h1></DialogTitle>
        <DialogContent>
          <DialogContentText>
              <table style={{width: '100%'}}>
                  <tr>
                      <td>From:</td><td>{props.flight.sapid.airportName}</td>
                  </tr>
                  <tr>
                      <td>To:</td><td>{props.flight.dapid.airportName}</td>
                  </tr>
                  <tr>
                      <td>Departure:</td><td> {new Date(props.flight.startDate).toUTCString()}</td>
                  </tr>
                  <tr>
                      <td>Arrival:</td><td> {new Date(props.flight.endDate).toUTCString()}</td>
                  </tr>
              </table>
              <h2 style={{textAlign: 'center'}} >Ticket Prices</h2>
              <table style={{width: '100%'}}>
                  <tr>
                      <td>Economic</td><td> {props.flight.priceBuisness}USD</td>
                  </tr>
                  <tr>
                    <td>Business</td><td> {props.flight.priceEconomic}USD</td>
                  </tr>
              </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}