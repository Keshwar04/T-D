import Sidebar from '../../Sidebar/Sidebar';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
import { BiPencil } from "react-icons/bi";
import '../../CSS/TrainerModule/ViewTrainerDetails.css';

const ViewTrainerDetails = () => {

  const [array,newArray] = useState([]);
  const [scheduleData,setScheduleDta] = useState([]);

  let {BatchId} = useParams()
  let navigate = useNavigate()

  useEffect(()=>{
    loadDataById();
  },[])

  const loadDataById = async() =>{
    const response = await axios.get('http://localhost:8080/updateTrainerDetails?BatchId='+BatchId)
    console.log("datas", response)  
    newArray(response.data.batchTrainingListById)
    setScheduleDta(response.data.scheduleDetailsById) 
  }

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

  const goToEdit = (BatchId) =>{
    navigate(`/updateTrainer/${BatchId}`)
  }

  return (
    <div>
      <Sidebar/>
      <div className='absolutes'>Trainer's Module</div>
      <div className='absolutes leftScheds leftTrainer' onClick={()=>navigate('/getTrainer')}>Trainer's Module &#62;</div>
       <div className='absolutes schedLefts leftTrainers'>View</div>
      {scheduleData.map((e,i)=>
       <div key={i}>
      <div style={{marginTop:'-5px',height:'330px'}} className="shadowBgWhite ms-1">   
      <div style={{display:'flex'}}>
      <div className='batchDetails ps-3 pt-3'>Schedule Details</div>
          <div className='editIcon MarTops leftMars' onClick={()=>goToEdit(e.BatchId)}><BiPencil/></div>
            <div className='edit MarTops' onClick={()=>goToEdit(e.BatchId)}>edit</div>
      </div>    
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
            <div className="label-value">{finalResult} Hrs</div>
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
        <div style={{marginTop:'345px',height:'200px'}} className="shadowBgWhite ms-1">
         <div className='batchDetails ps-3 pt-3'>Trainer's Details</div>
         <div className="row gy-4 px-3 mt-1">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Trainer Attendance</div>
            {e.TrainerStatus === 'Present' ?
             <div style={{color:'#2ECC71'}} className="label-value">{e.TrainerStatus}</div>
             :
             <div style={{color:'#E74C3C'}} className="label-value">{e.TrainerStatus}</div>   
            }
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Status</div>
             {e.Status === 'Incompleted' ? 
             <div style={{color:'#E74C3C'}} className="label-value">{e.Status}</div>
             :
             <></>
             }
             {e.Status === 'Completed' ? 
             <div style={{color:'#2ECC71'}} className="label-value">{e.Status}</div>
             :
             <></>
             }
             {e.Status === 'Pending' ? 
             <div style={{color:'#E9930A'}} className="label-value">{e.Status}</div>
             :
             <></>
             }
             {e.Status === 'Inprogress' ? 
             <div style={{color:'#2ECC71'}} className="label-value">{e.Status}</div>
             :
             <></>
             }
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="label">Remarks</div>
            <div className="label-value">{e.Description}</div>
          </div>
        </div> 
        </div>
       </div>
      )}
         <div style={{marginTop:'565px',height:'300px'}} className="shadowBgWhite ms-1">
        <div className='ms-3 mt-2'>Batch Members</div>
        <table className="table table-striped ms-3" style={{width:'96%'}}>
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

export default ViewTrainerDetails;
