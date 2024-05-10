import "./addvilla.scss"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import General from "../../components/addNewVilla/general/General";
import Photos from "../../components/addNewVilla/photos/Photos";
import Features from "../../components/addNewVilla/features/Features";
import Rooms from "../../components/addNewVilla/rooms/Rooms";
import Distances from "../../components/addNewVilla/distances/Distances";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PricePeriods from "../../components/addNewVilla/pricePeriods/PricePeriods";
import Map from "../../components/addNewVilla/map/Map";

const AddVilla = () => {
  const [addImg, setAddImg] = useState([]);
  const [addGeneral, setAddGeneral] = useState({});
  const [addFeatures, setAddFeatures] = useState({});
  const [addRooms, setAddRooms] = useState({})
  const [addPP, setAddPP] = useState({})
  const [addDistances, setAddDistances] = useState({})
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };
  const navigate = useNavigate();
 
  const getImgArray = (img)=>{
    setAddImg(img)
  }
  const getGeneralInfo = (info)=>{
    setAddGeneral(info)
  }
  const getFeaturesInfo = (info)=>{
    setAddFeatures(info)
  }
  const getRoomsInfo = (info)=>{
    setAddRooms(info)
  }
  const getPPInfo = (info)=>{
    setAddPP(info)
  }
  const getDistanceInfo = (info)=>{
    setAddDistances(info)
  }
  
  ///save method
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newVilla = {
    
        ...addGeneral,
        ...addFeatures,
        rooms:addRooms,
        photos:addImg,
        prices:addPP,
        distances:addDistances
      };
      
      await axios.post("/villas", newVilla)
    } catch (err) {console.log(err)}

     localStorage.removeItem("features");
     localStorage.removeItem("general");
     localStorage.removeItem("photos");
     localStorage.removeItem("rooms");
     localStorage.removeItem("pricePeriods");
     localStorage.removeItem("distances");
    navigate("/villas")
  }
  return (
    <div className="addVilla">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Photos" {...a11yProps(1)} />
            <Tab label="Features" {...a11yProps(2)} />
            <Tab label="Rooms" {...a11yProps(3)} />
            <Tab label="Distances" {...a11yProps(4)} />
            <Tab label="Price Periods" {...a11yProps(5)} />
            <Tab label="Map" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>

          <General getGeneralInfo={getGeneralInfo}/>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(1)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Photos  getImgArray={getImgArray}/>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(2)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Features getFeaturesInfo = {getFeaturesInfo}/>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(3)}>NEXT</button>
          </div>

        </TabPanel>
        <TabPanel value={value} index={3}>
          <Rooms getRoomsInfo={getRoomsInfo}/>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(4)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Distances getDistanceInfo={getDistanceInfo}/>
          <div className="nextStepBtn">

            <button className="buttonNext" onClick={() => setValue(5)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <PricePeriods getPPInfo={getPPInfo}/>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(6)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Map/>
          <div className="nextStepBtn">
            <button className="buttonSave" onClick={handleSave}>SAVE</button>
          </div>

        </TabPanel>

      </Box>
    </div>
  )
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
export default AddVilla