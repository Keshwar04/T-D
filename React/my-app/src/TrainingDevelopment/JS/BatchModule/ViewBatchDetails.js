import React, { useEffect, useState, createContext } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import '../../CSS/BatchModule/ViewBatchDetails.css'
import axios from 'axios';
import { BiPencil } from "react-icons/bi";
import {useParams,useNavigate} from 'react-router-dom';

const ViewBatchDetails = () => {
  const [data,setData] = useState([]);
  const [secondData,secondSetData] = useState([]);
  const [scheduleData,setScheduleData] = useState([])

  let navigate = useNavigate();
  
  let {id} = useParams();
  let {batchId} = useParams();

  useEffect(()=>{
      loadData();
  },[])

  const loadData = async () =>{
      let response = await axios.get('http://localhost:8080/getBatchIdDetails?id='+id+'&batchId='+batchId)
      console.log(response);
      setData(response.data.batchListById)
      secondSetData(response.data.batchTrainingListById)
      setScheduleData(response.data.scheduleListById)
  }

  //endTime
  let endTime = scheduleData.map((e)=> e.EndTime)
  let changeStr = endTime.toString().replace(':','.')
  let changeFloat = parseFloat(changeStr)
  

  //startTime
  let startTime = scheduleData.map((e)=> e.StartTime)
  let changeStr2 = startTime.toString().replace(':','.')
  let changeFloat2 = parseFloat(changeStr2)

  //result
  let result = changeFloat - changeFloat2;
  let convertingResultToStr = result.toString().replace('.',':');
  let finalResult = convertingResultToStr.substr(0,4)
  
  const goToEdit = (id,batchId) =>{
    navigate(`/updateBatch/${id}/${batchId}`)
  }
  
  return (
    <div>
      <Sidebar/>
      <div className='absolute'>
        <div style={{display:'flex'}}>
        <div className='batchAlign'>Batch</div>
        <div className='topMar greater minusTopMargin leftMoves' onClick={()=>navigate('/getBatch')}>Batch &#62;</div>
         <div className='topMar nBSP minusTopMargin'>&nbsp;View Batch</div>
        </div>
        {data.map((e,i)=>(
        <div className='backgroundWhite' key={e.id}>
          <div className='batchDetails ps-3 pt-3'>Batch Details</div>
          <div style={{display:'flex'}}>
          <div className='editIcon editId' onClick={()=>goToEdit(e.id,e.batchId)}><BiPencil/></div>
            <div className='edit editBatchId' onClick={()=>goToEdit(e.id,e.batchId)}>edit</div>
          </div>
        <div className="row gy-4 px-3 mt-2">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Training Name</div>
            <div className="label-value">{e.trainingName}</div>
            <div className="label-value"></div>    
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Batch ID</div>
             {e.batchId <= 9 ? <div className="label-value">Batch 0{e.batchId}</div>
             :
            <div className="label-value">Batch {e.batchId}</div>
             }
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Batch Lead</div>
            <div className="label-value">{e.batchLead}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Start Date</div>
            <div className="label-value">{e.startDate}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">End Date</div>
            <div className="label-value">{e.endDate}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Time</div>
            <div className="label-value">{e.Time} - {e.endTime}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Available Resources</div>
            <div className="label-value">{e.availableResources}</div>
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
        <div className='backgroundWhite marginTopWhite mt-4'>
          <div className='batchDetails ps-3 pt-3'>Schedule Details</div>
          {scheduleData.map((e,i)=>(
            <div key={e.id}>   
              <div className="row gy-4 px-3 mt-2">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Schedule ID</div>
            {e.id <=9 ? <div className="label-value">Schedule 0{e.id}</div>
            :
            <div className="label-value">Schedule {e.id}</div>   
             }
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Batch ID</div>
             {e.BatchId <= 9 ? <div className="label-value">Batch 0{e.BatchId}</div>
             :
            <div className="label-value">Batch {e.BatchId}</div>
             }
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Training Name</div>
            <div className="label-value">{e.TrainingName}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Topic</div>
            <div className="label-value">{e.Topic}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Sub Topic</div>
            <div className="label-value">{e.SubTopic}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Trainer</div>
            <div className="label-value">{e.TrainerName}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Location</div>
            <div className="label-value">{e.Location}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Start Date</div>
            <div className="label-value">{e.StartDate}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Duration</div>
            <div className="label-value">{finalResult}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Time Slot</div>
            <div className="label-value">{e.StartTime} - {e.EndTime}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Description</div>
            <div className="label-value">{e.Description}</div>
          </div>
        </div> 
            </div>
          ))} 
        </div>
        <div className='shadowWhite'>
          <div className='ps-3 pt-3'>
            <div>Batch Members</div>
            <table className="table table-striped" style={{width:'98%'}}>
          <thead>
           <tr>
             <th>S.No</th>
             <th>Employee</th>
             <th>Number</th>
             <th>Email-ID</th>
             <th>Role</th>
             <th>Date of joining</th>
             <th>Experience</th>
           </tr>
           </thead>
           <tbody>
             {secondData.map((e,i)=>(
              <tr key={i}>
                 <td className='ps-3'>{i+1}</td>
                 <td>{e.empName}<br/><div className='empIdStyle'>{e.empId}</div></td>
                 <td>{e.empMobNo}</td>
                 <td>{e.empEmail}</td>
                 <td>{e.empDesg}</td>
                 <td>{e.joinDate}</td>
                 <td>1 yr</td>
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

export default ViewBatchDetails;
export const context  = createContext();