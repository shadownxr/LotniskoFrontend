import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DetailsButton from './DetailsButton';
import Cookie from 'react-cookies';
import BuyButton from './BuyButton';

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

export default function ViewFlightsList(props){
    const flightList = props.flightsData.map((flight,i) => {
        return(
            <StyledTableRow key={i} className="FlightList">
                <StyledTableCell align="center">{flight.id}</StyledTableCell>
                <StyledTableCell align="center">{flight.sapid.cityName}</StyledTableCell>
                <StyledTableCell align="center">{flight.dapid.cityName}</StyledTableCell>
                <StyledTableCell align="center">{new Date(flight.startDate).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="center">Od {flight.priceEconomic}USD</StyledTableCell>
                <StyledTableCell align="center"><div style={{display:"flex",justifyContent:"center"}}><DetailsButton flight={flight}/>{(Cookie.load('userToken'))?<BuyButton accountData={props.accountData} flightId={flight.id}/>:" "}</div></StyledTableCell>
            </StyledTableRow>
        )
    })

    return(
        <TableBody>
            {flightList}
        </TableBody>
    )
}