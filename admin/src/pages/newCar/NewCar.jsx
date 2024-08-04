import "./newCar.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewCar = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dac28izfi/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newCar = {
        ...info,
        photos: list,
      };

      const res = await axios.post("/cars/add", newCar);
      if (res) {
        toast.success("Car added successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error adding car");
    }
  };

  return (
    <div className="new">
      <ToastContainer />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Car</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Make</label>
                <input
                  id="make"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car make"
                />
              </div>

              <div className="formInput">
                <label>Model</label>
                <input
                  id="model"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car model"
                />
              </div>

              <div className="formInput">
                <label>Year</label>
                <input
                  id="year"
                  onChange={handleChange}
                  type="number"
                  placeholder="Year of manufacture"
                />
              </div>

              <div className="formInput">
                <label>Price per Day</label>
                <input
                  id="price_per_day"
                  onChange={handleChange}
                  type="number"
                  placeholder="Price per day"
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <textarea
                  id="description"
                  onChange={handleChange}
                  placeholder="Description"
                ></textarea>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCar;
