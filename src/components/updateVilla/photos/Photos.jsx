import axios from 'axios';
import { useEffect, useState } from 'react'
import { BsCheck, BsUpload } from 'react-icons/bs'
import { useParams } from "react-router-dom";
import "./photos.scss"

const Photos = (props) => {
    const { id } = useParams();
    const [img, setImg] = useState(props.value.photos);
    console.log(img)
    const [files, setFiles] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    
    const handleSavePhotos = async (e) => {
        e.preventDefault();
        try {
            const list = await Promise.all(

                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "talasoft");
                    setIsLoading(true)

                    console.log(data)
                    const uploadRes = await axios.put(
                        "https://api.cloudinary.com/v1_1/dqjrqyhfa/image/upload",
                        data
                    )
                    setIsLoading(false)
                    
                    const { url } = uploadRes.data;
                    return url;
                })
            );

            setImg(list)

        } catch (err) { console.log(err) }
    }
    const handleUpdatePhotos = async (e) => {
        e.preventDefault();
        try {
            const updatePhotos = {
                photos:img
            };

            await axios.put("/villas/" + id, updatePhotos)
        } catch (err) { console.log(err) }
        
    }
    useEffect(() => {
        props.getImgArray(img)
    }, [img])

    return (
        <div className="photosAdd">
            <ul>
                <li><BsCheck />The file you will upload should be a maximum of 3MB.</li>
                <li><BsCheck />Only file types (JPG, GIF, PNG) are allowed. You cannot install other than these extensions.</li>
                <li><BsCheck />You will not have completed the installation process without pressing the upload button of the selected files.</li>
            </ul>

            <div className="photosArrayInfo">
                {files.length} photos ready for upload.
            </div>
            <div className='photosArrWrap'>
                {
                    files.length === 0 &&
                    <div className='photoUploadBtn'>
                        <label htmlFor="multipleImg" className="uploadLabel">
                            <BsUpload></BsUpload>
                            Select Photos
                        </label>
                        <input type="file" name="img" id="multipleImg" multiple className="multipleImg" accept="image/png , image/jpeg, image/webp" onChange={(e) => setFiles(e.target.files)} />
                    </div>
                }
                {
                    files.length > 0 &&
                    <>
                        <div className='photosSaveBtn'>
                            <button onClick={handleSavePhotos}>
                                <BsUpload></BsUpload>
                                Upload Photos
                            </button>
                        </div>
                        <div className='photosUpdateBtn'>
                            <button onClick={handleUpdatePhotos}>
                                <BsUpload></BsUpload>
                                Update Photos
                            </button>
                        </div>
                    </>}
            </div>

            <div className="photosArray">

                {
                    img && img.map((item, i) => (
                        <img key={i} src={item} alt="" />
                    ))

                }
            </div>



        </div>
    )
}

export default Photos