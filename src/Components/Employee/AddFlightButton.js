import React,{useState} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const MyButton = styled(Button)({
  color: 'white'
});


export default function AddButton(props){
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [cost, setCost] = useState('');
    const [ticketClass, setTicketClass] = useState('');
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setErr("");
      setOpen(false);
    };

    const handleFrom = (event) => {
      setFrom(event.target.value);
    };

    const handleTo = (event) => {
      setTo(event.target.value);
    };

    const handleDate = (event) => {
      setDate(event.target.value);
    };

    
    const handleCost = (event) => {
      setCost(event.target.value);
    };


    const handleTicketClass = (event) => {
      setTicketClass(event.target.value);
    };

    const handleAdd = () => {
        console.log(from+" "+to+" "+date+" "+ticketClass+" "+cost);
        setOpen(false);
    }

    return (
        <div>
        <MyButton color="primary" onClick={handleClickOpen}><Add style={{height:'35px',width:'35px'}}/></MyButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Dodaj lot</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Podaj miejsce początkowe, dolecowe, datę odlotu i klasę<br/>
              {err}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="from"
              label="Miejsce początkowe"
              type="text"
              onChange={handleFrom}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="to"
              label="Miejsce Docelowe"
              type="text"
              onChange={handleTo}
              fullWidth
            />
            <TextField
                id="date"
                label="Data odlotu"
                type="date"
                value={to}
                onChange={handleDate}
                InputLabelProps={{
                  shrink: true,
                }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="cost"
              label="Cena"
              type="text"
              onChange={handleCost}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="class"
              label="Klasa"
              type="text"
              onChange={handleTicketClass}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={handleAdd} color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}