import '../../CSS/AttendanceModule/UpdateAttendanceDetails.css';
import React,{useEffect, useState} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiPencil } from "react-icons/bi";

const UpdateAttendanceDetails = () => {

  const [array,newArray] = useState([]);
  const [data,setData] = useState([]);
  const [ipValues,setIpValues] = useState({})

  let {batchId} = useParams();

  useEffect(()=>{
    loadData()
  },[])

  let navigate =useNavigate()

  const loadData = async() =>{
     let response = await axios.get('http://localhost:8080/updateAttendanceDetailsById?batchId=' +batchId)
     console.log(response);
     newArray(response.data.batchTrainingListById)
     setIpValues(response.data.batchTrainingListById[0])
     setData(response.data.batchDetailsById)
  }

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setIpValues(
      {...ipValues,
       [name] : value}
    )
    console.log(name,value);
  }

  const goToEdit = (batchId) =>{
    navigate(`/updateAttendance/${batchId}`)
  }

  return (
    <div>
      <Sidebar/>
      <div className='absolutes'>Attendance</div>
      <div className='scheduleAlign leftSched ledtAtt' onClick={()=>navigate('/getAttendance')}>Attendance &#62;</div>
       <div className='scheduleAlign schedLeft ledtAtts'>Manage Attendance</div>
      <div style={{marginTop:'-5px',height:'50px'}} className=" ms-1 whiteBlurBg">
      <div className='batchDetails ps-3 pt-3'>Batch Details</div>
      {data.map((e,id)=>(
        <div key={id}>
      <div style={{display:'flex'}}>
          <div className='editIcon editId' onClick={()=>goToEdit(e.batchId)}><BiPencil/></div>
            <div className='edit editBatchId' onClick={()=>goToEdit(e.batchId)}>edit</div>
          </div>
      <div className="row gy-4 px-3 mt-2">
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Batch ID</div>
      {e.batchId <10 ?<div className="label-value">Batch 0{e.batchId}</div>
      :
      <div className='label-value'>Batch {e.batchId}</div>}
      <div className="label-value"></div>    
      </div>
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Batch Lead</div>
        <div className="label-value">{e.batchLead}</div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Start Date</div>
      <div className="label-value">{e.startDate}</div>
      </div>
      <div className="col-12 col-md-6 col-lg-2">
      <div className="label">Time Slot</div>
      <div className="label-value">{e.Time} - {e.endTime}</div>
      </div>
     
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Status</div>
      {e.status === "Active" ? 
        <div style={{color:'#2ECC71'}} className="label-value">{e.status}</div>
        :
        <div style={{color:'#E74C3C'}} className="label-value">{e.status}</div>
        }
      </div>
      </div>
      </div>
      ))}
      </div>
      <div style={{marginTop:'250px'}} className="shadowBgWhite ms-1 whiteAdjust">
        <div className='ms-3 mt-2'>Batch Members</div>
        <table className="table table-striped ms-3 mt-2" style={{width:'96%'}}>
             <tbody>
             {array.map((e,i)=>(
              <tr key={i}>                
                 <td>{e.empName}<br/><div className='empIdStyle'>{e.empId}</div></td>
                 <td><div className='opacity'>Session 01</div><br/>
                 {e.attendance === 'absent' ? 
                 <div style={{color:'#E74C3C'}} className='topMinus'>{e.attendance}</div>
                :
                <div style={{color:'#2ECC71'}} className='topMinus'>{e.attendance}</div>
                }</td>
                 <td><div className='opacity'>Session 02</div><div style={{fontWeight:'600'}} className='empIdStyle'>-</div></td>
                 <td><div className='opacity'>Remarks</div><br/><div className='topMinus'>{e.reason}</div></td>
              </tr>
             ))}
           </tbody>
          </table>
      </div>
    </div>
  )
}

export default UpdateAttendanceDetails
