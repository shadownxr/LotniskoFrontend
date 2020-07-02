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
import Autocomplete from "@material-ui/lab/Autocomplete";

const MyButton = styled(Button)({
    color: 'white'
});

/**
 * Button to add plane
 * @param {refresh} props 
 */
export default function AddPlaneButton(props){
    const [open, setOpen] = useState(false);
    const [airports,setAirports] = useState([]);
    const [airportId, setAirportId] = useState('');
    const [businessSeats, setBusinessSeats] = useState('');
    const [ecoSeats, setEcoSeats] = useState('');
    const [name, setName] = useState('');
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
        fetchAirports();
        setOpen(true);
    };

    const handleClose = () => {
        setErr("");
        setOpen(false);
    };
    const handleAirportId = (value) => {
        setAirportId(value);
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
        fetchAddPlane();
        setOpen(false);

    }
    const fetchAddPlane = () => {
        let payload = {
            "airportId": airportId.id,
            "businessSeats": businessSeats,
            "ecoSeats": ecoSeats,
            "name": name,
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

        const url = "https://localhost:8443/api/planes/add";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if(result.message === "Error: Invalid airport!") {
                    setErr("Wybrane nieprawidłowe lotnisko");
                    return
                } else if(result.message === "Plane added successfully!"){
                    props.refresh(true);
                    setOpen(false);
                }
            });

    };

    const fetchAirports = () => {
        const url = "https://localhost:8443/api/airports/list";

        let options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Cookie.load('userToken').token,
            },
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setAirports(result);
            });
    }

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><Add style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dodaj samolot</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>
                    <Autocomplete
                        id="airportId"
                        options={airports}
                        getOptionLabel={(option) => option.airportName}
                        style={{ width: 300 }}
                        onChange={(event, value) =>handleAirportId(value)}
                        renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
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
