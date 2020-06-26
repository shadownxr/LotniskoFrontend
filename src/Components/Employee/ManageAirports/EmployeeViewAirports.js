import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchFlightButton from "../../Flights/SearchFlightButton";
import EmployeeViewAirportsList from "./EmployeeViewAirportsList";

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

    useEffect(() => {
        fetchFlights();
    },[]);

    const fetchFlights = () => {
        const url = "http://localhost:8080/api/airports/list";

        let options = {
            method: 'GET',
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
                            <StyledTableCell align="center">Kod</StyledTableCell>
                            <StyledTableCell align="center">Miasto</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <EmployeeViewAirportsList airportsData={airports} accountData={props.accountData}/>
                </Table>
            </TableContainer>
        </div>
    )
}
