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


export default function DeleteButton(props){
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
        console.log(props.employee);
        if(props.employee==0){
            setErr("Root user cannot be deleted!")
        }
        else{
        fetchFireEmployee();
        setOpen(false);}
    }

    const fetchFireEmployee = () => {
        let payload = {
            "id": props.employee
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

        const url = "https://localhost:8443/api/employees/fire";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.message === "Error: no such Employee!"){
                    setErr("Wybrany pracownik nie istnieje lub został już zwolniony");
                    return
                } else if(result.message === "Employee fired successfully!"){
                    console.log(result);
                    props.refresh(true);
                    setOpen(false);
                }
            });

    };

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><DeleteForever style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Are you sure you want to fire <b>{props.obj.personID.name} {props.obj.personID.surname}</b>?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleFire} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
