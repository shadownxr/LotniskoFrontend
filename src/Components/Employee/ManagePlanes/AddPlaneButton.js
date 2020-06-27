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


export default function AddPlaneButton(props){
    const [open, setOpen] = useState(false);
    const [airportId, setAirportId] = useState('');
    const [businessSeats, setBusinessSeats] = useState('');
    const [ecoSeats, setEcoSeats] = useState('');
    const [name, setName] = useState('');
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErr("");
        setOpen(false);
    };
    const handleAirportId = (event) => {
        setAirportId(event.target.value);
    };

    const handleBusinessSeats = (event) => {
        setBusinessSeats(event.target.value);
    };

    const handleEcoSeats = (event) => {
        setEcoSeats(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleAdd = () => {
        console.log(airportId+" "+businessSeats+" "+ecoSeats+" "+name);
        fetchAddPlane();
        setOpen(false);

    }
    const fetchAddPlane = () => {
        let payload = {
            "airportId": airportId,
            "businessSeats": businessSeats,
            "ecoSeats": ecoSeats,
            "name": name,
        }

        console.log(payload);
        console.log(Cookie.load('userToken').token);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + Cookie.load('userToken').token,
            },
            body: JSON.stringify(payload),
        };

        const url = "http://localhost:8080/api/planes/add";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.message === "Error: Invalid airport!") {
                    setErr("Wybrane nieprawidłowe lotnisko");
                    return
                } else if(result.message === "Plane added successfully!"){
                    console.log(result);
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
                        id="airportId"
                        label="Nr lotniska"
                        type="text"
                        onChange={handleAirportId}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="businessSeats"
                        label="Miejsca biznesowe"
                        type="text"
                        onChange={handleBusinessSeats}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ecoSeats"
                        label="Miejsca ekonomii"
                        type="text"
                        onChange={handleEcoSeats}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nazwa"
                        type="text"
                        onChange={handleName}
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
