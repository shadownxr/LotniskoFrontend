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
import Autocomplete from '@material-ui/lab/Autocomplete';

const MyButton = styled(Button)({
  color: 'white'
});

/**
 * Dialog to search reservations
 * @param {search} props 
 */
export default function SearchButton(props){
    const [open, setOpen] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [err, setErr] = useState('');
    const [paid, setPaid] = useState('');

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

    const handleSearch = () => {
      if(from&&to&&dateFrom&&paid){
        props.search({from: from, to: to, dateFrom: dateFrom, paid: paid});
        setOpen(false);
      } else {
        setErr("Wypełnij wszystkie pola!");
      }
    }

    const paidArr = [{value: true, label: "Tak"},{value: false, label: "Nie"}];

    return (
      <div>
      <MyButton color="primary" onClick={handleClickOpen}><SearchIcon style={{height:'35px',width:'35px'}}/></MyButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Search</DialogTitle>
        <DialogContent>
          <DialogContentText>
           <br/>
            {err}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="from"
            label="From"
            type="text"
            onChange={handleFrom}
            fullWidth
          />
          <TextField
            margin="dense"
            id="to"
            label="To"
            type="text"
            onChange={handleTo}
            fullWidth
          />
          <Autocomplete
            onChange={(event, newValue) => {
              setPaid(newValue.value);
            }}
            id="class"
            options={paidArr}
            getOptionSelected={(option) => option.label}
            getOptionLabel={(option) => option.label}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={"Przeprowadzona odprawa"} variant="outlined" />}
          />
          <TextField
              id="date"
              label="Departure"
              type="date"
              value={dateFrom}
              onChange={handleDateFrom}
              InputLabelProps={{
                shrink: true,
              }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSearch} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}