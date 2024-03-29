import React, { useState, useEffect, useRef } from 'react';
import ViewFlightsList from './ViewFlightsList';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchButton from './SearchFlightButton';


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
 * Renders available flights
 * @param {accountData} props 
 */
export default function ViewFlights(props){
    const [flights,setFlights] = useState([]);
    const [search,setSearch] = useState("");
    const [searchedFlights,setSearchedFlights] = useState("");

    const ref = useRef(null);
    ref.current = "";

    useEffect(() => {
      fetchFlights();
    },[]);

    useEffect(() => {
      if(ref !== search){
        handleSearch();
      }
    },[search,ref])

    const handleSearch = () => {
      let searched = flights.filter((flight) => {
          console.log(search.from + "->" + search.to)
        return(
          (flight.sapid.cityName === search.from) && 
          (flight.dapid.cityName === search.to) && 
          (new Date(flight.startDate).toLocaleDateString() >= new Date(search.dateFrom).toLocaleDateString())
        )
      }).map((flight) => flight);
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
          setFlights(result);
        });
    }

    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles().table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={6}>Available Flights</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">From</StyledTableCell>
                            <StyledTableCell align="center">To</StyledTableCell>
                            <StyledTableCell align="center">Departure</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center"><SearchButton search={(search) => {setSearch(search)}}/></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <ViewFlightsList flightsData={(search === "")?flights:searchedFlights} accountData={props.accountData}/>
                </Table>
            </TableContainer>
        </div>
    )
}