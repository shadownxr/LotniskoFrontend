import React,{useState} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookie from 'react-cookies'

const MyButton = styled(Button)({
    color: 'black'
});


export default function DeleteFlightButton(id){
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErr("");
        setOpen(false);
    };

    const handleFire = () => {
        console.log(id);
        fetchDeleteFlight();
        setOpen(false);
    }

    const fetchDeleteFlight = () => {
        let payload = {
            "id": id.children
        }

        console.log(payload);
        console.log(Cookie.load('userToken').token);


        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + Cookie.load('userToken').token,
            },
            body: JSON.stringify(payload),
        };

        const url = "http://localhost:8080/api/flights/delete";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.message === "Error: No such flight!"){
                    setErr("Wybrany lot nie istnieje lub został już usunięty");
                    return
                } else if(result.message === "Flight removed successfully!"){
                    console.log(result);
                    setOpen(false);
                }
            });

    };

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><DeleteForever style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Czy na pewno chcesz usunąć lot?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Nie
                    </Button>
                    <Button onClick={handleFire} color="primary">
                        Tak
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
