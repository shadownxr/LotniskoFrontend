import React, {useState} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Cookie from 'react-cookies';
import Autocomplete from '@material-ui/lab/Autocomplete'

const MyButton = styled(Button)({
  color: 'black'
});

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

    const handleBuy = () => {
        fetchBuy();
    }

    const fetchBuy = () => {
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
      }

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
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleBuy} color="primary">
            Kup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}