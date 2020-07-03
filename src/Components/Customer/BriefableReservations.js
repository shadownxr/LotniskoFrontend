import React, { useState,useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchButton from './SearchReservationButton';
import BriefableReservationsList from './BriefableReservationsList';
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
 * Renders array with briefable reservations
 * @param {refresh,accountData} props 
 */
export default function BriefableReservations(props){
    const [reservations,setReservations] = useState([]);
    const [refresh,setRefresh] = useState(props.refresh);

    useEffect(() => {
      fetchReservations();
    },[]);

    useEffect(() => {
      if(refresh === true){
        fetchReservations();
        setRefresh(false);
      }
    },[refresh]);

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
                            <StyledTableCell align="center" colSpan={7}>Check-in</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={2}>From</StyledTableCell>
                            <StyledTableCell align="center" colSpan={2}>To</StyledTableCell>
                            <StyledTableCell align="center">Departure</StyledTableCell>
                            <StyledTableCell align="center">Class</StyledTableCell>
                            <StyledTableCell align="center"><SearchButton /></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <BriefableReservationsList customerReservationsData={reservations} reservation={(reservation) => {props.reservation(reservation)}} screen={(screen) => {props.screen(screen)}}/>
                </Table>
            </TableContainer>
        </div>
    )
}