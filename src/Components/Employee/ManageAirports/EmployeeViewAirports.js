import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EmployeeViewAirportsList from "./EmployeeViewAirportsList";
import Cookie from "react-cookies";
import AddAirportButton from "./AddAirportButton";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function EmployeeViewPlanes(props){
    const [airports,setAirports] = useState([]);
    const [refresh,setRefresh] = useState(true);


    useEffect(() => {
        if(refresh === true){
            fetchAirports();
            setRefresh(false);
        }
    },[refresh])

    const fetchAirports = () => {
        const url = "https://localhost:8443/api/airports/list";

        let options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Cookie.load('userToken').token,
            },
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setAirports(result);
            });
    }

    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles().table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={7}>Przeglądarka lotnisk</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Nr</StyledTableCell>
                            <StyledTableCell align="center">Nazwa</StyledTableCell>
                            <StyledTableCell align="center">Miasto</StyledTableCell>
                            <StyledTableCell align="center"><AddAirportButton refresh={(refresh) => {setRefresh(true)}}/></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <EmployeeViewAirportsList airportsData={airports} accountData={props.accountData}/>
                </Table>
            </TableContainer>
        </div>
    )
}
