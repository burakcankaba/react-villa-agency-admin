import React, { useEffect, useState } from 'react'
import { HiOutlineUpload } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';
const LOCAL_GENERAL = "rooms"
const Rooms = (props) => {

    const room = {
        desc: "",
        img: []
    }
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
    const onSelectFile = (event, index) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        const { name } = event.target;
        const list = [...rooms];
        list[index][name] = imagesArray;
        setRooms(list)
        // FOR BUG IN CHROME
        event.target.value = "";
    };
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
                        <input type="text" name="desc" id="desc" value={props.value.rooms[i].desc} onChange={(e) => handleRoomChange(e, i)} />
                    </div>
                    <div className="imgUpload">
                        <label htmlFor={`file${i}`}><HiOutlineUpload /> Upload a Photo</label>
                        <input type="file" name="img" id={`file${i}`} multiple className="fileInput" accept="image/png , image/jpeg, image/webp" onChange={(e) => onSelectFile(e, i)} />
                    </div>
                    <div className='roomImg'>
                        {
                            props.value.rooms[i].img.map((item,i)=>(
                                <img key={i} src={item} alt="" />
                            ))
                            
                        }
                    </div>
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

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Rooms