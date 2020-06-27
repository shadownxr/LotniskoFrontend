import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import './Authorization.css';

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

    const handleAdd = () => {
      console.log(password+" "+rPassword+" "+login+" "+email);
        if(password === rPassword){
            fetchRegister();
            setOpen(false);
        } else {
            setErr("Hasła nie zgadzają się");
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
  
        if(password.length < 6){
            err("Hasło musi mieć conajmniej 6 znaków");
            return
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
  
        const url = "http://localhost:8080/api/auth/signup";
  
        fetch(url, options)
          .then(response => response.json())
          .then(result => {
            console.log(result);
              if(result.message === "Error: Username is already taken!"){
              setErr("Wybrany login jest zajęty");
              return
            } else if(result.message === "Error: Email is already in use!"){
              setErr("Wybrany email jest zajęty");
              return
            } else if(result.error === "Internal Server Error"){
              setErr("Błąd przy zakładaniu konta");
              return
            } else if(result.message === "User registered successfully!"){
              console.log(result);
              props.refresh(true);
              setOpen(false);
            }
        });
  
      };

    return (
      <div>
        <Button onClick={handleClickOpen}>Kliknij aby założyć konto.</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className="FormTitle">SignUp</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>
                        <TextField
                            id="login"
                            label="Login"
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
                            label="Surename"
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
                            label="PESEL"
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
                            label="Numer Telefonu"
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
                    Anuluj
                </Button>
                <Button onClick={handleAdd} color="primary">
                    Stwórz konto
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}
