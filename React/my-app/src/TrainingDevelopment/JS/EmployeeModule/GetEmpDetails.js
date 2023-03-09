import "../../CSS/EmployeeModule/GetEmpDetails.css";
import {Button,Modal, ModalFooter, ModalTitle} from 'react-bootstrap';
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import React, { useEffect, useState,useRef } from "react";
import { BsEye } from "react-icons/bs";
import { BiPencil, BiUserCircle } from "react-icons/bi";
import { MdOutlineAddCircleOutline, MdOutlineDelete, MdOutlineSchedule } from "react-icons/md";
import {RiDashboardLine,RiMastercardLine} from "react-icons/ri";
import {TbBook} from "react-icons/tb";
import {VscTasklist} from "react-icons/vsc";
import {IoSearchOutline} from "react-icons/io5";
import {MdOutlineGroups} from "react-icons/md";
import { TiArrowSortedDown } from 'react-icons/ti';
import {BsPerson, BsCalendar2Day, BsListTask} from "react-icons/bs";
import axios from "axios";
import {useNavigate } from "react-router-dom";

const GetEmpDetails = () => {

  const [data, setData] = useState([]);
  const [search,setSearch] = useState([]);
  const [show,setShow] = useState(false)

  const statusBgColor = useRef();
  const navigate  = useNavigate();

  const loadData = () => {
    axios.get("http://localhost:8080/getDetails").then((response) => {
      console.log(response);
      let ggg = response.data;
      setData(response.data);

      $(document).ready(function () {
        //$("#table").DataTable();
      });
    });
  };

  useEffect(() => {
    loadData();    
  }, []);

  const addEmployeePage = () =>{
    navigate('/send')
  }

  const viewDetails = (empId) =>{
    // navigate(`/view/${id}/${empId}`);
    navigate('/view/'+empId)
  }

  const handleEdit = (empId) => {
    navigate(`/update/${empId}`)
  };

  const trainingComponent = () => {
    navigate('/training')
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
        <div className="heightForAsh" style={{backgroundColor:'#F8F9FF',marginTop:'13px'}}>
          <div style={{display:'flex'}}>
          <div className="blue">
          <div className="empHead">Employee</div>
          <div className="general same">General</div>
          <hr className="same"></hr>
          <div style={{display:'flex'}}>
          <RiDashboardLine className="Icon same" style={{fontSize:'15px'}} onClick={()=>navigate('/dashboard')}/>
          <div className="empIcon same" onClick={()=>navigate('/dashboard')}>Dashboard</div>
          </div>
          <div style={{display:'flex', marginTop:'25px'}}>
          <BsPerson className="Icon same" style={{fontSize:'15px'}}/>
          <div className="empIcon same">Employee</div>
          </div>
          <div style={{display:'flex', marginTop:'25px'}}>
          <TbBook className="Icon same" style={{fontSize:'15px'}} onClick={trainingComponent}/>
          <div className="empIcon same" onClick={trainingComponent}>Assign Training</div>
          </div>
          <div className="same Icon" style={{marginTop:'25px'}}>Training</div>
          <hr className="same"></hr>
          <div style={{display:'flex', marginTop:'25px'}} onClick={()=>navigate('/getBatch')}>
          <MdOutlineGroups className="Icon same" style={{fontSize:'15px'}}/>
          <div className="empIcon same" onClick={()=>navigate('/getBatch')}>Batch</div>
          </div>
          <div style={{display:'flex', marginTop:'25px'}} onClick={()=>navigate('/getSchedule')}>
          <BsCalendar2Day className="Icon same" style={{fontSize:'15px'}}/>
          <div className="empIcon same">Schedule</div>
          </div>
          <div style={{display:'flex', marginTop:'25px'}} className='focus' onClick={()=>navigate('/getTrainer')}>
          <BiUserCircle className="Icon same" style={{fontSize:'15px'}}/>
          <div className="empIcon same">Trainer</div>
          </div>
          <div className="same Icon" style={{marginTop:'25px'}}>Development</div>
          <hr className="same"></hr>
          <div style={{display:'flex', marginTop:'25px'}} onClick={()=>navigate('/getTask')}>
          <BsListTask className="Icon same" style={{fontSize:'15px'}}/>
          <div className="empIcon same">Task</div>
          </div>
          <div style={{display:'flex', marginTop:'25px'}} onClick={()=>navigate('/getTaskEvaluation')}>
          <VscTasklist className="Icon same" style={{fontSize:'15px'}}/>
          <div className="empIcon same">Task Evaluation</div>
          </div>
          <div style={{display:'flex', marginTop:'25px'}} onClick={()=>navigate('/getAttendance')}>
          <MdOutlineSchedule className="Icon same" style={{fontSize:'15px'}}/>
          <div className="empIcon same">Attendance</div>
          </div>
          <div style={{display:'flex', marginTop:'25px'}}>
      <RiMastercardLine className="Icon same" style={{fontSize:'15px'}}/>
      <div className="empIcon same" onClick={()=>setShow(!show)}>Masters <TiArrowSortedDown/></div>
      </div>
      { show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/masters')}>Location</div>
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
          <div className="shadowBgWhite" style={{marginTop:'-5px', marginLeft:'2px', width:'83%'}}>
            <div style={{display:'flex'}}>
              <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
                    paddingLeft:'10px'}} className='form-control placehold' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input>
              </div>

        <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
        <div style={{marginTop:'-20px',marginLeft:'480px'}}><button onClick={addEmployeePage} className="addEmpButtuon">
          <MdOutlineAddCircleOutline/> Add Employee
        </button></div>
        </div> <br/> 
        <table id="table" className="table table-striped" style={{marginLeft:'20px',width:'96.5%'}}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Employee</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Join Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:'white'}}>
          {data.filter((val)=>{
           if(search == ""){
              return val
           }else if(val.empName.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.empId.toLowerCase().includes(search.toLowerCase())){
            return val
           }else if(val.empEmail.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.empDesg.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.empMobNo.toString().includes(search.toString())){
             return val;
           }else if(val.joinDate.toLowerCase().includes(search.toLowerCase())){
            return val;
           }else if(val.status.toLowerCase().includes(search.toLowerCase())){
            return val;
           }
          }).map((e, id) => (
            <tr key={id}>
              <td style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'15px'}}>{id+1}</td>
              <td style={{paddingTop:'1px',paddingBottom:'1px'}}><img className="rounded-circle" src={`data:image/png;base64,${e.image}`} height='33px' width='33px'/>
                &nbsp;{e.empName}&nbsp;{e.empLastName}
                <br/>
                <div className="empIdStyle padAligns">{e.empId}</div>
              </td>
              <td style={{paddingTop:'18px',paddingBottom:'18px',paddingLeft:'15px'}}>{e.empMobNo}</td>
              <td style={{paddingTop:'18px',paddingBottom:'18px'}}>{e.empEmail}</td>
              <td style={{paddingTop:'18px',paddingBottom:'18px',width:'220px'}}>{e.empDesg}</td>
              <td style={{paddingTop:'18px',paddingBottom:'18px'}}>{e.joinDate} </td>
               <td style={{paddingTop:'10px',paddingBottom:'10px'}}>
                {e.status == 'Active' ? 
                <div className="statusButton" style={{paddingTop:'4px',paddingBottom:'15px',fontSize:'11.5px'}}>{e.status}</div>
                :
                <div className="statusButton" style={{paddingTop:'4px',backgroundColor:'#FDEEEC', color:'#E74C3C', paddingBottom:'15px',paddingLeft:'14px', fontSize:'11.5px'}}>{e.status}</div>
              }
              </td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>
              <BsEye style={{cursor:'pointer',color:'#2ECC71'}} onClick={()=>viewDetails(e.empId)}/>&nbsp; &nbsp;
              <BiPencil style={{cursor:'pointer',color:'rgb(112, 106, 106)'}}  onClick={() =>handleEdit(e.empId)} />&nbsp;&nbsp;
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
export default GetEmpDetails;
