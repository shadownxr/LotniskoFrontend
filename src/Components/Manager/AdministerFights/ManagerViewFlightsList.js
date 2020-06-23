import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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

export default function ManagerViewFlightList(props){
    const flightList = props.flightsData.map((flight,i) => {
        return(
            <StyledTableRow key={i} className="FlightList">
                <StyledTableCell align="center">{flight.id}</StyledTableCell>
                <StyledTableCell align="center">{flight.from}</StyledTableCell>
                <StyledTableCell align="center">{flight.to}</StyledTableCell>
                <StyledTableCell align="center">{flight.date}</StyledTableCell>
                <StyledTableCell align="center">{flight.class}</StyledTableCell>
                <StyledTableCell align="center">{flight.cost}</StyledTableCell>
                <StyledTableCell align="center"><Button>Szczegóły</Button></StyledTableCell>
            </StyledTableRow>
        )
    })

    return(
        <TableBody>
            {flightList}
        </TableBody>
    )
}
