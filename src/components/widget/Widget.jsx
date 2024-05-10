import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "Clients",
        isMoney: false,
        link: "See all clients",
        toLink:"/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Reservations",
        isMoney: false,
        link: "View all reservations",
        toLink:"/reservations",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        toLink:"/",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        toLink:"/",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link"><Link to={data.toLink}>{data.link}</Link></span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
