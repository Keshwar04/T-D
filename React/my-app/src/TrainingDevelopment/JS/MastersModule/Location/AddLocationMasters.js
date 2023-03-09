import Sidebar from "../../../Sidebar/Sidebar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddLocationMasters = () => {
  const [location, setLocation] = useState({});

  let navigate = useNavigate();

  var currentDate = new Date().toLocaleDateString().replaceAll("/", "-");
  console.log(currentDate);

  //trainer
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
      status: "ACTIVE",
      date: currentDate,
      updateDate: currentDate,
      createdBy: "Admin",
    });
    console.log(name, value);
  };

  const handleLocationSubmit = async () => {
    console.log(location);
    try {
      if (location.city && location.state) {
        let response = await axios.post(
          "http://localhost:8080/sendLocationDetails",
          location
        );
        console.log(response);
        Swal.fire({
          title: "Successfully submitted!",
          text: "Click ok to See details!",
          icon: "success",
          customClass: "swal-size-sm",
        }).then(() => {
          navigate("/getLocationMasters");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="scheduleAlign">Master's Location</div>
      <div
        className="scheduleAlign leftSched leftLoc"
        onClick={() => navigate("/getLocationMasters")}
      >
        Master's Location &#62;
      </div>
      <div className="scheduleAlign schedLeft leftLocs">&nbsp;Add Location</div>
      <div
        className="shadowBox position"
        style={{
          paddingLeft: "13px",
          paddingRight: "15px",
          width: "83%",
          height: "500px",
        }}
      >
        <div className="mt-4 ms-3 required">
          Enter the required information below to add a new location.
        </div>
        <div className="mt-4 ms-3 addBatch">Add Location</div>
        <div className="row ">
          <div className="col-md-4 form-floating">
            <input
              className="form-control ms-3 mt-2 filedSize fontAdjust"
              placeholder="City"
              name="city"
              onChange={handleLocationChange}
              value={location.city || ""}
            />
            <label className="floatCity">City</label>
          </div>
          <div className="col-md-4 form-floating">
            <input
              className="form-control mt-2 filedSize fontAdjust"
              placeholder="State"
              name="state"
              onChange={handleLocationChange}
              value={location.state || ""}
            />
            <label className="floatSate">State</label>
          </div>
          <div className="col-md-4 subButtAdjust">
            <button
              className="submitBlueButt locSubmit"
              onClick={handleLocationSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocationMasters;
