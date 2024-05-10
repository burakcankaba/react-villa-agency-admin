import React, { useEffect, useState } from 'react'
import { HiOutlineUpload } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';
import { BsUpload } from 'react-icons/bs';
import axios from "axios"
import "./distances.scss"
const LOCAL_GENERAL = "distances"
const Distances = (props) => {
  const [files, setFiles] = useState("");
  const distance = {
    title:"",
    desc: "",
    img: []
  }
  const [isLoading, setIsLoading] = useState(false)
  const [distances, setDistances] = useState(JSON.parse(window.localStorage.getItem(LOCAL_GENERAL)) || [distance]);
  useEffect(() => {
    localStorage.setItem(LOCAL_GENERAL, JSON.stringify(distances));
}, [distances]);
  const handleSetDistances = () => {
    setDistances([...distances, distance])
  }
  const handleDistanceRemove = (index) => {
    const list = [...distances];
    list.splice(index, 1);
    setDistances(list);
  };
  const handleDistanceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...distances];
    list[index][name] = value;
    setDistances(list);
  };

  const handleSavePhotos = async (e, i) => {
    e.preventDefault();
    setFiles(e.target.files)
    try {

      const list = await Promise.all(

        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "talasoft");
          setIsLoading(true)
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dqjrqyhfa/image/upload",
            data
          );
          setIsLoading(false)


          const { url } = uploadRes.data;
          return url;
        })
      );

      const img = "img";
      const listFull = [...distances];
      listFull[i][img] = list;
      setDistances(listFull)

    } catch (err) { console.log(err) }
  }
  useEffect(() => {
    props.getDistanceInfo(distances)
}, [distances])
  return (
    <div className="distances">
      <div className="distanceAdd">
        <button onClick={handleSetDistances}>Add Distance</button>
      </div>
      {distances && distances.map((item, i) => (

        <div key={i} className="distance">
          <div className="distanceTitle">
            <h3><input type="text" name="title" id="title" placeholder='Enter Distance Title' value={item.title} onChange={(e) => handleDistanceChange(e, i)} /></h3><div onClick={() => handleDistanceRemove(i)}><MdDeleteForever /></div>
          </div>
          <div className="distanceInfo">
            <input type="text" name="desc" id="desc" value={item.desc} placeholder='Enter Distance Description' onChange={(e) => handleDistanceChange(e, i)} />
          </div>

          <div className='imgBtnGroup'>
            <div className="imgUpload">
              <label htmlFor={`file${i}`}><HiOutlineUpload /> Select Photos</label>
              <input type="file" name="img" id={`file${i}`} multiple className="fileInput" accept="image/png , image/jpeg, image/webp" onChange={(e) => setFiles(e.target.files)} />
            </div>
            {files && <div className="uploadBtn">
              <button onClick={(e) => handleSavePhotos(e, i)}>
                <BsUpload></BsUpload>
                Upload Photos
              </button>
            </div>}
          </div>
          {isLoading ?

            <div>
              Loading
            </div>
            :
            <div className="distanceImg">
              {item.img &&
                (item.img).map((image, index) => {
                  return (
                    <div key={image} className="image">
                      <img src={image} alt="upload" />
                      {/* <button onClick={() => deleteHandler(image,index)}>
                            <MdDeleteForever />
                          </button> */}
                    </div>
                  );
                })}

            </div>}
        </div>
      ))}
    </div>
  )
}

export default Distances