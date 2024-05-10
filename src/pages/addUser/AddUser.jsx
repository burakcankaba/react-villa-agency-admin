import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUpload } from "react-icons/hi"
import axios from "axios";
import "./adduser.scss"

const AddUser = () => {

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const [authority, setAuthority] = useState({});

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
        setAuthority({
            roleId :value[0],
            roleName:name[0]
        })
      };
    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "talasoft")
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dqjrqyhfa/image/upload", data)
            const { url } = uploadRes.data;
            const newUser = {
                ...info,
                authority,
                img: url
            };
            await axios.post("/auth/register", newUser);
            navigate("/users")
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="add_new_user">
            <div className="userImg">
                <img
                    src={
                        file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                />
                <div className="imgUpload">
                    <label htmlFor="file"><HiOutlineUpload /> Upload a Photo</label>
                    <input type="file" id="file" className="fileInput" onChange={(e) => setFile(e.target.files[0])} />
                </div>
            </div>

            <div className="userInfos">
                <h3>Add New User</h3>
                <form>
                    <div>
                        <label>Name Surname</label>
                        <input id="name" type="text" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Username</label>
                        <input id="username" type="text" onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input id="email" type="text" onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input id="password" type="password" onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input id="startDate" type="date" onChange={handleChange}/>
                    </div>
                     <div>
                        <label>Authority</label>
                        <select  name="authority" onChange={handleSelect}>
                            <option value="User" id="1">User</option>
                            <option value="Reservation Department" id="2">Reservation Department</option>
                            <option value="Accountant" id="3">Accountant</option>
                            <option value="Administrator" id="4">Administrator</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={handleClick}>Send</button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default AddUser