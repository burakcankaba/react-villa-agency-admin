import "./updatevilla.scss"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import General from "../../components/updateVilla/general/General";
import Photos from "../../components/updateVilla/photos/Photos";
import Features from "../../components/updateVilla/features/Features";
import Rooms from "../../components/updateVilla/rooms/Rooms";
import Distances from "../../components/updateVilla/distances/Distances";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js"

const UpdateVilla = () => {
  const {id} = useParams();
  const { data, loading, error, reFetch } = useFetch(`/villas/find/${id}`)
  const [addImg, setAddImg] = useState([]);
  const [addGeneral, setAddGeneral] = useState({});
  const [addFeatures, setAddFeatures] = useState({});
  const [addRooms, setAddRooms] = useState({})
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
  
  ///save method
  return (
    <div className="updatevilla">
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

          <General getGeneralInfo={getGeneralInfo} value={data}/>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(1)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Photos  getImgArray={getImgArray} value={data}/>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(2)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Features getFeaturesInfo = {getFeaturesInfo} value={data}/>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(3)}>NEXT</button>
          </div>

        </TabPanel>
        <TabPanel value={value} index={3}>
          <Rooms getRoomsInfo={getRoomsInfo} value={data}/>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(4)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Distances />
          <div className="nextStepBtn">

            <button className="buttonNext" onClick={() => setValue(5)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <div className="nextStepBtn">
            <button className="buttonNext" onClick={() => setValue(6)}>NEXT</button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={6}>

          <div className="nextStepBtn">
            <button className="buttonSave" >SAVE</button>
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
export default UpdateVilla