import Edit from '@material-ui/icons/Edit';
import React,{useState} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Cookie from 'react-cookies'

const MyButton = styled(Button)({
    color: 'black'
});

/**
 * Button to edit flight
 * @param {lot,refresh} props 
 */
export default function EditFlightButton(props){
    const [open, setOpen] = useState(false);
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
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


    const handleEdit = () => {
        fetchEditFlight();
        setOpen(false);

    }
    const fetchEditFlight = () => {
        let payload = {
            "id": props.lot,
            "newStart": starts,
            "newEnd": ends,
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

        const url = "https://localhost:8443/api/flights/update";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if(result.message === "Error: No such flight!") {
                    setErr("Wybrany lot już nie istnieje");
                    return
                } else if(result.message === "Error: Invalid date!"){
                    setErr("Niepoprawna data");
                    return;
                } else if(result.message === "Flight edited successfully!"){
                    props.refresh(true);
                    setOpen(false);
                }
            });

    };

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><Edit style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edytuj lot</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="starts"
                        label="Data wylotu"
                        type="datetime-local"
                        onChange={handleStarts}
                        //defaultValue = {props.startuje}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ends"
                        label="Data przylotu"
                        type="datetime-local"
                        onChange={handleEnds}
                        //defaultValue = {props.koniec}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={handleEdit} color="primary">
                        Edytuj
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
