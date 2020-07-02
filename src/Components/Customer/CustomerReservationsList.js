import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DetailsButton from './DetailsButton';
import CancelButton from './CancelButton';

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
 * Renders rows in CustomerReservations array
 * @param {customerReservationsData} props 
 */
export default function CustomerReservationsList(props){
    const reservationList = props.customerReservationsData.map((reservation,i) => {
        return(
            <StyledTableRow key={i} className="FlightList">
                <StyledTableCell align="center">{reservation.flightID.sapid.cityName}</StyledTableCell>
                <StyledTableCell align="center">{reservation.flightID.dapid.cityName}</StyledTableCell>
                <StyledTableCell align="center">{new Date(reservation.flightID.startDate).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="center">{reservation.className}</StyledTableCell>
                <StyledTableCell align="center">{reservation.price}USD</StyledTableCell>
                <StyledTableCell align="center">{(reservation.paid===false)?"Nie":"Tak"}</StyledTableCell>
                <StyledTableCell align="center">
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <DetailsButton reservation={reservation}/>
                        {(reservation.paid===false)?<CancelButton reservation={reservation} refresh={(refresh) => {props.refresh(refresh)}}/>:""}
                    </div>
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