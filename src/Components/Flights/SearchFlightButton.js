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

const MyButton = styled(Button)({
  color: 'white'
});

export default function SearchButton(props){
    const [open, setOpen] = useState(false);
    const [dateTo, setDateTo] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
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

    const handleDateFrom = (event) => {
      setDateFrom(event.target.value);
    }

    const handleDateTo = (event) => {
      setDateTo(event.target.value);
    }

    const handleSearch = () => {
      if(from&&to&&dateFrom&&dateTo){
        props.search({from: from, to: to, dateFrom: dateFrom, dateTo: dateTo});
        setOpen(false);
      } else {
        setErr("Wypełnij wszystkie pola!");
      }
    }

    return (
      <div>
      <MyButton color="primary" onClick={handleClickOpen}><SearchIcon style={{height:'35px',width:'35px'}}/></MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Szukaj</DialogTitle>
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
            margin="dense"
            id="to"
            label="Miejsce Docelowe"
            type="text"
            onChange={handleTo}
            fullWidth
          />
          <TextField
              id="date"
              label="Data odlotu od"
              type="date"
              value={dateFrom}
              onChange={handleDateFrom}
              InputLabelProps={{
                shrink: true,
              }}
          />
          <TextField
              id="date"
              label="Data odlotu do"
              type="date"
              value={dateTo}
              onChange={handleDateTo}
              InputLabelProps={{
                shrink: true,
              }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleSearch} color="primary">
            Szukaj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}