import Sidebar from "../../Sidebar/Sidebar";
import '../../CSS/TakEvaluationModule/UpdateTaskEvaluationDetails.css';
import React,{useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateTaskEvaluationDetails = () =>{

    const [array,newArray] = useState([]);
    const [data,setData] = useState({})
    //const [ipValues,setIpValues] = useState({})

    let {id} = useParams()
    let {batchId} = useParams()

    let navigate = useNavigate()

    useEffect(()=>{
      loadDataById()
    },[])

    const loadDataById = async() =>{
      let response = await axios.get('http://localhost:8080/getTaskDetailsById?batchId='+batchId+'&id='+id)
      console.log(response);
      newArray(response.data.batchTrainingListById)
      setData(response.data.TaskDetailsById[0])
    }

    const handleChange = (e) =>{
      const {name,value} = e.target;
      setData(
        {...data,
         [name] : value}
      )
      console.log(name,value);
    }

    const handleUpdate = async() =>{
        console.log(data);
        let response = await axios.post(`http://localhost:8080/updatingBatchTrainingList/${batchId}`, data)
        console.log(response);
    }
    
    const handleDiscard = () =>{
      setData('')
    }
    return(
        <div>
           <Sidebar/>
      <div className='absolutes'>Task Evaluation</div>
      <div className='scheduleAlign leftSched' onClick={()=>navigate('/getTaskEvaluation')}>Task Evaluation &#62;</div>
       <div className='scheduleAlign schedLeft leftTasks'>Edit Task</div>
      <div style={{marginTop:'-5px',height:'280px !important'}} className="shadowBgWhite ms-1 whiteAdjust">
      <div className='batchDetails ps-3 pt-3'>Task Details</div>
      <div className="row gy-4 px-3 mt-2">
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Task ID</div>
      {data.id < 10 ?<div className="label-value">Task 0{data.id}</div>
        :
        <div className="label-value">Task {data.id}</div>
        }
      </div>
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Batch ID</div>
       {data.batchId < 10 ?<div className="label-value">Batch 0{data.batchId}</div>
        :
        <div className="label-value">Batch {data.batchId}</div>
        }
      </div>
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Task Title</div>
      <div className="label-value">{data.taskTitle}</div>
      </div>
      <div className="col-12 col-md-6 col-lg-2">
      <div className="label">Assigned By</div>
      <div className="label-value">{data.assignedBy}</div>
      </div>
     
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Task Type</div>
      <div className="label-value">{data.taskType}</div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Start Date</div>
      <div className="label-value">{data.startDate}</div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
      <div className="label">Time Slot</div>
      <div className="label-value">{data.startTime} - {data.endTime}</div>
      </div>
      <div className="col-12 col-md-6 col-lg-2">
      <div className="label">Status</div>
      {data.status === 'Completed' ? 
        <div style={{color:'#2ECC71'}} className="label-value">{data.status}</div>
        :
        <div style={{color:'#E74C3C'}} className="label-value">{data.status}</div>
        }
      </div>
      <div className="col-12 col-md-6 col-lg-3">
         <div className="label">Description</div>
         <div className="label-value">{data.description}</div>
        </div>
      </div>
      </div>
      <div style={{marginTop:'325px'}} className="shadowBgWhite ms-1 whiteAdjust">
        <div className='ms-3 mt-2'>Batch Members</div>
        <table className="table table-striped ms-3 mt-2" style={{width:'96%'}}>
               <thead>
                <tr>
                 <th>S.No</th>
                 <th>Employee</th>
                 <th>Score</th>
                 <th>Remarks</th>
                </tr>
               </thead>
             <tbody>
             {array.map((e,i)=>(
              <tr key={i}>
                 {i<10 ?<td className='ps-3'>0{i+1}</td>
                 : 
                 <td className='ps-3'>{i}</td>
                 }
                 <td>{e.empName}<br/><div className='empIdStyle'>{e.empId}</div></td>
                 <td><input className="form-control" name="score" onChange={handleChange} value={data.score || ''}/></td>
                 <td><input className="form-control" name="remarks" onChange={handleChange} value={data.remarks || ''}/></td>
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
export default UpdateTaskEvaluationDetails;