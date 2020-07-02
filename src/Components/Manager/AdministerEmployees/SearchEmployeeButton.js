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
 * Button for searching employees
 * @param {search} props 
 */
export default function SearchEmployeeButton(props){
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
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

    const handleSearch = () => {
        if(name&&surname){
            props.search({name: name, surname: surname});
            setOpen(false);
        } else {
            setErr("Wypełnij pola!");
        }
    }

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><SearchIcon style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Szukaj</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Podaj imię i nazwisko szukanego pracowwnika<br/>
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