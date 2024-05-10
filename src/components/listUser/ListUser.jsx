import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5"
import { BiEdit } from "react-icons/bi"
import { BsFillPersonPlusFill } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch"
import moment from 'moment';
import axios from "axios"
import "./table.scss";
import { formatMuiErrorMessage } from "@mui/utils";
const ListUser = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [list, setList] = useState([]);
    const { data, loading, error } = useFetch(`/${path}`)
    const activeUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {

        setList(data)
    }, [data]);
    console.log(list)
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/${path}/${id}`);
            setList(list.filter((item) => item._id !== id));
        } catch (err) { }
    };
    const [searchUser, setSearchUser] = useState("");
    return (
        <div className="listUsers">
            <div className="lu_actions">
                <input type="text" placeholder="Search for Users" onChange={(e) => setSearchUser(e.target.value)} />
                { (activeUser.authority.roleId==4 || activeUser.authority.roleId==3) && <Link to="/users/adduser"><BsFillPersonPlusFill/><span>Add New Team Member</span></Link>}
            </div>
            <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell className="tableCell">Image</TableCell>
                            <TableCell className="tableCell">Authorized Name</TableCell>
                            <TableCell className="tableCell">User Name</TableCell>
                            <TableCell className="tableCell">Started Date</TableCell>
                            <TableCell className="tableCell">Authority Group</TableCell>
                            <TableCell className="tableCell"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.filter((item) => {
                            return searchUser.toLowerCase() === "" ?
                                item : item.name.toLowerCase().includes(searchUser.toLowerCase()) ||
                                item.username.toLowerCase().includes(searchUser.toLowerCase()) ||
                                item.authority.roleName.toLowerCase().includes(searchUser.toLowerCase())
                        })
                            .sort((a, b) =>
                                a.startDate > b.startDate ? 1: -1,
                            )
                            .map((item, i) => (
                                <TableRow key={item._id} className={`${activeUser._id == item._id ? "activeUser" : ""}`}>

                                    <TableCell className="tableCell">
                                        <div className="cellWrapper">
                                            {item.img[0] ? <img className="image" src={item.img[0]} alt="" /> : <img className="image" src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="" />}
                                        </div>
                                    </TableCell>
                                    <TableCell className="tableCell">{item.name}</TableCell>
                                    <TableCell className="tableCell">{item.username}</TableCell>
                                    <TableCell className="tableCell"> <code className="diffDays">{Math.ceil(moment(new Date()).diff(item.startDate)/(1000*60*60*24))} days ago</code></TableCell>
                                    <TableCell className="tableCell">{item.authority.roleName}</TableCell>
                                    <TableCell className="tableCell buttonContainer">
                                        <button className="btnDetail"><IoEyeSharp /></button>
                                        {
                                            (activeUser._id == item._id || activeUser.authority.roleId === 4) ? <button className="btnUpdate"><BiEdit /></button> : ""
                                        }

                                        {
                                            activeUser.authority.roleId === 4 ?//adminse bunu yap  
                                                <button className="btnDelete" onClick={() => handleDelete(item._id)}><AiOutlineDelete /></button> : ""

                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ListUser