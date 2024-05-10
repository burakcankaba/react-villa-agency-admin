import "./sidebar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { BsFillBasket3Fill, BsFillPeopleFill, BsSuitHeartFill } from "react-icons/bs";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaHome, FaMoneyBillAlt } from "react-icons/fa";
import { AiFillBank, AiFillCar } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
import {  BiWorld } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { RiArrowDownSFill } from "react-icons/ri"

const Sidebar = () => {
  const { loading, error, dispatch } = useContext(AuthContext);
  const activeUser = JSON.parse(localStorage.getItem('user'))
  const [openMenuVilla,setOpenMenuVilla] = useState(false);
  const [openMenuRes,setOpenMenuRes] = useState(false);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="/logo.png" alt="" />
        </Link>
      </div>
      <div className="center">
        <div className="loggedTeamMember">
          <div className="ltm_img">
            <img src={activeUser.img[0]} alt={activeUser.name} />
            <span></span>
          </div>
          <div className="ltm_info">
            <h4>{activeUser.name}</h4>
            <span>{activeUser.authority.roleName}</span>
          </div>
        </div>
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to="/">
              <MdDashboard />
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
        <ul>
          <p className="title">MANAGE</p>
          <li>
            <div onClick={()=>setOpenMenuRes(!openMenuRes)}>
              <div>
                <BsFillBasket3Fill />
                <span>Reservations</span>
              </div>
              <RiArrowDownSFill/>
            </div>
            <ul className={`${openMenuRes ? "openedMenu":""}`}>
              <li><Link to="/reservation"><FiPlusSquare/><span>Reservation List</span></Link></li>
              <li><Link to="/"><FiPlusSquare/><span>Manuel Reservation</span></Link></li>
            </ul>
          </li>
          <li>
            <Link to="/">
              <BsFillPeopleFill />
              <span>Clients</span>
            </Link>
          </li>


          <li>
            <div onClick={()=>setOpenMenuVilla(!openMenuVilla)}>
              <div>
                <FaHome />
                <span>Villas</span>
              </div>
              <RiArrowDownSFill/>
            </div>
            <ul className={`${openMenuVilla ? "openedMenu":""}`}>
              <li><Link to="/villas"><FiPlusSquare/><span>List Villas</span></Link></li>
              <li><Link to="/villas/addvilla"><FiPlusSquare/><span>New Villa</span></Link></li>
              <li><Link to="/villas/addlocations"><FiPlusSquare/><span>Villa Locations</span></Link></li>
              <li><Link to="/villas/addfacilities"><FiPlusSquare/><span>Villa Facilities</span> </Link></li>
              <li><Link to="/villas/ownerrequest"><FiPlusSquare/><span>Villa Owners Requests</span> </Link></li>
              

            </ul>
          </li>
          <li>
            <Link to="/">
              <AiFillCar />
              <span>Transfer</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <BiWorld />
              <span>Tour</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaHome />
              <span>Hotel</span>
            </Link>
          </li>


          <li>
            <Link to="/users">
              <BsSuitHeartFill />
              <span>Tala Team</span>
            </Link>
          </li>
        </ul>
        <ul>
          <p className="title">accounting</p>
          <li>
            <Link to="/">
              <BsFillPeopleFill />
              <span>Clients</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <AiFillBank />
              <span>Bank Informations</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaMoneyBillAlt />
              <span>Cash Bank</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <IoDocumentText />
              <span>Documents</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li className="logout" onClick={() => dispatch({ type: "LOGOUT" })}>
            <MdLogout />
            <span>Logout</span>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
