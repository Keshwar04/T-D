import '../../CSS/BatchModule/GetBatchDetails.css';
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import React, { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { BiPencil, BiUserCircle } from "react-icons/bi";
import { MdOutlineAddCircleOutline, MdOutlineSchedule } from "react-icons/md";
import {RiDashboardLine,RiMastercardLine} from "react-icons/ri";
import {TbBook} from "react-icons/tb";
import {VscTasklist} from "react-icons/vsc";
import {IoSearchOutline} from "react-icons/io5";
import {MdOutlineGroups} from "react-icons/md";
import { TiArrowSortedDown } from 'react-icons/ti';
import {BsPerson, BsCalendar2Day, BsListTask} from "react-icons/bs";
import axios from "axios";
import {useNavigate } from "react-router-dom";

const GetBatchDetails = () => {

  const [data, setData] = useState([]);
  const [search,setSearch] = useState([]);
  const [show,setShow] = useState(false)
  
  const navigate  = useNavigate();

  useEffect(()=>{
    loadData();
  },[])

  const goToEmpComp = () =>{
    navigate('/get')
  }

  const goToTrainingComp = () => {
    navigate("/training");
  };

  const loadData = async() =>{
    const dbData = await axios.get('http://localhost:8080/getBatchDetails')
    console.log(typeof dbData.data['0'].startDate)
    setData(dbData.data)
  }

  const trainingComponent = () => {
    navigate('/training')
  }
  const editComp = (id, batchId) =>{
    navigate(`/updateBatch/${id}/${batchId}`)
  }
  const viewComp = (id,batchId) =>{
    navigate(`/viewBatch/${id}/${batchId}`)
  }

  return (
    <div>
        <div className="colorAdjust">Training and Development</div>
        <div style={{marginLeft:'-22px',marginTop:'-32px'}}>
        <div style={{display:'flex'}}>
        <button className="FAsButton">FA</button>
        <div className="bToT"> FA SOFTWARE </div>
        </div>
        <div className="service">SERVICES PVT.LTD</div>
        <div className="fly">Fly Ahead</div>
        </div>
        <div style={{backgroundColor:'#F8F9FF',marginTop:'13px',height:'auto'}} className='minHeightAdjust'>
          <div style={{display:'flex'}}>
          <div className="blue">
            <div style={{ width: "150px",marginTop:'0px' }} className="empHead">Batch</div>
            <div className="general same">General</div>
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
                onClick={()=>navigate('/getBatch')}
              />
              <div className="empIcon same" onClick={()=>navigate('/getBatch')}>Batch</div>
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
            <div className="same Icon" style={{ marginTop: "25px" }} >
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
            <div style={{display:'flex', marginTop:'25px'}}>
          <RiMastercardLine className="Icon same" style={{fontSize:'15px'}}/>
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
          <div className="shadowBgWhite" style={{marginTop:'-5px',marginLeft:'2px', width:'83%'}}>
            <div style={{display:'flex'}}>
          <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
        paddingLeft:'10px'}} className='form-control' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input></div>
        <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
        <div style={{marginTop:'-20px',marginLeft:'480px'}}><button onClick={()=>{navigate('/addBatch')}} className="addEmpButtuon">
          <MdOutlineAddCircleOutline/> Add Batch
        </button></div>
        </div> <br/> 
        <table id="table" className="table table-striped" style={{marginLeft:'20px',width:'96.5%'}}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Batch ID</th>
            <th>Training Name</th>
            <th>Batch Lead</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Time Slot</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:'white'}}>
          {data.filter((val)=>{
           if(search == ""){
              return val
           }else if(val.batchId.toString().includes(search.toString())){
              return val
           }else if(val.trainingName.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.batchLead.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.startDate?.includes(search)){
             return val;
           }else if(val.endDate?.includes(search)){
            return val;
           }else if(val.Time.toString().includes(search.toString())){
            return val;
           }else if(val.endTime.toString().includes(search.toString())){
            return val;
           }else if(val.status.toLowerCase().includes(search.toLowerCase())){
            return val;
           }
          }).map((e, id) => (
            <tr key={id}>
              {id<9 ? <td style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'15px'}}>0{id+1}</td> 
              : 
              <td style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'15px'}}>{id+1}</td>
              }
              
              {e.batchId<=9 ? <td style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'15px'}}>Batch 0{e.batchId}</td> 
              : 
              <td style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'15px'}}>Batch {e.batchId}</td>
              }
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.trainingName}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.batchLead}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px',width:'220px'}}>{e.startDate}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.endDate} </td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.Time} - {e.endTime} </td>
              <td>
                {e.status == 'Active' ? 
                <div className="statusButton" style={{paddingTop:'4px',paddingBottom:'15px',fontSize:'11.5px'}}>{e.status}</div>
                :
               <div className="statusButton" style={{paddingTop:'4px',backgroundColor:'#FDEEEC', color:'#E74C3C', paddingBottom:'15px',paddingLeft:'14px', fontSize:'11.5px'}}>{e.status}</div>
                }
              </td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>
                 <BsEye style={{cursor:'pointer',color:'#2ECC71'}} onClick={()=>viewComp(e.id,e.batchId)}/>&nbsp; &nbsp;
                <BiPencil style={{cursor:'pointer',color:'rgb(112, 106, 106)'}} onClick={()=>editComp(e.id, e.batchId)}/>&nbsp;&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        </div>
      </div>
    </div>
  );
};
export default GetBatchDetails;
