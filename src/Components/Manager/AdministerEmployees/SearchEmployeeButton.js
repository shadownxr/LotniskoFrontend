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
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [position, setPosition] = useState('');
    const [date, setDate] = useState('');
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErr("");
        setOpen(false);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleSurname = (event) => {
        setSurname(event.target.value);
    };

    const handlePosition = (event) => {
        setPosition(event.target.value);
    };

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleSearch = () => {
        console.log(name+" "+surname+" "+position+" "+date);
        setOpen(false);
    }

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><SearchIcon style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Szukaj</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Podaj imie, nazwisko, stanowisko i datę zatrudnienia <br/>
                        {err}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Imie"
                        type="text"
                        onChange={handleName}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="surname"
                        label="Nazwisko"
                        type="text"
                        onChange={handleSurname}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="position"
                        label="Stanowisko"
                        type="text"
                        onChange={handlePosition}
                        fullWidth
                    />

                    <TextField
                        id="date"
                        label="Data zatrudnienia"
                        type="date"
                        value={surname}
                        onChange={handleDate}
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
