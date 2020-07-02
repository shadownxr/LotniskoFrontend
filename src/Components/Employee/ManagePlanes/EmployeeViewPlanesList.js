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

/**
 * Renders rows in EmployeeViewPlanes array
 * @param {planesData} props 
 */
export default function EmployeeViewPlanesList(props){
    const planesList = props.planesData.map((plane,i) => {
            return(
            <StyledTableRow key={i} className="PlaneList">
                <StyledTableCell align="center">{plane.planeName}</StyledTableCell>
                <StyledTableCell align="center">{plane.seatsInEconomic}</StyledTableCell>
                <StyledTableCell align="center">{plane.seatsInBuisness}</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
        )
    })

    return(
        <TableBody>
            {planesList}
        </TableBody>
    )
}
