import React, { useState, useEffect } from 'react';
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

export default function ViewFlights(props){
    const [flights,setFlights] = useState([]);

    useEffect(() => {
      fetchFlights();
    },[]);

    const fetchFlights = () => {
      const url = "http://localhost:8080/api/flights/list";

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
                            <StyledTableCell align="center">Nr</StyledTableCell>
                            <StyledTableCell align="center">Z</StyledTableCell>
                            <StyledTableCell align="center">Do</StyledTableCell>
                            <StyledTableCell align="center">Data wylotu</StyledTableCell>
                            <StyledTableCell align="center">Klasa</StyledTableCell>
                            <StyledTableCell align="center">Cena</StyledTableCell>
                            <StyledTableCell align="center"><SearchButton /></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <ViewFlightsList flightsData={flights} accountData={props.accountData}/>
                </Table>
            </TableContainer>
        </div>
    )
}