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
 * Button for adding employees
 * @param {refresh} props 
 */
export default function AddEmployeeButton(props){
    const [open, setOpen] = useState(false);
    const [openResult, setOpenResult] = useState(false);
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [personalID, setPersonalID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [answ, setAnsw] = useState('');
    const [answ2, setAnsw2] = useState('');
    const positions = [{value: "employee", label:"Employee"},{value: "manager", label:"Manager"}]

    const [err, setErr] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleCloseResult = () => {
        setOpenResult(false);
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

    const handlePosition = (item) => {
        setPosition(item.value);
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
        if(validateInput()){
            fetchAddEmployee();
            setOpen(false);
            if(answ2!=null&&email){
                setOpenResult(true);
            }
        }
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
            "role": [position]
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

        const url = "https://localhost:8443/api/employees/add";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setAnsw(result.password);
                setAnsw2(result.login);
                props.refresh(true);
                if(result.message === "Error: Role is not found."){
                    setErr("Wybrana rola nie istnieje");
                    return
                } else if(result.message === "Employee added successfully!"){
                    setOpen(false);
                }
            });

    };

    const validateEmail =(email)=> {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInput = () =>{
        if(name === "" || surname === "" || personalID === "" || phoneNumber === "" || position === ""){
            setErr("All fields must be filled!");
            return false;
        }
        if( salary <= 0 ){
            setErr("Valid salary value must be provided!");
            return false;
        }
        if(!validateEmail(email)){
            setErr("Valid email must be provided!");
            return false;
        }
        return true;
    }

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><Add style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{color: "red", textAlign: "center"}}>
                        {err}
                    </DialogContentText>
                    <Autocomplete
                        id="position"
                        options={positions}
                        getOptionLabel={(option) => option.label}
                        style={{ width: 300 }}
                        onChange={(event, value) =>handlePosition(value)}
                        renderInput={(params) => <TextField {...params} label="Position" variant="outlined" />}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="salary"
                        label="Salary"
                        type="number"
                        onChange={handleSalary}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        onChange={handleName}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="surname"
                        label="Surname"
                        type="text"
                        onChange={handleSurname}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="personalID"
                        label="Personal ID"
                        type="text"
                        onChange={handlePersonalID}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phoneNumber"
                        label="Phone Number"
                        type="text"
                        onChange={handlePhoneNumber}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        onChange={handleEmail}
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
            <Dialog open={openResult} onClose={handleCloseResult} aria-labelledby="form-dialog-title">
                <DialogContentText>
                    <h1 style={{textAlign: "center"}}>Operation successful</h1><hr/>
                    A new employee was added. He can use following credentials to log in:
                </DialogContentText>
                <DialogContentText>
                    <table style={{width: "100%"}}>
                        <tr>
                            <td>Username:</td><td>{answ2}</td>
                        </tr>
                        <tr>
                            <td>Password:</td><td>{answ}</td>
                        </tr>
                    </table>
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleCloseResult} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}
