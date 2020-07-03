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
/**
 * Button to search plane
 * @param {search} props 
 */
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
            setErr("Name field must be filled!");
        }
    }

    return (
        <div>
            <MyButton color="primary" onClick={handleClickOpen}><SearchIcon style={{height:'35px',width:'35px'}}/></MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Search</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter plane name<br/>
                        {err}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="planeName"
                        label="name"
                        type="text"
                        onChange={handleId}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSearch} color="primary">
                        Go
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}