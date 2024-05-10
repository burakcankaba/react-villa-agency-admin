import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { IoEyeSharp } from "react-icons/io5"
import { BiEdit } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai"
import { Link } from "react-router-dom";
import axios from "axios"
import useFetch from '../../hooks/useFetch'
const Reservation = ({ item, setList, list }) => {
    const activeUser = JSON.parse(localStorage.getItem('user'))
    function formatDate(string) {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }
    function formatTime(string) {

        return new Date(string).toLocaleTimeString();
    }
    const { data, loading, error } = useFetch(`/villas/find/${item.villaId}`);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/reservations/${id}`);
            setList(list.filter((item) => item._id !== id));
        } catch (err) { }
    };
    return (
        <TableRow>

            <TableCell className="tableCell">{data.name}</TableCell>
            <TableCell className="tableCell">{item.name}</TableCell>
            <TableCell className="tableCell">{item.phone}</TableCell>
            <TableCell className="tableCell">{formatDate(item.reservationDate)} - {formatTime(item.reservationDate)}</TableCell>
            <TableCell className="tableCell">{formatDate(item.checkinDate)}</TableCell>
            <TableCell className="tableCell">{formatDate(item.checkoutDate)}</TableCell>
            <TableCell className="tableCell">{item.totalPayment}₺</TableCell>
            <TableCell className="tableCell">{item.isBooked ? "Booked" : item.isPending ? "Pending" : "Waiting"}</TableCell>

            <TableCell className="tableCell buttonContainer">
                <Link className="btnDetail" to={`/reservation/detail/${item._id}`}><IoEyeSharp /></Link>
                {
                    activeUser.authority.roleId === 2 || activeUser.authority.roleId === 4 ? <Link to="" className="btnUpdate"><BiEdit /></Link> : ""
                }

                {
                    activeUser.authority.roleId === 4 ?//adminse bunu yap  
                        <button className="btnDelete" onClick={() => handleDelete(item._id)} ><AiOutlineDelete /></button> : ""

                }
            </TableCell>
        </TableRow>
    )
}

export default Reservation