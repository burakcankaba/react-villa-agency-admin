import React, { useEffect, useState } from 'react'
const LOCAL_GENERAL = "distances";
const Distances = () => {
  const distanceObj = [{
    name: "City Center",
    value: ""
  },
  {
    name: "Airport",
    value: ""
  },
  {
    name: "Beaches",
    value: ""
  },
  {
    name: "Hospital",
    value: ""
  },
  {
    name: "Market",
    value: ""
  }
  ]
  

  const [distObj, setDistObj] = useState(distanceObj);

  const [checkedPanel, setCheckedPanel] = useState([]);

  const handleCheckedDistance = (e) => {
    const { checked, name } = e.target;
    if (checked) setCheckedPanel((prevState) => [...prevState, name]);
    else setCheckedPanel((prevState) => prevState.filter(x => x !== name));
  }
  const filteredPanel = distObj.filter(({ name }) => checkedPanel.includes(name))

  return (
    <div className="distances">
      <div className="distanceTitleList">
        {
          distanceObj && distanceObj.map((item, i) => (

            <label className="distanceTitle" key={i}>
              <input type="checkbox" value={item.name} name={item.name} onChange={handleCheckedDistance} />
              {item.name}
            </label>

          ))
        }
      </div>
      <div className="distanceList">
        {
          filteredPanel && filteredPanel.map((item, i) => (

            <div className="distance" key={i}>
              <h3> {item.name}</h3>
              <input type="text" id='distance'   placeholder={`Enter the distance from  ${item.name}`} />
            </div>
          ))

        }
      </div>



    </div>
  )
}

export default Distances