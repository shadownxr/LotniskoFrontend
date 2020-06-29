import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchEmployeeButton from "./SearchEmployeeButton";
import Cookie from 'react-cookies';
import ViewFiredEmployeesList from "./ViewFiredEmpolyeesList";

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

export default function ViewEmployees(props){
    const [employees,setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    },[]);

    const fetchEmployees = () => {
        const url = "https://localhost:8443/api/employees/list";

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
                setEmployees(result);
            });
    }



    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles().table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={7}>Lista pracowników</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Imię</StyledTableCell>
                            <StyledTableCell align="center">Nazwisko</StyledTableCell>
                            <StyledTableCell align="center">Numer telefonu</StyledTableCell>
                            <StyledTableCell align="center">Data zatrudnienia</StyledTableCell>
                            <StyledTableCell align="center">Data zwolnienia</StyledTableCell>
                            <StyledTableCell align="right"><div style={{display:"inline-flex"}}><SearchEmployeeButton /></div></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <ViewFiredEmployeesList employeesData={employees} accountData={props.accountData}/>
                </Table>
            </TableContainer>
        </div>
    )
}
