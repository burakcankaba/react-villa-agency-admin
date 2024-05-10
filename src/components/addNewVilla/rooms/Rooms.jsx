import React, { useEffect, useState } from 'react'
import { HiOutlineUpload } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';
import { BsUpload } from 'react-icons/bs';
import axios from "axios"
import "./rooms.scss"
const LOCAL_GENERAL = "rooms"
const Rooms = (props) => {
    const [files, setFiles] = useState("");
    const room = {
        desc: "",
        img: []
    }
    const [isLoading, setIsLoading] = useState(false)
    const [rooms, setRooms] = useState(JSON.parse(window.localStorage.getItem(LOCAL_GENERAL)) || [room]);
    useEffect(() => {
        localStorage.setItem(LOCAL_GENERAL, JSON.stringify(rooms));
    }, [rooms]);
    const handleSetRooms = () => {
        setRooms([...rooms, room])
    }
    const handleRoomRemove = (index) => {
        const list = [...rooms];
        list.splice(index, 1);
        setRooms(list);
    };
    const handleRoomChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...rooms];
        list[index][name] = value;
        setRooms(list);
    };
    // const onSelectFile = (event, index) => {
    //     const selectedFiles = event.target.files;
    //     const selectedFilesArray = Array.from(selectedFiles);
    //     const imagesArray = selectedFilesArray.map((file) => {
    //         return URL.createObjectURL(file);
    //     });
    //     const { name } = event.target;
    //     const list = [...rooms];
    //     list[index][name] = imagesArray;
    //     setRooms(list)
    //     // FOR BUG IN CHROME
    //     event.target.value = "";
    // };

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
            const listFull = [...rooms];
            listFull[i][img] = list;
            setRooms(listFull)

        } catch (err) { console.log(err) }
    }
    console.log(rooms)
    useEffect(() => {
        props.getRoomsInfo(rooms)
    }, [rooms])
    return (
        <div className="rooms">
            <div className="roomAdd">
                <button onClick={handleSetRooms}>Add Room</button>
            </div>
            {rooms && rooms.map((item, i) => (

                <div key={i} className="room">
                    <div className="roomNote">
                        <h3>{i + 1}. Bedroom</h3><div onClick={() => handleRoomRemove(i)}><MdDeleteForever /></div>
                    </div>
                    <div className="roomInfo">
                        <label>Room Description: </label>
                        <input type="text" name="desc" id="desc" value={item.desc} onChange={(e) => handleRoomChange(e, i)} />
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
                        <div className="roomImg">
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

export default Rooms