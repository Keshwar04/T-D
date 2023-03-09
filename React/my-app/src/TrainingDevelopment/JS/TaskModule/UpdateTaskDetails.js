import Sidebar from '../../Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { BsCalendarCheck } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdateTaskDetails = () => {

  const [savedData,setSavedData] = useState([])
  const [batchIds,setBatchId] = useState([])
  const [trainerName,setTrainerName] = useState([])
  const [data,setData] = useState([])
  const [ipValues,setIpValues] = useState({})
  const [array,newArray] = useState([])
  const [currentDate,setCurrentDate] = useState()

  let {batchId} = useParams();
  let {id} = useParams();

  let navigate = useNavigate()

  useEffect(()=>{
    loadDataById()
    loadData()
    trainerNameDetails()
  },[])

  const loadDataById = async() =>{
    let response = await axios.get('http://localhost:8080/getTaskDetailsById?batchId='+batchId+'&id='+id)
    console.log(response);
    setSavedData(response.data.TaskDetailsById)
    setData(response.data.TaskDetailsById)
    newArray(response.data.batchTrainingListById)
    setIpValues(response.data.TaskDetailsById[0])
  }

  const trainerNameDetails = async() =>{
    let response = await axios.get('http://localhost:8080/trainerNameListDetails')
    console.log(response);
    const data =[];
    for(var i=0; i<response.data.trainerName.length; i++){
     const {trainerName} = response.data.trainerName[i]
     data.push(trainerName)
    }
     setTrainerName(data)
 }

 const setDataForUpdateState=(e,name) => {
  if(name ==="currentDate"){
    console.log(e);
    setCurrentDate(e);
  }
  
  let date= e.toLocaleDateString().replaceAll('/','-');
  data[0][name] = date;
  //setData(data);
}

  const loadData = async() => {
    const response = await axios.get('http://localhost:8080/batchListDetails')
        console.log(response);
        const data = [];
        for (var i = 0; i < response.data.length; i++) {
          //const { batchId } = secondResponse.data[i];
          let batchId = response.data[i].batchId
          data.push(batchId);
        }
        setBatchId(data);
  };

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setIpValues({
      ...ipValues,
      [name] : value
    })
    console.log(name,value);
  }

  const handleUpdate = async() =>{
    console.log(ipValues);
    let response = await axios.put(`http://localhost:8080/updateTaskDetails/${id}`, ipValues)
    console.log(response);
    Swal.fire({
      title: "Well Done!",
      text: "Task has been updated successfully",
      icon: "success",
      customClass: "swal-size-sm",
      confirmButtonColor: "orange",
      confirmButtonText: "continue",
    }).then(()=>{
      navigate('/getTask')
    })
  }
  return (
    <div>
       <Sidebar/>
       <div className='absolutes'>Task</div>
       <div className='scheduleAlign leftSched leftTask' onClick={()=>navigate('/getTask')}>Task &#62;</div>
       <div className='scheduleAlign schedLeft leftTasks'>Edit Task</div>
       <div className="position" style={{paddingLeft:'1px',backgroundColor:'#F8F9FF',
              width: "83%",height: "500px"}}>
                <div style={{height:'380px'}} className="shadowBox">
            <div className="pt-2 ms-3 addBatch">Edit Task</div>
            <div className="mt-1 ms-3 required">
              Enter the required information below to update employee.
            </div>
            {savedData.map((e,id)=>(
              <div key={id}>
            
            <div className="row">
              <div className="col-md-4">
                  <div className="form-group form-floating" style={{width:'310px'}} >
                  {e.id < 10 ?
                  <input disabled style={{height:'40px'}} className="form-control ms-3 mt-2" name='id' 
                   defaultValue={e.id} value={'Task 0'+ipValues.id} onChange={handleChange}/> 
                   :
                   <input disabled style={{height:'40px'}} className="form-control ms-3 mt-2" name='id' 
                   defaultValue={e.id} value={'Task '+ipValues.id} onChange={handleChange}/>
                  }
                  <label className="sTimeLabel topicAlign ms-3">Task ID</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <div className="input-group form-floating" style={{width:'310px'}}>
                    <select style={{height:'40px'}} className="form-select tesxtSize mt-2" name='batchId'
                     defaultValue={e.batchId} value={ipValues.batchId} onChange={handleChange}>
                      {batchIds.map((data, i) => {
                        return (
                          <option key={i} value={data}>
                            Batch {data}
                          </option>
                        );
                      })}
                    </select>
                    <label className='sTimeLabel mt-0'>Batch ID</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                  <div className="input-group form-floating" style={{width:'310px'}}>                
                    <input style={{height:'40px'}} className="form-control mt-2 tesxtSize" name='taskTitle'
                     defaultValue={e.taskTitle} value={ipValues.taskTitle}  onChange={handleChange}/>
                    <label className='sTimeLabel trainingAdjust'>Task Title</label>
                  </div>
                </div>  
            </div>
            <div className="row mt-4">
              <div className="col-md-4 ms-3 mt-2" style={{width:'333px'}}>
                <div className="form-group">
                  <div className="input-group form-floating">
                    <select style={{height:'40px'}} className="form-select tesxtSize" name='assignedBy'
                     defaultValue={e.assignedBy} value={ipValues.assignedBy} onChange={handleChange}>
                      {trainerName.map((data, i) => {
                       return (
                        <option key={i} value={data}>
                            {data}
                        </option>
                        );
                      })}
                    </select>
                    <label className='sTimeLabel'>Assigned By</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ms-3" style={{width:'333px'}}>
                <div className="form-group form-floating mt-2" >
                  <select style={{height:'40px'}} className='form-select tesxtSize' name='taskType' 
                   defaultValue={e.taskType} value={ipValues.taskType} onChange={handleChange}>
                    <option>Objective</option>
                    <option>Theory</option>
                   </select>
                  <label className='sTimeLabel topicAlign'>Task Type</label>    
                </div>
              </div>
              <div className="col-md-4 ms-4 mt-2">
                <BsCalendarCheck style={{position: "absolute",top:'143px',left:'1007px',zIndex: 1}}/>
                  <div className='form-floating' style={{width:'310px',marginLeft:'5px'}}>
                  <DatePicker className="form-control" selected={currentDate} name='currentDate'
                   value={e.currentDate} onChange={(e)=>setDataForUpdateState(e,'currentDate')}/>
                  <label className='sTimeLabel sDateWAlign'>Created On</label> 
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4 mt-2">       
              <div className="form-group form-floating ms-3" style={{width:'310px'}}>
                  <input type='time' style={{height:'40px'}} className='form-control' name='startTime'
                   value={ipValues.startTime || ''}  onChange={handleChange}/>
                  <label className='sTimeLabel topicAlign'>start Time</label>
                </div>
              </div>
              <div className="col-md-4 mt-2">       
              <div className="form-group form-floating" style={{width:'310px'}}>
                  <input type='time' style={{height:'40px'}} className='form-control' name='endTime'
                   value={ipValues.endTime || ''}  onChange={handleChange}/>
                  <label className='sTimeLabel topicAlign'>End Time</label>
                </div>
              </div>
              <div className="col-md-4 mt-2">
               <div className="form-group" style={{width:'310px'}}>
                  <div className="input-group form-floating" style={{width:'310px'}}>                
                    <select style={{height:'40px'}} className="form-select tesxtSize" name='status'
                     defaultValue={e.status} value={ipValues.status} onChange={handleChange}>
                      <option>Completed</option>
                      <option>Incompleted</option>
                    </select>
                    <label className='sTimeLabel'>Status</label>
                  </div>
                </div>  
              </div>
              </div>
              <div className='row mt-4'>
              <div className="col-md-4 mt-2 ms-3">
              <div className="form-group form-floating ">
                  <textarea style={{height:'80px',width:'310px'}} className='form-control' name='description'
                   value={ipValues.description} onChange={handleChange}/>
                  <label className='sTimeLabel topicAlign'>Description</label>
              </div>
             </div>
            </div>
            </div>
            ))}
            </div>
            <div className="shadowBox" style={{marginTop: "30px"}}> 
              <div className='pt-2 ps-3 batchMembFont'>Batch Members</div>
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
              
              <button className="discardButt" style={{marginLeft:'375px'}}>Discard</button>
              <button style={{ marginTop: "5px", marginLeft: "15px" }} className="submitButt" onClick={handleUpdate}>Update</button>
            </div>
       </div> 
    </div>
  )
}

export default UpdateTaskDetails
