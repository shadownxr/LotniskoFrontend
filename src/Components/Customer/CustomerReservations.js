import React, { useState,useEffect, useRef } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchButton from './SearchReservationButton';
import CustomerReservationsList from './CustomerReservationsList';
import Cookie from 'react-cookies';

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
 * Renders customers reservations
 * @param {accountData} props 
 */
export default function CustomerReservations(props){
    const [reservations,setReservations] = useState([]);
    const [search, setSearch] = useState("");
    const [refresh,setRefresh] = useState(false);
    const [searchedReservations,setSearchedReservations] = useState([]);

    const ref = useRef();
    ref.current = "";

    useEffect(() => {
      fetchReservations();
    },[]);

    useEffect(() => {
      if(refresh === true){
        fetchReservations();
        setRefresh(false);
      }
    },[refresh])

    useEffect(() => {
      if(ref !== search){
        handleSearch();
      }
    },[search,ref])

    const handleSearch = () => {
      let searched = reservations.filter((reservation) => {
        return(
          (reservation.flightID.sapid.cityName === search.from) && 
          (reservation.flightID.dapid.cityName === search.to) && 
          (new Date(reservation.startDate).toLocaleDateString() >= new Date(search.dateFrom).toLocaleDateString()) &&
          //(new Date(reservation.startDate).toLocaleDateString() <= new Date(search.dateTo).toLocaleDateString()) &&
          (reservation.paid === search.paid)
        )
      }).map((reservation) => reservation);
      setSearchedReservations(searched);
    }

    const fetchReservations = () => {
        let payload = {
          "userID": props.accountData.id,
        }

      const url = "https://localhost:8443/api/tickets/listByClientID";

      const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + Cookie.load('userToken').token,
          },
          body: JSON.stringify(payload),
      };

      fetch(url, options)
        .then(response => response.json())
        .then(result => {
          setReservations(result);
        });
    }

    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles().table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={8}>Moje rezerwacje</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Z</StyledTableCell>
                            <StyledTableCell align="center">Do</StyledTableCell>
                            <StyledTableCell align="center">Data wylotu</StyledTableCell>
                            <StyledTableCell align="center">Klasa</StyledTableCell>
                            <StyledTableCell align="center">Cena</StyledTableCell>
                            <StyledTableCell align="center">Przeprowadzona odprawa</StyledTableCell>
                            <StyledTableCell align="center"><SearchButton search={(search) => {setSearch(search)}}/></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <CustomerReservationsList customerReservationsData={(search === "")?reservations:searchedReservations} refresh={(refresh) => {setRefresh(true)}}/>
                </Table>
            </TableContainer>
        </div>
    )
}