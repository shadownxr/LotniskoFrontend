import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteButton from "./DeleteEmployee";

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
 * Rows of ViewEmployees array
 * @param {employeesData} props 
 */
export default function ViewEmployeesList(props){
    const employeesList = props.employeesData.map((employee,i) => {
        if(employee.firingDate==null){
        return(
            <StyledTableRow key={i} className="EmployeeList">
                <StyledTableCell align="center">{employee.position}</StyledTableCell>
                <StyledTableCell align="center">{employee.personID.name}</StyledTableCell>
                <StyledTableCell align="center">{employee.personID.surname}</StyledTableCell>
                <StyledTableCell align="center">{employee.personID.personalID}</StyledTableCell>
                <StyledTableCell align="center">{employee.personID.phoneNumber}</StyledTableCell>
                <StyledTableCell align="center">${employee.salary}</StyledTableCell>
                <StyledTableCell align="center"><DeleteButton employee={employee.id} obj={employee} refresh={(refresh) => {props.refresh(refresh)}}/></StyledTableCell>
            </StyledTableRow>
        )}
        else i++;
    })

    return(
        <TableBody>
            {employeesList}
        </TableBody>
    )
}
