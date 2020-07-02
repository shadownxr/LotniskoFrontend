import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import './Authorization.css';

/**
 * Sign Up form
 * @param {refresh} props 
 */
export default function SignUp(props){
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [rPassword, setRPassword] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [surename, setSurename] = React.useState('');
    const [personalId, setPersonalId] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [err, setErr] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErr("");
        setOpen(false);
    };

    const handleLogin = (event) => {
        setLogin(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleSurename = (event) => {
        setSurename(event.target.value);
    };

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handlePersonalId = (event) => {
        setPersonalId(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPassword = (event) => {
        setRPassword(event.target.value);
    };
    const validateEmail =(email)=> {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInput = () =>{
        if(password.length < 6){setErr("Password must be at least 6 characters long!");return false}
        if(login.length < 6){setErr("User name must be at least 6 characters long!");return false}
        if(!validateEmail(email)){setErr("Valid email must be provided!");return false}
        if(password !== rPassword){setErr("Passwords are not identical!"); return false}

        if(name === ""){setErr("Please enter your name."); return false}
        if(surename === ""){setErr("Please enter your surname."); return false}
        if(personalId === ""){setErr("All fields must be filled."); return false}
        if(phoneNumber === ""){setErr("All fields must be filled."); return false}

        return true;
    }

    const handleAdd = () => {
        if(validateInput()){
            setErr("");
            fetchRegister();
            setOpen(false);
        }
    };

    const fetchRegister = () => {
        let payload = {
          "username": login,
          "password": password,
          "email": email,
          "role": ["user"],
          "phoneNumber": phoneNumber,
          "personalID": personalId,
          "name": name,
          "surname": surename
        }
  


        console.log(payload);
  
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        };
  
        const url = "https://localhost:8443/api/auth/signup";
  
        fetch(url, options)
          .then(response => response.json())
          .then(result => {
            console.log(result);
              if(result.message === "Error: Username is already taken!"){
              setErr("Username is already taken!");
              return
            } else if(result.message === "Error: Email is already in use!"){
              setErr("Error: Email is already in use!");
              return
            } else if(result.error === "Internal Server Error"){
              setErr("Error has occurred during account creation.");
              return
            } else if(result.message === "User registered successfully!"){
              props.refresh(true);
              setOpen(false);
            }
        });
  
      };

    return (
      <div>
        <Button className={'authButton'} onClick={handleClickOpen}>Join</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className="FormTitle">Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{color: "red", textAlign: "center"}}>
                        {err}
                    </DialogContentText>
                        <TextField
                            id="login"
                            label="User Name"
                            type="login"
                            onChange={handleLogin}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            onChange={handleEmail}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={handleName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="surename"
                            label="Surname"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={handleSurename}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="personalId"
                            label="Personal ID"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={handlePersonalId}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="phoneNumber"
                            label="Phone number"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={handlePhoneNumber}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={handlePassword}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="repeat_password"
                            label="Repeat Password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={handleRepeatPassword}
                        />
                </DialogContent>
            <DialogActions className="DialogButtons">
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAdd} color="primary">
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}
