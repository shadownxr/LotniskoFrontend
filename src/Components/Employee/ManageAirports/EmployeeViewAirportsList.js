import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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

export default function EmployeeViewPlanesList(props){
    const airportsList = props.airportsData.map((airport,i) => {
        return(
            <StyledTableRow key={i} className="AirportList">
                <StyledTableCell align="center">{airport.airportName}</StyledTableCell>
                <StyledTableCell align="center">{airport.cityName}</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
        )
    })

    return(
        <TableBody>
            {airportsList}
        </TableBody>
    )
}
