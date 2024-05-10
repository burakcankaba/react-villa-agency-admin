import { useEffect, useState } from 'react'
import "./map.scss"
const LOCAL_GENERAL = "mapCoor";
const Map = () => {


  const [position, setPosition] = useState(JSON.parse(window.localStorage.getItem(LOCAL_GENERAL)) || []);

  const handleMapCoor = (e) => {
    setPosition((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  console.log(position)
  useEffect(() => {
    localStorage.setItem(LOCAL_GENERAL, JSON.stringify(position));
  }, [position]);
  return (
    <>
      <div className="mapCoordinats">
        <div>
          <label>Latitude:</label>
          <input type="text" placeholder="Latitude Coordinat" name="0" id='lat' value={position.lat} onChange={handleMapCoor} autocomplete="off"/>
        </div>
        <div>
          <label>Longitude:</label>
          <input type="text" placeholder="Longitude Coordinat" name="1" id='long' value={position.long} onChange={handleMapCoor} autocomplete="off"/>
        </div>
      </div>
    </>
  )
}

export default Map