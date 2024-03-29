import React, {useEffect, useState,useRef} from 'react';
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

/**
 * Array of fired employees
 * @param {*} props 
 */
export default function ViewEmployees(props){
    const [employees,setEmployees] = useState([]);
    const [search,setSearch] = useState("");
    const [searchedEmployees,setSearchedEmployees] = useState("");

    const ref = useRef(null);
    ref.current = "";

    useEffect(() => {
        fetchEmployees();
    },[]);

    useEffect(() => {
        if(ref !== search){
            handleSearch();
        }
    },[search,ref])

    const handleSearch = () => {
        let searched = employees.filter((employee) => {
            return(
                (employee.personID.name === search.name) &&
                (employee.personID.surname === search.surname)
            )
        }).map((employee) => employee);
        setSearchedEmployees(searched);
    }

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
                setEmployees(result);
            });
    }



    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles().table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={7}>Former employees</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Surname</StyledTableCell>
                            <StyledTableCell align="center">Phone</StyledTableCell>
                            <StyledTableCell align="center">Employed</StyledTableCell>
                            <StyledTableCell align="center">Fired</StyledTableCell>
                            <StyledTableCell align="right"><div style={{display:"inline-flex"}}><SearchEmployeeButton search={(search) => {setSearch(search)}}/></div></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <ViewFiredEmployeesList employeesData={(search === "")?employees:searchedEmployees} accountData={props.accountData}/>
                </Table>
            </TableContainer>
        </div>
    )
}
