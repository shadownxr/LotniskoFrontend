import React from 'react';
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

export default function ViewFlights(){
    const flights = [{
       id: 1,
       from: "Szczecin",
       to: "Kraków",
       date: "2020-07-02",
       class: "Ekonomiczna",
       cost: "200PLN" 
    },{
       id: 2,
       from: "Kraków",
       to: "Raków",
       date: "2020-07-20",
       class: "Biznes",
       cost: "400PLN"
    }]

    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles().table} aria-label="simple table">
                    <TableHead>
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
                    <ViewFlightsList flightsData={flights}/>
                </Table>
            </TableContainer>
        </div>
    )
}