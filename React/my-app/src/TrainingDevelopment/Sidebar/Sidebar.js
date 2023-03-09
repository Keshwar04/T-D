import React, { useEffect, useState, memo } from 'react';
import './Sidebar.css';
import { BiUserCircle } from "react-icons/bi";
import { RiDashboardLine, RiMastercardLine } from "react-icons/ri";
import { TbBook } from "react-icons/tb";
import { VscTasklist } from "react-icons/vsc";
import { TiArrowSortedDown } from 'react-icons/ti';
import { MdOutlineGroups,MdOutlineSchedule } from "react-icons/md";
import { BsPerson, BsCalendar2Day, BsListTask } from "react-icons/bs";
import {useNavigate } from "react-router-dom";

const Sidebar = (props) => {
// console.log(props);
  const [show,setShow] = useState(false)

  const navigate = useNavigate();

  useEffect(()=>{
   if(props.show){
    setShow(true);
   }
  },[])

  const navigateTraining = () =>{
    navigate('/training')
    document.getElementById('focusData').focus()
  }
  console.log('sidebar component');
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
    <div style={{backgroundColor:'#F8F9FF',marginTop:'13px',height:'auto'}}>
      <div style={{display:'flex'}}>
      <div className="blue">
      <div style={{marginTop:'24px'}} className="general same">General</div>
      <hr className="same"></hr>
      <div style={{display:'flex'}}>
      <RiDashboardLine className="Icon same" style={{fontSize:'15px'}}/>
      <div className="empIcon same" onClick={()=>navigate('/dashboard')}>Dashboard</div>
      </div>
      <div style={{display:'flex', marginTop:'25px'}}>
      <BsPerson className="Icon same" style={{fontSize:'15px'}}/>
      <div className="empIcon same" onClick={()=>navigate('/get')} >Employee</div>
      </div>
      <div style={{display:'flex', marginTop:'25px'}}>
      <TbBook className="Icon same" style={{fontSize:'15px'}}/>
      <div id='focusData' className="empIcon same" onClick={navigateTraining} >Assign Training</div>
      </div>
      <div className="same Icon" style={{marginTop:'25px'}}>Training</div>
      <hr className="same"></hr>
      <div style={{display:'flex', marginTop:'25px'}} onClick={()=>navigate('/getBatch')}>
      <MdOutlineGroups className="Icon same" style={{fontSize:'15px'}}/>
      <div className="empIcon same">Batch</div>
      </div>
      <div style={{display:'flex', marginTop:'25px'}}onClick={()=>navigate('/getSchedule')}>
      <BsCalendar2Day className="Icon same" style={{fontSize:'15px'}}/>
      <div className="empIcon same">Schedule</div>
      </div>
      <div style={{display:'flex', marginTop:'25px'}} onClick={()=>navigate('/getTrainer')}>
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
  )
}

export default memo(Sidebar);
