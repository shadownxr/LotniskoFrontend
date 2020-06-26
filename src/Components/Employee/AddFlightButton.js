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


export default function AddFlightButton(props){
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

    const handleSourceID = (event) => {
        setSourceID(event.target.value);
    };

    const handleDestID = (event) => {
        setDestID(event.target.value);
    };

    const handlePlaneID = (event) => {
        setPlaneID(event.target.value);
    };

    const handlePriceEco = (event) => {
        setPriceEco(event.target.value);
    };
    const handlePriceBusi = (event) => {
        setPriceBusi(event.target.value);
    };

    const handleAdd = () => {
        console.log(starts+" "+ends+" "+sourceID+" "+destID+" "+planeID+" "+priceEco+" "+priceBusi);
        fetchAddFlight();
        setOpen(false);

    }
    const fetchAddFlight = () => {
        let payload = {
            "starts": starts,
            "ends": ends,
            "sourceID": sourceID,
            "destID": destID,
            "planeID": planeID,
            "priceEco": priceEco,
<<<<<<< Updated upstream
            "priceBusi": priceBusi,
=======
            "priceBusi": priceBusi
>>>>>>> Stashed changes
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

        const url = "http://localhost:8080/api/flights/add";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                console.log(result);
<<<<<<< Updated upstream
                if(result.message === "Error: Invalid source airport!"){
                    setErr("Wybrana rola nie istnieje");
                    return
                } else if(result.message === "Employee added successfully!"){
                    console.log(result);
                    setOpen(false);
                    return
                }
                else if(result.message === "Error: Invalid plane id!"){
=======
                if(result.message === "Error: Invalid source airport!") {
                    setErr("Wybrane lostnisko źródłowe nie istnieje");
                    return
                } else if(result.message === "Error: Invalid destination airport!"){
                    setErr("Wybrane lostnisko docelowe nie istnieje");
                    return;
                } else if(result.message === "Flight added successfully!"){
>>>>>>> Stashed changes
                    console.log(result);
                    setOpen(false);
                }
            });

    };

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><Add style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dodaj lot</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="starts"
<<<<<<< Updated upstream
                        label="Data startu"
=======
                        label="Data wylotu"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        label="Spodziewane lądawanie"
=======
                        label="Data przylotu"
>>>>>>> Stashed changes
                        type="datetime-local"
                        onChange={handleEnds}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sourceID"
<<<<<<< Updated upstream
                        label="Z"
=======
                        label="Od"
>>>>>>> Stashed changes
                        type="text"
                        onChange={handleSourceID}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="destID"
                        label="Do"
                        type="text"
                        onChange={handleDestID}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="planeID"
<<<<<<< Updated upstream
                        label="Numer samolotu"
=======
                        label="Samolot"
>>>>>>> Stashed changes
                        type="text"
                        onChange={handlePlaneID}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="priceEco"
<<<<<<< Updated upstream
                        label="Koszt klasy ekonomicznej"
=======
                        label="Cena ekonomii"
>>>>>>> Stashed changes
                        type="text"
                        onChange={handlePriceEco}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="priceBusi"
<<<<<<< Updated upstream
                        label="Koszt klasy biznesowej"
=======
                        label="Cena biznesu"
>>>>>>> Stashed changes
                        type="text"
                        onChange={handlePriceBusi}
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
