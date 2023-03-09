import "../../CSS/TrainingModule/EditTraining.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import {MdOutlineSchedule} from "react-icons/md";
import { RiDashboardLine, RiMastercardLine } from "react-icons/ri";
import { TbBook } from "react-icons/tb";
import { VscTasklist } from "react-icons/vsc";
import { MdOutlineGroups } from "react-icons/md";
import { BsPerson, BsCalendar2Day, BsListTask } from "react-icons/bs";
import { TiArrowSortedDown } from 'react-icons/ti';

const EditTraining = () => {
  const [update, setUpdate] = useState({});
  const [value, setValue] = useState({});
  const [training, setTraining] = useState([]);
  const [show,setShow] = useState(false)
  //const hhh =localStorage.getItem("Details")
  //console.log(hhh);
  const navigate = useNavigate();

  const goToTrainingComp = () => {
    navigate("/training");
  };
  const goToEmpComp = () => {
    navigate("/get");
  };

  useEffect(() => {
    localStorageData();
    trainingListDetails();
  }, []);

  const localStorageData = () => {
    const data = JSON.parse(localStorage.getItem("Details"));
    setUpdate(data);
    console.log(data);
  };

  ///onChange
  const targetIpValue = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUpdate((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  ///location SELECT tag
  const trainingListDetails = () => {
    axios.get("http://localhost:8080/training").then((response) => {
      const data = [];
      for (var i = 0; i < response.data.training.length; i++) {
        const { training } = response.data.training[i];
        data.push(training);
      }
      setTraining(data);
    });
  };

  ///update
  const updateDetails = () => {
    const id = update.id;
    console.log(update);
    axios
      .put(`http://localhost:8080/trainingUpdateDetails/${id}`, update)
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          title: "Well Done!",
          text: "Training details has been updated successfully",
          icon: "success",
          customClass: "swal-size-sm",
          confirmButtonColor: "orange",
          confirmButtonText: "continue",
        }).then(()=>{
          navigate('/training')
        })
      });
  };

  return (
    <div>
      <div className="colorAdjust">Training and Development</div>
      <div style={{ marginLeft: "-22px", marginTop: "-32px" }}>
        <div style={{ display: "flex" }}>
          <button className="FAsButton">FA</button>
          <div className="bToT"> FA SOFTWARE </div>
        </div>
        <div className="service">SERVICES PVT.LTD</div>
        <div className="fly">Fly Ahead</div>
      </div>
      <div style={{ backgroundColor: "#F9FAFE", marginTop: "13px" }}>
        <div style={{ display: "flex" }}>
          <div className="blue">
          <div className='assiTra marAssLefit' onClick={()=>navigate('/training')}>Assigned&nbsp;Training&nbsp;&#62;</div>
            <div className='addTrains marProfileLeft'>&nbsp;Profile</div>
            <div style={{ width: "150px",marginTop:'-29px' }} className="empHead">
              Assign Training
            </div>
            <div className="ltoF colors">
              Edit Training
              <div className="blur mb-3">
                Enter the required information below to update employee Profile
              </div>
              <div className="row">
                <div className="col-4 form-floating">
                  <input style={{ width: "320px",height:'40px' }} id='important' name="empId" className="form-control" 
                    onChange={targetIpValue}value={update.empId || ""}/>
                    <label className="sTimeLabel IdLAlign">Emp ID</label>
                </div>
                <div className="col-4 form-floating">
                  <input style={{ width: "320px",height:'40px' }} id='importan' name="empName" className="form-control"
                    onChange={targetIpValue} value={update.empName || ""}/>
                    <label className="sTimeLabel IdLAlign">Emp Name</label>
                </div>
                <div className="col-4 form-floating">
                  <select style={{ width: "320px", marginBottom: "40px",height:'40px',fontSize:'14px'}} name="trainingName" 
                    id="importan" className="form-select" onChange={targetIpValue} value={update.trainingName || ""}>
                    {training.map((data, i) => {
                      return (
                        <option key={i} value={data}>{data}</option>
                      );
                    })}
                  </select>
                  <label className="sTimeLabel IdLAlign">Training Name</label>
                </div>
              </div>
              <div className="row">
                <div className="col-4 form-floating">
                  <input type={"date"} style={{width: "320px",height:'40px'}} name="TSDate" id='important' className="form-control"
                    value={update.TSDate || ""} onChange={targetIpValue}/>
                  <label className="sTimeLabel IdLAlign">Training Start Date</label>
                </div>
                <div className="col-4 form-floating">
                  <input type={"date"} style={{width: "320px",marginLeft: "1px",height:'40px'}} name="TEDate" id="important"
                    className="form-control" value={update.TEDate || ""} onChange={targetIpValue}/>
                  <label className="sTimeLabel IdLAlign">Training End Date</label>
                </div>
                <div className="col-4 form-floating">
                  <select style={{ width: "320px", marginBottom: "40px",height:'40px',fontSize:'14px' }} name="status"
                    className="form-select fieldAlign" onChange={targetIpValue} value={update.status || ''}>
                   <option>Assigned</option>
                   <option>Non-Assigned</option>
                  </select>
                  <label className="sTimeLabel IdLAlign">Status</label>
                </div>
              </div>
              <button
                style={{ marginLeft: "350px", marginTop: "230px" }}
                className="discardButt"
                onClick={() => {
                  setUpdate("");
                }}
              >
                Discard
              </button>
              <button
                style={{ marginTop: "95px", marginLeft: "25px" }}
                className="submitButt"
                onClick={updateDetails}
              >
                Update
              </button>
            </div>

            <div style={{ marginTop: "-535px" }} className="general same">
              General
            </div>
            <hr className="same"></hr>
            <div style={{ display: "flex" }}>
              <RiDashboardLine
                className="Icon same"
                style={{ fontSize: "15px" }}
              />
              <div className="empIcon same">Dashboard</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }}>
              <BsPerson className="Icon same" style={{ fontSize: "15px" }} />
              <div className="empIcon same" onClick={goToEmpComp}>
                Employee
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }}>
              <TbBook className="Icon same" style={{ fontSize: "15px" }} />
              <div className="empIcon same" onClick={goToTrainingComp}>
                Assign Training
              </div>
            </div>
            <div className="same Icon" style={{ marginTop: "25px" }}>
              Training
            </div>
            <hr className="same"></hr>
            <div style={{ display: "flex", marginTop: "25px" }}>
              <MdOutlineGroups
                className="Icon same"
                style={{ fontSize: "15px" }}
                onClick={() => navigate("/getBatch")}
              />
              <div
                className="empIcon same"
                onClick={() => navigate("/getBatch")}
              >
                Batch
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getSchedule')}>
              <BsCalendar2Day
                className="Icon same"
                style={{ fontSize: "15px" }}    
              />
              <div className="empIcon same">Schedule</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getTrainer')}>
              <BiUserCircle
                className="Icon same"
                style={{ fontSize: "15px" }}
              />
              <div className="empIcon same">Trainer</div>
            </div>
            <div className="same Icon" style={{ marginTop: "25px" }}>
              Development
            </div>
            <hr className="same"></hr>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getTask')}>
              <BsListTask className="Icon same" style={{ fontSize: "15px" }} />
              <div className="empIcon same">Task</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getTaskEvaluation')}>
              <VscTasklist className="Icon same" style={{ fontSize: "15px" }} />
              <div className="empIcon same">Task Evaluation</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getAttendance')}>
              <MdOutlineSchedule
                className="Icon same"
                style={{ fontSize: "15px" }}
              />
              <div className="empIcon same">Attendance</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }}>
              <RiMastercardLine
                className="Icon same"
                style={{ fontSize: "15px" }}
              />
              <div className="empIcon same" onClick={()=>setShow(!show)}>Masters <TiArrowSortedDown/></div>  
            </div>
            { show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getLocationMasters')}>Location</div>
        :null
      }
      {
        show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getTrainerMasters')}>Trainer Name</div>
        : null
      }
      {
        show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getSkillMasters')}>Skill</div>
        : null
      }
      {
        show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getDesgMasters')}>Designation</div>
        : null
      }
      {
        show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getTrainingMasters')}>Training Name</div>
        : null
      }
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTraining;
