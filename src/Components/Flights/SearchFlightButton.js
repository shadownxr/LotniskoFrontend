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

/**
 * Dialog used to search through flights
 * @param {search} props 
 */
export default function SearchButton(props){
    const [open, setOpen] = useState(false);
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

    const handleSearch = () => {
      if(from&&to&&dateFrom){
          props.search({from: from, to: to, dateFrom:dateFrom});
        setOpen(false);
      } else {
        setErr("All fields must be filled!");
      }
    }

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
          <TextField
              id="date"
              label="No earlier than"
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