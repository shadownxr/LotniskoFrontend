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
import Facebook from './Facebook';

/**
 * Sign In form
 * @param {accountData} props 
 */
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

      const url = "https://localhost:8443/api/auth/signin";

      fetch(url, options)
        .then(response => response.json())
        .then(result => {
          if(result.error === "Unauthorized"){
            setErr("Incorrect input");
            return
          } else {
            setCookie('userToken',{token:result.accessToken,tokenType:result.tokenType},{expires: dt,path:'/'});
            props.accountData({id: result.id,roles:result.roles,username:result.username,email:result.email});
            setOpen(false);
          }
      });

    };

    return (
      <div>
        <Button className={"authButton"} onClick={handleClickOpen}>Sign in</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className="FormTitle">Sign in</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{color: "red", textAlign: "center"}}>
                        {err}
                    </DialogContentText>
                        <TextField
                          autoFocus
                          id="login"
                          label="Username"
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
                <Facebook />
            <DialogActions className="DialogButtons">
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSignIn} color="primary">
                    Go
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}