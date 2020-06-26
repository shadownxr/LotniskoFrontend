import React, {useState} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookie from 'react-cookies';

const MyButton = styled(Button)({
  color: 'black'
});

export default function CancelButton(props){
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setErr("");
      setOpen(false);
    }

    const handleCancel = () => {
        fetchCancel();
    }

    const fetchCancel = () => {
        let payload = {
            "id": props.reservation.id
        }

        console.log(payload);

        const url = "http://localhost:8080/api/tickets/delete";
  
        const options = {
            method: 'DELETE',
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
            props.refresh(true);
            setOpen(false);
          });
      }

    return (
      <div>
      <MyButton color="primary" onClick={handleClickOpen}>Usuń</MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Usuń rezerwację</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Czy napewno chcesz usunąć rezerwacje?<br/>
            {err}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleCancel} color="primary">
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}