import SearchIcon from '@material-ui/icons/Search';
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

    const handleTicketClass = (event) => {
      setTicketClass(event.target.value);
    };

    const handleBuy = () => {
        fetchBuy();
    }

    const fetchBuy = () => {
        let payload = {
            "flightId": props.flightId,
            "userId": props.accountData.id,
            "ticketClass": ticketClass,
            "paid": true
        }

        console.log(payload);
        console.log(Cookie.load('userToken').token);

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

    return (
      <div>
      <MyButton color="primary" onClick={handleClickOpen}>Kup</MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Szukaj</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wybierz klasę<br/>
            {err}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="class"
            label="Klasa"
            type="tex"
            onChange={handleTicketClass}
            fullWidth
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