import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteFlightButton from "./DeleteFlightButton";
import EditFlightButton from "./EditFlightButton";

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

export default function EmployeeViewFlightsList(props){
    const flightList = props.flightsData.map((flight,i) => {
        return(
            <StyledTableRow key={i} className="FlightList">
                <StyledTableCell align="center">{flight.sapid.cityName}</StyledTableCell>
                <StyledTableCell align="center">{flight.dapid.cityName}</StyledTableCell>
                <StyledTableCell align="center">{new Date(flight.startDate).toUTCString()}</StyledTableCell>
                <StyledTableCell align="center">{new Date(flight.endDate).toUTCString()}</StyledTableCell>
                <StyledTableCell align="center">{flight.planeID.planeName}</StyledTableCell>
                <StyledTableCell align="center">Od {flight.priceEconomic}USD</StyledTableCell>
                <StyledTableCell align="center"><DeleteFlightButton lot={flight.id} refresh={(refresh) => {props.refresh(refresh)}}/>
                    <EditFlightButton lot={flight.id} startuje={flight.startDate} koniec={flight.endDate} refresh={(refresh) => {props.refresh(refresh)}}/> </StyledTableCell>
            </StyledTableRow>
        )
    })

    return(
        <TableBody>
            {flightList}
        </TableBody>
    )
}
