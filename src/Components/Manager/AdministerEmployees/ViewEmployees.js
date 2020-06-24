import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ViewEmployeesList from "./ViewEmployeesList";
import SearchEmployeeButton from "./SearchEmployeeButton";
import AddEmployeeButton from "./AddEmployeeButton";

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

export default function ViewEmployees(){
    const employees = [{
        id: 1,
        name: "Adam",
        surname: "Kowalski",
        position: "Starszy zarządca lotów",
        date: "2015-01-01",
    },{
        id: 2,
        name: "Anna",
        surname: "Nowak",
        position: "Młodszy zarządca lotów",
        date: "2019-06-01",
    }]

    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles().table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={7}>Lista pracowników</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Stanowisko</StyledTableCell>
                            <StyledTableCell align="center">Pensja</StyledTableCell>
                            <StyledTableCell align="center">Imię</StyledTableCell>
                            <StyledTableCell align="center">Nazwisko</StyledTableCell>
                            <StyledTableCell align="center">Numer pesel</StyledTableCell>
                            <StyledTableCell align="center">Numer telefonu</StyledTableCell>
                            <StyledTableCell align="right"><div style={{display:"inline-flex"}}><SearchEmployeeButton /><AddEmployeeButton /></div></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <ViewEmployeesList employeesData={employees}/>
                </Table>
            </TableContainer>
        </div>
    )
}
