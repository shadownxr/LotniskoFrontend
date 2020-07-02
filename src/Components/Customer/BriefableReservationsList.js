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

/**
 * Renders rows in BriefableReservations array
 * @param {customerReservationsData} props 
 */
export default function BriefableReservationsList(props){
    const handleBriefing = (reservation) => {
        props.reservation(reservation);
        props.screen(2);
    }

    const reservationList = props.customerReservationsData.filter((reservation) => {if(reservation.paid === false){return reservation}}).map((reservation,i) => {
        return(
            <StyledTableRow key={i} className="FlightList">
                <StyledTableCell align="center">{reservation.flightID.sapid.airportName}</StyledTableCell>
                <StyledTableCell align="center">{reservation.flightID.sapid.cityName}</StyledTableCell>
                <StyledTableCell align="center">{reservation.flightID.dapid.airportName}</StyledTableCell>
                <StyledTableCell align="center">{reservation.flightID.dapid.cityName}</StyledTableCell>
                <StyledTableCell align="center">{new Date(reservation.flightID.startDate).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="center">{reservation.className}</StyledTableCell>
                <StyledTableCell align="center">
                    <Button onClick={() => handleBriefing(reservation)}>Odpraw</Button>
                </StyledTableCell>
            </StyledTableRow>
        )
    })

    return(
        <TableBody>
            {reservationList}
        </TableBody>
    )
}