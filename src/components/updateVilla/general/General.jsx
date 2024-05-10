import { useState } from 'react'
import "./general.scss"
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import {FiEdit} from "react-icons/fi"

const General = (props) => {
  
  const [info, setInfo] = useState(props.value)

  const { id } = useParams();

  useEffect(()=>{
    setInfo(info)
  },[id])


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };



  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.id
    );
    const name = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setInfo((prev) => ({ ...prev, [value]: name[0] }));
  };
  useEffect(() => {
    props.getGeneralInfo(info)
  }, [info])


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateGeneral = {
        ...info
      };

      await axios.put("/villas/" + id, updateGeneral)
      .then(response => {
        if (response.status === 200) {
          alert('Villa successfully updated.');
        }
      })
    } catch (err) { console.log(err) }
  }
  return (
    <>
      <div className="general">
        <div>
          <label>Villa Name</label>
          <input type="text" id='name' value={info.name} onChange={handleChange} />
        </div>
        <div>
          <label>City</label>
          <select name="city" onChange={handleSelect} value={info.city}>
            <option>Select</option>
            <option value="Muğla" id="city" >Muğla</option>
            <option value="Antalya" id="city">Antalya</option>
            <option value="İstanbul" id='city'>İstanbul</option>
            <option value="İzmir" id='city'>İzmir</option>
          </select>
        </div>
        <div>
          <label>Town</label>
          <select name="location" onChange={handleSelect} value={info.location}>
            <option>Select</option>
            <option value="Fethiye" id='location'>Fethiye</option>
            <option value="Marmaris" id='location'>Marmaris</option>
          </select>
        </div>
        <div>
          <label>District</label>
          <select name="sublocation" onChange={handleSelect} value={info.sublocation}>
            <option>Select</option>
            <option value="Hisaronu" id='sublocation'>Hisarönü</option>
            <option value="Calis" id='sublocation' >Çalış</option>
          </select>
        </div>
        <div>
          <label>Short Description</label>
          <input type="text" id='shortdesc' value={info.shortdesc} onChange={handleChange} />
        </div>
        <div>
          <label>Description</label>
          <textarea id='desc' value={info.desc} onChange={handleChange} placeholder="Text something about villa" />
        </div>
      </div>
      <button className='updateBtn' onClick={handleUpdate}><FiEdit/> Update</button>
      
    </>
  )
}

export default General