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
    const [email, setEmail] = React.useState('');
    const [login, setLogin] = React.useState('');
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

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPassword = (event) => {
        setRPassword(event.target.value);
    };

    const handleAdd = () => {
      console.log(password+" "+rPassword+" "+login+" "+email);
        if(password === rPassword){
            setOpen(false);
        } else {
            setErr("Hasła nie zgadzają się");
        }
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
                <Button onClick={handleAdd} color="primary">
                    Stwórz konto
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}