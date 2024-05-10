import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.authority.roleId===4 || res.data.authority.roleId===3 || res.data.authority.roleId===2) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="bodyLogin">
      <div className="loginPage">
        <div className="lp_leftContainer">
          <img src="https://lh3.googleusercontent.com/p/AF1QipODgIwT3v6EnxsE_0LmK4FEVOCwwGW61V3t1KTF=s1360-w1360-h1020" alt="" />
        </div>
        <div className="lp_rightContainer">
          <div className="imgLogo">
            <img src="http://localhost:3001/Logos/1.png" alt="" />
          </div>
          <div className="infoLogin">
            <p>
              <b>TalaSoftware Yönetici Paneli</b> ile ilgili tüm sorunlarınız için info@talasoft.com'a mail gönderebilirsiniz.
            </p>
          </div>
          <div className="usernameLogin">
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="passwordLogin">
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="btnLogin">
            <button disabled={loading} onClick={handleClick} className="lButton">
              Login
            </button>
          </div>


          <div className="errMessage">{error && <span>{error.message}</span>}</div>

        </div>
      </div>
      
    </div>
  );
};

export default Login;