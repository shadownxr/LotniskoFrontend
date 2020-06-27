import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import './Authorization.css';
import { useCookies } from 'react-cookie';

export default function SignIn(props){
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [err, setErr] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

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

    const handleSignIn = () => {
      fetchToken();
    };

    const fetchToken = () => {
      let payload = {
        username: login,
        password: password
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

      let dt = new Date();
      dt.setMinutes( dt.getMinutes() + 15 );

      const url = "http://localhost:8080/api/auth/signin";

      fetch(url, options)
        .then(response => response.json())
        .then(result => {
          if(result.error === "Unauthorized"){
            console.log(result);
            setErr("Błędny login lub hasło");
            return
          } else {
            setCookie('userToken',{token:result.accessToken,tokenType:result.tokenType},{expires: dt});
            props.accountData({id: result.id,roles:result.roles,username:result.username,email:result.email});
            setOpen(false);
          }
      });

    };

    return (
      <div className={'authButton'} onClick={handleClickOpen}>
        <Button >Sign in</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className="FormTitle">SignIn</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {err}
                    </DialogContentText>
                        <TextField
                          autoFocus
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
                          margin="dense"
                          id="password"
                          label="Password"
                          type="password"
                          fullWidth
                          onChange={handlePassword}
                        />
                </DialogContent>
            <DialogActions className="DialogButtons">
                <Button onClick={handleSignIn} color="primary">
                    Zaloguj
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}