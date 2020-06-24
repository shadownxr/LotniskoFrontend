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
import { useCookies } from 'react-cookie';

const MyButton = styled(Button)({
    color: 'white'
});


export default function AddButton(props){
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [personalID, setPersonalID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErr("");
        setOpen(false);
    };
    const handleSalary = (event) => {
        setSalary(event.target.value);
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

    const handlePersonalID = (event) => {
        setPersonalID(event.target.value);
    };

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleAdd = () => {
        console.log(position+" "+name+" "+surname+" "+personalID+" "+phoneNumber+" "+email);
        fetchAddEmployee();
        setOpen(false);
    }
    const fetchAddEmployee = () => {
        let payload = {
            "position": position,
            "salary": salary,
            "name": name,
            "surname": surname,
            "personalID": personalID,
            "phoneNumber": phoneNumber,
            "eMail": email,
            "role": ["Employee"]
        }

        console.log(payload);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': cookies.tokenType+ " "+ cookies.token,
            },
            body: JSON.stringify(payload),
        };

        const url = "http://localhost:8080/api/employees/add";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.message === "Error: Role is not found."){
                    setErr("Wybrana rola nie istnieje");
                    return
                } else if(result.message === "Employee added successfully!"){
                    console.log(result);
                    setOpen(false);
                }
            });

    };

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><Add style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dodaj pracownika</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>
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
                        autoFocus
                        margin="dense"
                        id="salary"
                        label="Wynagordzenie"
                        type="text"
                        onChange={handleSalary}
                        fullWidth
                    />
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
                        id="personalID"
                        label="Pesel"
                        type="text"
                        onChange={handlePersonalID}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phoneNumber"
                        label="Numer telefonu"
                        type="text"
                        onChange={handlePhoneNumber}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        onChange={handleEmail}
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
