import React from 'react'
import useFetch from '../../hooks/useFetch';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import { BsFillPersonPlusFill } from "react-icons/bs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Reservation from './Reservation';
import "./reservationList.scss"
const ReservationList = () => {
    const [searchReservation, setSearchReservation] = useState("")
    const activeUser = JSON.parse(localStorage.getItem('user'))
    const [list, setList] = useState([]);
    const { data, loading, error } = useFetch("/reservations");
    
    console.log(data)
    useEffect(() => {
        setList(data)
    }, [data]);
    return (
        <div className="reservationList">
            <div className="lr_actions">
                <input type="text" placeholder="Search for Reservations" onChange={(e) => setSearchReservation(e.target.value)} />
                {(activeUser.authority.roleId == 4 || activeUser.authority.roleId == 3) && <Link to="/reservation/addReservation"><BsFillPersonPlusFill /><span>Add Manuel Reservation</span></Link>}
            </div>
            <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell className="tableCell">Villa Name</TableCell>
                            <TableCell className="tableCell">Name</TableCell>
                            <TableCell className="tableCell">Phone</TableCell>
                            <TableCell className="tableCell">Reservation Date</TableCell>
                            <TableCell className="tableCell">Check-in</TableCell>
                            <TableCell className="tableCell">Check-out</TableCell>
                            <TableCell className="tableCell">Total Price</TableCell>
                            <TableCell className="tableCell">Status</TableCell>
                            <TableCell className="tableCell"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.filter((item) => {
                            return searchReservation.toLowerCase() === "" ?
                                item : item.name.toLowerCase().includes(searchReservation.toLowerCase())

                        })
                            .sort((a, b) =>
                                a.name > b.name ? 1 : -1,
                            )
                            .map((item, i) => (
                                <Reservation key={i} item={item} list={list} setList={setList} />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ReservationList