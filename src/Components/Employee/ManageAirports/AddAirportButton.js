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
import Cookie from 'react-cookies'

const MyButton = styled(Button)({
    color: 'white'
});

/**
 * Button to add airport
 * @param {*} props 
 */
export default function AddAirportButton(props){
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [city, setCity] = useState('');
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErr("");
        setOpen(false);
    };
    const handleCode = (event) => {
        setCode(event.target.value);
    };

    const handleCity = (event) => {
        setCity(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleAdd = () => {
        fetchAddAirport();
        setOpen(false);

    }
    const fetchAddAirport = () => {
        let payload = {
            "name": name,
            "code": code,
            "city": city,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + Cookie.load('userToken').token,
            },
            body: JSON.stringify(payload),
        };

        const url = "https://localhost:8443/api/airports/add";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if(result.message === "Error: Code is already taken!") {
                    setErr("Wybrany kod jest już zajęty");
                    return
                } else if(result.message === "Airport added successfully!"){
                    props.refresh(true);
                    setOpen(false);
                }
            });

    };

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><Add style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dodaj samolot</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nazwa"
                        type="text"
                        onChange={handleName}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="code"
                        label="Kod"
                        type="text"
                        onChange={handleCode}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        label="Miasto"
                        type="text"
                        onChange={handleCity}
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
