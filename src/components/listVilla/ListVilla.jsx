import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5"
import { BiEdit } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai"
import useFetch from "../../hooks/useFetch"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios"
import "./listvilla.scss"
import { BsFillPersonPlusFill } from "react-icons/bs";

const ListVilla = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    console.log(path)
    const [list, setList] = useState([]);
    const { data, loading, error } = useFetch(`/${path}`)
    useEffect(() => {
        setList(data)
    }, [data]);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/${path}/${id}`);
            setList(list.filter((item) => item._id !== id));
        } catch (err) { }
    };
    const handleUpdate = () => {
       
    };
    const [searchVilla, setSearchVilla] = useState("");
    const activeUser = JSON.parse(localStorage.getItem('user'))
    return (
        <div className="ListVillas">
            <div className="lu_actions">
                <input type="text" placeholder="Search for Villas" onChange={(e) => setSearchVilla(e.target.value)} />
                { (activeUser.authority.roleId==4 || activeUser.authority.roleId==3) && <Link to="/villas/addvilla"><BsFillPersonPlusFill/><span>Add New Villa</span></Link>}
            </div>
            <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell className="tableCell">Image</TableCell>
                            <TableCell className="tableCell">Villa Name</TableCell>
                            <TableCell className="tableCell">City</TableCell>
                            <TableCell className="tableCell">Location</TableCell>
                            <TableCell className="tableCell">Rating</TableCell>
                            <TableCell className="tableCell"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.filter((item) => {
                            return searchVilla.toLowerCase() === "" ?
                                item : item.name.toLowerCase().includes(searchVilla.toLowerCase()) ||
                                item.city.toLowerCase().includes(searchVilla.toLowerCase()) ||
                                item.location.toLowerCase().includes(searchVilla.toLowerCase()) 
                        })
                            .sort((a, b) =>
                                a.name > b.name ? 1: -1,
                            )
                            .map((item, i) => (
                                <TableRow key={item._id}>

                                    <TableCell className="tableCell">{i+1}</TableCell>
                                    <TableCell className="tableCell">{item.name}</TableCell>
                                    <TableCell className="tableCell">{item.city}</TableCell>
                                    <TableCell className="tableCell">{item.location}</TableCell>
                                    <TableCell className="tableCell">5</TableCell>
                                    <TableCell className="tableCell buttonContainer">
                                        <a className="btnDetail" href={`http://localhost:3000/villadetail/${item._id}`} target="_blank" rel="noopener noreferrer"><IoEyeSharp /></a>
                                        
                                        {
                                            activeUser.authority.roleId === 2 || activeUser.authority.roleId === 4 ? <Link to={`/villas/updatevilla/${item._id}`} className="btnUpdate"><BiEdit /></Link> : ""
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

export default ListVilla