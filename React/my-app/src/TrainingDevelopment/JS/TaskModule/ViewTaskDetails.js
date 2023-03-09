import Sidebar from '../../Sidebar/Sidebar';
import '../../CSS/TaskModule/ViewTaskDetails.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { BiPencil } from "react-icons/bi";

const ViewTaskDetails = () => {

  const [array,newArray] = useState([]);
  const [data,setData] = useState([])

  let {batchId} = useParams()
  let {id} = useParams()

  let navigate = useNavigate()

  useEffect(()=>{
    loadDataById()
  },[])

  const loadDataById = async() =>{
    let response = await axios.get('http://localhost:8080/getTaskDetailsById?batchId='+batchId+'&id='+id)
    console.log(response);
    newArray(response.data.batchTrainingListById)
    setData(response.data.TaskDetailsById)
  }

  const goToEdit = (batchId,id) =>{
     navigate(`/updateTask/${batchId}/${id}`)
  }

  return (
    <div>
        <Sidebar/>
        <div className='absolutes'>Task</div>
        <div className='scheduleAlign leftSched leftTask' onClick={()=>navigate('/getTask')}>Task &#62;</div>
       <div className='scheduleAlign schedLeft leftTasks'>View Task</div>
      <div style={{marginTop:'-5px'}} className="shadowBgWhite ms-1 whiteAdjust">
      {data.map((e,id)=>(
        <div key={id}>    
          <div style={{display:'flex'}}>
      <div className='batchDetails ps-3 pt-3'>Task Details</div>
          <div className='editIcon MarTops leftPencil' onClick={()=>goToEdit(e.batchId,e.id)}><BiPencil/></div>
            <div className='edit MarTops' onClick={()=>goToEdit(e.batchId,e.id)}>edit</div>
      </div>
         <div className='mx-3'>
          <div className='py-3'>
      <div className='flex-Container row pb-1'>
        <div className='col-lg-3'>Task ID</div>
        <div className='col-lg-3'>Batch ID</div>
        <div className='col-lg-3'>Task Title</div>
        <div className='col-lg-3'>Assigned By</div>
      </div>
      <div className='dataFlex row'>
        {e.id < 10 ? <div className='col-lg-3'> Task 0{e.id}</div>
        :
        <div className='col-lg-3'>Task {e.id}</div>
        }
        {e.batchId < 10 ? <div className='col-lg-3'> Batch 0{e.batchId}</div>
        :
        <div className='col-lg-3'>Batch {e.batchId}</div>
        }
        <div className='col-lg-3'>{e.taskTitle}</div>
        <div className='col-lg-3'>{e.assignedBy}</div>
      </div>
      </div>
      <div className='py-3'>
      <div className='flex-Container2 row pb-1'>
        <div className='col-lg-3'>Task Type</div>
        <div className='col-lg-3'>Start Date</div>
        <div className='col-lg-3'>End Date</div>
        <div className='col-lg-3'>Status</div>
      </div>
      <div className='dataFlex row'>
        <div className='col-lg-3'>{e.taskType}</div>
        <div className='col-lg-3'>{e.startDate}</div>
        <div className='col-lg-3'>{e.endDate}</div>
        {e.status === 'Completed' ? 
        <div style={{color:'#2ECC71'}} className='col-lg-3'>{e.status}</div>
        :
        <div style={{color:'#E74C3C'}} className='col-lg-3'>{e.status}</div>
        }
      </div>
      </div>
     <div className='py-3'>
       <div className='flex-Container pb-1'>
        <div>Description</div>
      </div>
      <div className='dataFlex'>
        <div><p>{e.description}</p></div>
      </div>
      </div>
          </div>
      </div>
      ))}
      </div>
      <div style={{marginTop:'325px'}} className="shadowBgWhite ms-1 whiteAdjust">
        <div className='ms-3 mt-2'>Batch Members</div>
        <table className="table table-striped ms-3 mt-2" style={{width:'96%'}}>
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
             {array.map((e,i)=>(
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
  )
}

export default ViewTaskDetails
