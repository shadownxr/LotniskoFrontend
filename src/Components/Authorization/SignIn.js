import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import './Authorization.css';

export default function SignIn(props){
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [err, setErr] = useState('');

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

    const handlePassword = (event) => {
        setPassword(event.target.value);
      };

    const handleAdd = () => {
      console.log(password+" "+login);
      setOpen(false);
    };

    return (
      <div>
        <Button onClick={handleClickOpen}>Kliknij aby się zalogować.</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className="FormTitle">SignIn</DialogTitle>
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
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={handlePassword}
                        />
                </DialogContent>
            <DialogActions className="DialogButtons">
                <Button onClick={handleAdd} color="primary">
                    Zaloguj
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}