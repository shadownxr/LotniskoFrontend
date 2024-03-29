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
 * Button to add flight
 * @param {*} props 
 */
export default function AddFlightButton(props){
    const [airports,setAirports] = useState([]);
    const [planes2, setPlanes2] = useState([]);
    const [open, setOpen] = useState(false);
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [sourceID, setSourceID] = useState('');
    const [destID, setDestID] = useState('');
    const [planeID, setPlaneID] = useState('');
    const [priceEco, setPriceEco] = useState('');
    const [priceBusi, setPriceBusi] = useState('');
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
        fetchAirports();
        fetchPlanes();
        setOpen(true);
    };

    const handleClose = () => {
        setErr("");
        setOpen(false);
    };
    const handleStarts = (event) => {
        setStarts(event.target.value);
    };

    const handleEnds = (event) => {
        setEnds(event.target.value);
    };

    const handleSourceID = (value) => {
        setSourceID(value);
    };

    const handleDestID = (value) => {
        setDestID(value);
    };

    const handlePlaneID = (value) => {
        setPlaneID(value);
    };

    const handlePriceEco = (event) => {
        setPriceEco(event.target.value);
    };
    const handlePriceBusi = (event) => {
        setPriceBusi(event.target.value);
    };

    const handleAdd = () => {
        fetchAddFlight();
        setOpen(false);

    }
    const fetchAddFlight = () => {
        let payload = {
            "starts": starts,
            "ends": ends,
            "sourceID": sourceID.id,
            "destID": destID.id,
            "planeID": planeID.id,
            "priceEco": priceEco,
            "priceBusi": priceBusi
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

        const url = "https://localhost:8443/api/flights/add";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if(result.message === "Error: Invalid source airport!") {
                    setErr("Error: Invalid source airport!");
                    return
                } else if(result.message === "Error: Invalid plane id!"){
                    setErr("Error: Invalid plane id!");
                    return
                } else if(result.message === "Error: Invalid destination airport!"){
                    setErr("Error: Invalid destination airport!");
                    return;
                } else if(result.message === "Flight added successfully!"){
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

    const fetchPlanes = () => {
        const url = "https://localhost:8443/api/planes/list";

        let options = {
            method: 'GET',
            'Authorization': 'Bearer ' + Cookie.load('userToken').token,
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setPlanes2(result);

            });
    }


    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><Add style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add flight</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="starts"
                        label="Departure"
                        type="datetime-local"
                        onChange={handleStarts}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ends"
                        label="Arrival"
                        type="datetime-local"
                        onChange={handleEnds}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Autocomplete
                        id="sourceID"
                        options={airports}
                        getOptionLabel={(option) => option.airportName}
                        style={{ width: 300 }}
                        onChange={(event, value) =>handleSourceID(value)}
                        renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
                    />
                    <Autocomplete
                        id="destID"
                        options={airports}
                        getOptionLabel={(option) => option.airportName}
                        style={{ width: 300 }}
                        onChange={(event, value) =>handleDestID(value)}
                        renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
                    />
                    <Autocomplete
                        id="planeID"
                        options={planes2}
                        getOptionLabel={option => option.id.toString()}
                        renderOption={option => <span>{"Nr."+option.id.toString()+" "+option.planeName}</span>}
                        style={{ width: 300 }}
                        onChange={(event, value) =>handlePlaneID(value)}
                        renderInput={(params) => <TextField {...params} label="Numer samolotu" variant="outlined" />}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="priceEco"
                        label="Economic price"
                        type="text"
                        onChange={handlePriceEco}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="priceBusi"
                        label="Business price"
                        type="text"
                        onChange={handlePriceBusi}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
