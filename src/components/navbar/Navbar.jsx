import "./navbar.scss";
import QuickSearch from "../quickSearch/QuickSearch";

const Navbar = () => {

  return (
    <div className="navbar">


      <div className="search">
      <QuickSearch/>
      </div>
      <div className="items">
        <div className="item">
          English
        </div>
        <div className="item">
          <img
            src=""
            alt=""
            className="avatar"
          />
        </div>
      </div>
    </div>

  );
};

export default Navbar;
