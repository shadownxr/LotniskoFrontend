import SearchIcon from '@material-ui/icons/Search';
import React, {useState} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const MyButton = styled(Button)({
    color: 'white'
});

export default function SearchPlaneButton(props){
    const [open, setOpen] = useState(false);
    const [planeName, setPlaneName] = useState('');
    const [err, setErr] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErr("");
        setOpen(false);
    };

    const handleId = (event) => {
        setPlaneName(event.target.value);
    };

    const handleSearch = () => {
        if(planeName){
            props.search({planeName: planeName});
            setOpen(false);
        } else {
            setErr("Wypełnij pole!");
        }
    }

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><SearchIcon style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Szukaj</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Podaj nazwe samolotu<br/>
                        {err}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="planeName"
                        label="Nazwa"
                        type="text"
                        onChange={handleId}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={handleSearch} color="primary">
                        Szukaj
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
