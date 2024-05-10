import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import "./features.scss"
const LOCAL_GENERAL = "features";
const facilitiesList = ["Television", "Barbecue", "Parking", "Internet", "Fireplace", "Iron", "Balcony", "Jacuzzi", "Sunbed", "Umbrella", "Airconditioner", "Tennis Table"];
const Features = (props) => {
    const { id } = useParams();
    const [addRules, setAddRules] = useState(props.value.rules);
    const [addProps, setAddProps] = useState(props.value.props);
    const [addPool, setAddPool] = useState(props.value.pool);
    const [checkedFacilities, setCheckedFacilities] = useState(props.value.facilities);

    
    const handleRulesChange = (e) => {
        setAddRules((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handlePropsChange = (e) => {
        setAddProps((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handlePoolChange = (e) => {
        setAddPool((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const [info, setInfo] = useState(props.value);
    useEffect(() => {
        setInfo((prev) => ({ ...prev, rules: addRules }));
    }, [addRules]);
    useEffect(() => {
        setInfo((prev) => ({ ...prev, props: addProps }));
    }, [addProps]);
    useEffect(() => {
        setInfo((prev) => ({ ...prev, pool: addPool }));
    }, [addPool]);
    useEffect(() => {
        setInfo((prev) => ({ ...prev, facilities: checkedFacilities }));
    }, [checkedFacilities]);

    console.log(info)

    const handleCheck = (event) => {
        let updatedList = [...checkedFacilities];

        if (event.target.checked) {
            updatedList = [...checkedFacilities, event.target.value];
        } else {
            updatedList.splice(checkedFacilities.indexOf(event.target.value), 1);
        }
        setCheckedFacilities(updatedList);
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const updateFeatures = {
            ...info
          };
    
          await axios.put("/villas/" + id, updateFeatures)
          .then(response => {
            if (response.status === 200) {
              alert('Villa Features successfully updated.');
            }
          })
        } catch (err) { console.log(err) }
      }
    return (
        <div className="features">
            <div className="rules">
                <div className="featuresNote">
                    <h3>Villa Rules</h3> <span> Villa rules apply only to this villa.</span>
                </div>
                <div className="ruleInfos">
                    <div>
                        <label>Check-in Time:</label>
                        <input type="type" placeholder="Example 16:00" id="checkinTime" value={info.rules && info.rules.checkinTime} onChange={handleRulesChange} />
                    </div>
                    <div>
                        <label>Check-out Time:</label>
                        <input type="type" placeholder="Example 10:00" id="checkoutTime" value={info.rules && info.rules.checkoutTime} onChange={handleRulesChange} />
                    </div>
                    <div>
                        <label>Deposit:</label>
                        <input type="type" placeholder="Deposit Fee" id="deposit" value={info.rules && info.rules.deposit} onChange={handleRulesChange} />
                    </div>
                    <div>
                        <label>Cleaning:</label>
                        <input type="type" placeholder="Cleaning Fee" id="cleaningFee" value={info.rules && info.rules.cleaningFee} onChange={handleRulesChange} />
                    </div>
                    <div className="notHalfDiv">
                        <label>Included in Price:</label>
                        <input type="type" placeholder="Enter Included in Price" id="includeInPrice" value={info.rules && info.rules.includeInPrice} onChange={handleRulesChange} />
                    </div>

                </div>
            </div>
            <div className="props">

                <div className="featuresNote">
                    <h3>Villa Properties</h3> <span> It shows how many people can stay in the villa, the number of rooms, bathrooms and beds.</span>
                </div>
                <div className="propInfos">
                    <div>
                        <span>People:</span>
                        <input type="type" placeholder="Only Number" id="personCount" value={info.props && info.props.personCount} onChange={handlePropsChange} />
                    </div>
                    <div>
                        <span>Rooms:</span>
                        <input type="type" placeholder="Only Number" id="bedRoomCount" value={info.props && info.props.bedRoomCount} onChange={handlePropsChange} />
                    </div>
                    <div>
                        <span>Bathrooms:</span>
                        <input type="type" placeholder="Only Number" id="bathRoomCount" value={info.props && info.props.bathRoomCount} onChange={handlePropsChange} />
                    </div>
                    <div>
                        <span>Beds:</span>
                        <input type="type" placeholder="Only Number" id="bedCount" value={info.props && info.props.bedCount} onChange={handlePropsChange} />
                    </div>

                </div>
            </div>
            <div className="facilities">

                <div className="featuresNote">
                    <h3>Facilities</h3> <span> Select the facilities available in the villa. It will appear directly on the site.</span>
                </div>
                <div className="facilitiesList">
                    {
                        facilitiesList.map((item, i) => (
                            <label key={i}>
                                <input value={item} type="checkbox" defaultChecked={info.facilities.includes(item)} onChange={handleCheck} />
                                <span>{item}</span>
                            </label>
                        ))
                    }
                </div>
            </div>
            <div className="isPool">

                <div className="featuresNote">
                    <h3>Pool</h3> <span> Is there a pool in the villa? If there is a pool, the information appears on the site.</span>
                </div>
                <div className="poolInfos">
                    <label>
                        <input type="checkbox" />
                        <span>This villa has a pool.</span>
                    </label>

                    <div>
                        <span>Height:</span>
                        <input type="type" id="height" value={info.pool.height} onChange={handlePoolChange} />
                        <span>m</span>
                    </div>
                    <div>
                        <span>Width:</span>
                        <input type="type" id="width" value={info.pool.width} onChange={handlePoolChange} />
                        <span>m</span>
                    </div>
                    <div>
                        <span>Depth:</span>
                        <input type="type" id="depth" value={info.pool.depth} onChange={handlePoolChange} />
                        <span>m</span>
                    </div>

                </div>
            </div>
            <button className='updateBtn' onClick={handleUpdate}><FiEdit/> Update</button>
        </div>
    )
}

export default Features