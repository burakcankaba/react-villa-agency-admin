import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";

import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Layout from "./layout/Layout";
import AddVilla from "./pages/addVilla/AddVilla";
import AddUser from "./pages/addUser/AddUser";
import UpdateVilla from "./pages/updateVilla/UpdateVilla";
import VillaLocation from "./pages/villaLocation/VillaLocation";
import ReservationList from "./pages/reservation/ReservationList";
import ReservationDetail from "./pages/reservation/ReservationDetail";
import OwnerRequest from "./pages/ownerRequest/OwnerRequest";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute =({children})=>{
    const {user} = useContext(AuthContext)
    if(!user){
      return <Navigate to="/talasoft"></Navigate>
    }
    return children;
  }
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
      
        <Routes>
          <Route path="/">
            <Route path="talasoft" element={<Login />} />
            <Route index element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
            <Route path="users">
              <Route index element={<ProtectedRoute><Layout><List comp="ListUser"/></Layout></ProtectedRoute>} />
              <Route path=":userId" element={<Layout><Single /></Layout>} />
              <Route
                path="adduser"
                element={<Layout><AddUser/></Layout>}
              />
            </Route>
            <Route path="villas">
              <Route index element={<ProtectedRoute><Layout><List comp="ListVilla"/></Layout></ProtectedRoute>} />
              <Route
                path="addvilla"
                element={<ProtectedRoute><Layout><AddVilla/></Layout></ProtectedRoute>}
              />
              <Route
                path="updatevilla/:id"
                element={<ProtectedRoute><Layout><UpdateVilla/></Layout></ProtectedRoute>}
              />
              <Route
                path="addlocations"
                element={<ProtectedRoute><Layout><VillaLocation/></Layout></ProtectedRoute>}
              />
              <Route
                path="ownerrequest"
                element={<ProtectedRoute><Layout><OwnerRequest/></Layout></ProtectedRoute>}
              />
            </Route>
            <Route path="reservation">
              <Route index element={<ProtectedRoute><Layout><ReservationList /></Layout></ProtectedRoute>} />
              <Route path="detail/:id" element={<ProtectedRoute><Layout><ReservationDetail /></Layout></ProtectedRoute>} />
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
