import React, { useState, useEffect, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchFlightButton from "../../Flights/SearchFlightButton";
import AddFlightButton from './AddFlightButton'
import EmployeeViewFlightsList from "./EmployeeViewFlightsList";

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

export default function ViewFlights(props){
    const [flights,setFlights] = useState([]);
    const [refresh,setRefresh] = useState(true);
    const [search,setSearch] = useState("");
    const [searchedFlights,setSearchedFlights] = useState("");

    const ref = useRef(null);
    ref.current = "";

    useEffect(() => {
        if(refresh === true){
            fetchFlights();
            setRefresh(false);
        }
    },[refresh])

    useEffect(() => {
        if(ref !== search){
            handleSearch();
        }
    },[search,ref])

    const handleSearch = () => {
        let searched = flights.filter((flight) => {
            return(
                (flight.sapid.cityName === search.from) &&
                (flight.dapid.cityName === search.to) &&
                (new Date(flight.startDate).toLocaleDateString() >= new Date(search.dateFrom).toLocaleDateString())
            )
        }).map((flight) => flight);
        console.log(searched);
        setSearchedFlights(searched);
    }

    const fetchFlights = () => {
        const url = "https://localhost:8443/api/flights/list";

        let options = {
            method: 'GET',
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setFlights(result);
            });
    }

    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles().table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={7}>Przeglądarka lotów</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Z</StyledTableCell>
                            <StyledTableCell align="center">Do</StyledTableCell>
                            <StyledTableCell align="center">Data wylotu</StyledTableCell>
                            <StyledTableCell align="center">Data przylotu</StyledTableCell>
                            <StyledTableCell align="center">Samolot</StyledTableCell>
                            <StyledTableCell align="center">Cena</StyledTableCell>
                            <StyledTableCell align="center"><SearchFlightButton search={(search) => {setSearch(search)}}/>
                            <AddFlightButton refresh={(refresh) => {setRefresh(true)}}/></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <EmployeeViewFlightsList flightsData={(search === "")?flights:searchedFlights} accountData={props.accountData} refresh={(refresh) => {setRefresh(true)}}/>
                </Table>
            </TableContainer>
        </div>
    )
}
