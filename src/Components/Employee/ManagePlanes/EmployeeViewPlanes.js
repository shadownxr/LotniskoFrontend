import React, { useState, useEffect, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EmployeeViewPlanesList from "./EmployeeViewPlanesList";
import AddPlaneButton from "./AddPlaneButton";
import Cookie from "react-cookies";
import SearchPlaneButton from "./SearchPlaneButton";

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
 * Renders array with planes
 * @param {*} props 
 */
export default function EmployeeViewPlanes(props){
    const [planes,setPlanes] = useState([]);
    const [refresh,setRefresh] = useState(true);
    const [search,setSearch] = useState("");
    const [searchedPlanes,setSearchedPlanes] = useState("");

    const ref = useRef(null);
    ref.current = "";

    useEffect(() => {
        if(refresh === true){
            fetchPlanes();
            setRefresh(false);
        }
    },[refresh])

    useEffect(() => {
        if(ref !== search){
            handleSearch();
        }
    },[search,ref])

    const handleSearch = () => {
        let searched = planes.filter((plane) => {
            return(
                (plane.planeName === search.planeName)
            )
        }).map((plane) => plane);
        setSearchedPlanes(searched);
    }

    const fetchPlanes = () => {
        const url = "https://localhost:8443/api/planes/list";

        let options = {
            method: 'GET',
            'Authorization': 'Bearer ' + Cookie.load('userToken').token,
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setPlanes(result);
            });
    }

    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles().table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={7}>Planes</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Economic seats</StyledTableCell>
                            <StyledTableCell align="center">Business seats</StyledTableCell>
                            <StyledTableCell align="center">
                                <SearchPlaneButton search={(search) => {setSearch(search)}}/>
                                <AddPlaneButton refresh={(refresh) => {setRefresh(true)}}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <EmployeeViewPlanesList planesData={(search === "")?planes:searchedPlanes} accountData={props.accountData} />
                </Table>
            </TableContainer>
        </div>
    )
}
