import '../../CSS/AttendanceModule/UpdateAttendanceDetails.css';
import React,{useEffect, useState} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateAttendanceDetails = () => {

  // const [array,newArray] = useState([]);
  const [data,setData] = useState([]);
  const [ipValues,setIpValues] = useState([])

  let {batchId} = useParams();
  let {id} = useParams()

  let navigate = useNavigate()

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async() =>{
     let response = await axios.get('http://localhost:8080/updateAttendanceDetailsById?batchId=' +batchId+'&id='+id)
     console.log(response);
    //  newArray(response.data.batchTrainingListById)
     if(response.data){
      let arr = [];
     response.data.batchTrainingListById.forEach(element => {
      arr.push(element);
     });
     setIpValues(arr);  
    }
     setData(response.data.batchDetailsById)
  }
  
    console.log(ipValues);

  const handleChange = (i,e) =>{
    // console.log(ipValues);
    console.log(i, e.target.value);
    const {name,value} = e.target;

    ipValues[i][name] = value;
    if(name == 'attendance'+[i]){
      ipValues.forEach(object => {
        delete object['attendance'+[i]];
      });
       ipValues[i]['attendance'] = value
    }
    console.log(ipValues);
  }

  const handleUpdate = async() =>{
   console.log(ipValues);

   Swal.fire({
    title: "Well Done!",
    text: "Attendance has been updated successfully",
    icon: "success",
    customClass: "swal-size-sm",
    confirmButtonColor: "orange",
    confirmButtonText: "continue",
  }).then(()=>{
    navigate('/getAttendance')
  })
  await axios.put(`http://localhost:8080/updatingBatchTrainingListForAttendance/${id}`, ipValues)
  }

  // console.log(array);
  
  const handleDiscard = () =>{
    
  }

  return (
    <div>
      <Sidebar/>
      <div className='absolutes'>Attendance</div>
      <div className='scheduleAlign leftSched ledtAtt' onClick={()=>navigate('/getAttendance')}>Attendance &#62;</div>
       <div className='scheduleAlign schedLeft ledtAtts'>Manage Attendance</div>
      <div style={{marginTop:'-5px',height:'250px'}} className="shadowBgWhite ms-1">
      <div className='batchDetails ps-3 pt-3'>Batch Details</div>
      {data.map((e,id)=>(
        <div key={id}>
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
      <div style={{marginTop:'270px'}} className="shadowBgWhite ms-1 whiteAdjust">
        <div className='ms-3 mt-2'>Batch Members</div>
        <table className="table table-striped ms-3 mt-2" style={{width:'96%'}}>
              
             <tbody>
             {ipValues.map((e,i)=>(
              <tr key={i}>                
                 <td>{e.empName}<br/><div className='empIdStyle'>{e.empId}</div></td>
                 <td>Session 01<div className=''>
                    <div className=''>    
                      <input type={'radio'} name={'attendance'+i} defaultValue= 'present' onChange={(eve)=>handleChange(i,eve)}
                       defaultChecked={e.attendance == 'present'} checked={ipValues.attendance}/>
                      <div className='present'>Present</div>
                    </div>
                    <div className='empIdStyle radioButt'>
                      <input type={'radio'} name={'attendance'+i} defaultValue='absent' onChange={(eve)=>handleChange(i,eve)}
                       defaultChecked={e.attendance == 'absent'} checked={ipValues.attendance}/>
                      <div className='absent'>Absent</div>
                    </div>
                  </div>
                  </td>
                 <td>Session 02<div style={{fontWeight:'600'}} className='empIdStyle'>-</div></td>
                 <td>
                   <div>
                     <input className='form-control w-75' placeholder='Remarks' name='reason' onChange={(eve)=>handleChange(i,eve)}
                      defaultValue={e.reason} value={ipValues.reason}/>
                   </div>
                 </td>
              </tr>
             ))}
           </tbody>
              </table>
              <button className="discardButt" style={{marginLeft:'375px'}} onClick={handleDiscard}>Discard</button>
              <button style={{ marginTop: "5px", marginLeft: "15px" }} className="submitButt" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  )
}

export default UpdateAttendanceDetails
