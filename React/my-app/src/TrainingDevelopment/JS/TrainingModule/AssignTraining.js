import "../../CSS/TrainingModule/AssignTraining.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPencil, BiUserCircle } from "react-icons/bi";
import { MdOutlineAddCircleOutline, MdOutlineDelete, MdOutlineSchedule } from "react-icons/md";
import {RiDashboardLine,RiMastercardLine} from "react-icons/ri";
import {IoSearchOutline} from "react-icons/io5"
import {TbBook} from "react-icons/tb";
import {VscTasklist} from "react-icons/vsc";
import {MdOutlineGroups} from "react-icons/md";
import {BsPerson, BsCalendar2Day, BsListTask} from "react-icons/bs";
import { TiArrowSortedDown } from 'react-icons/ti';

const AssignTraining = () => {

    const [data, setData] = useState([]);
    const [search,setSearch] = useState([]);
    const [show,setShow] = useState(false)

    const navigate = useNavigate();

    const goToEmpComp = () =>{
         navigate('/get')
    }
    const goToAddTrainingComp = () =>{
         navigate('/addTraing')
    }
    const goToeditComp = (details) =>{
          console.log(details);
          localStorage.setItem("Details",JSON.stringify(details))
          navigate('/editTraining')
    }

    useEffect(()=>{
      fetchData();
    },[])

    const fetchData = async () => {
         const data = await axios.get('http://localhost:8080/trainingGetDetails');
         console.log(data.data);
         setData(data.data);       
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
        <div style={{backgroundColor:'#F8F9FF',marginTop:'13px'}}>
          <div style={{display:'flex'}}>
          <div className="blue">
            
            <div style={{ width: "150px",marginTop:'0px' }} className="empHead">Assign Training</div>
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
              <div className="empIcon same">
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
          <div style={{marginTop:'-5px', width:'83%'}} className='ms-1 shadowBgWhite'>
          <div style={{display:'flex'}}>
           <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
            paddingLeft:'10px'}} className='form-control' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}/></div>
            <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
           <div><button style={{marginTop:'20px',marginBottom:'43px',  marginLeft:'600px'}} className="addEmpButtuon" onClick={goToAddTrainingComp}>
            <MdOutlineAddCircleOutline onClick={goToAddTrainingComp}/> Add Training
           </button> </div>
         </div>
        <table style={{marginLeft:'20px',width:'96.5%'}} id="table" className="table table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Emp Id</th>
            <th>Emp Name</th>
            <th>Training Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.filter((val)=>{
           if(search == ""){
              return val
           }else if(val.empId.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.empName.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.trainingName.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.status.toLowerCase().includes(search.toLowerCase())){
            return val
           }}).map((e, id) => (
            <tr key={id}>
              <td style={{paddingTop:'11px',paddingBottom:'11px',paddingLeft:'15px'}}>{id+1}</td>
              <td style={{paddingTop:'11px',paddingBottom:'11px'}}>{e.empId}</td>
              <td style={{paddingTop:'11px',paddingBottom:'11px'}}>{e.empName}&nbsp;{e.empLastName}</td>
              <td style={{paddingTop:'11px',paddingBottom:'11px'}}>{e.trainingName}</td>
              {e.status === 'Assigned'?
               <td>
                <div className='statusDiv pt-1 ps-4'>{e.status}</div>
               </td>
              :
              <td>
                <div style={{color:'#E74C3C',background:'#FDEEEC',paddingLeft:'12px'}} className='statusDiv pt-1'>{e.status}</div>
              </td>
              }
              <td style={{paddingTop:'11px',paddingBottom:'11px'}}><BiPencil style={{cursor:'pointer'}} onClick={()=>{goToeditComp(e)}}/></td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AssignTraining;
