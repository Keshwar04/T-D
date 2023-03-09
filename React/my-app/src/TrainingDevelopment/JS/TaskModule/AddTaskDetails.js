import Sidebar from '../../Sidebar/Sidebar';
import '../../CSS/TaskModule/AddTaskDetails.css'
import React, { useEffect,useState,useRef } from 'react';
import { BsCalendarCheck } from "react-icons/bs";
import DatePicker from "react-datepicker";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddTaskDetails = () => {

  const [batchId,setBatchId] = useState([])
  const [trainerName,setTrainerName] = useState([])
  const [data,setData] = useState([])
  const [startDate,setStartDate] = useState();
  const [endDate,setEndDate] = useState();
  const [ipValues,setIpValues] = useState({})
  const [error,setError] = useState({})

  //fields
  let taskTitleField = useRef()
  let assignedByField = useRef()
  let taskTypeField = useRef()
  let batchIdField = useRef()
  let descField = useRef()
  let scheduleIdField = useRef()
  //error
  let refTaskTitle = useRef()
  let refAssignedBy = useRef()
  let refTaskType = useRef()
  let refBatchId = useRef()
  let refStartDate = useRef()
  let refDesc = useRef()
  let refEndDate = useRef()
  let refScheduleId = useRef()


  let navigate = useNavigate()

  useEffect(()=>{
   loadData();
   trainerNameDetails();
   scheduleData();
  },[])

  const handleChange = (e) =>{
    const {name,value} = e.target      
    setIpValues(
      {...ipValues,
       [name] : value
      }
    )
    console.log(name,value);
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

const scheduleData = async() =>{
  let response = await axios.get('http://localhost:8080/scheduleGetDetails')
  console.log(response);
  const data = [];
  for(var i=0; i<response.data.length; i++){
    const id = response.data[i].id
    data.push(id)
  }
  setData(data)
}

 const Validate = (e) =>{
    let errors = {}
    if(!e.taskTitle){
     errors.errorTaskTitle = 'Task title required!';
     taskTitleField.current.style.border = '1px solid red';
     refTaskType.current.style.marginLeft = '400px';
    }else{
      taskTitleField.current.style.border = '2px solid #90ee90'; 
      refAssignedBy.current.style.marginLeft = '340px';
    }
    if(!e.assignedBy){
      errors.errorAssignedBy = 'Trainer name required!';
      assignedByField.current.style.border = '1px solid red';
    }else{
      assignedByField.current.style.border = '2px solid #90ee90';
    }
    if(!e.taskType){
      errors.errorTaskType = 'Task type required!';
      taskTypeField.current.style.border = '1px solid red';
    }else{
      taskTypeField.current.style.border = '2px solid #90ee90';
    }
    if(!e.batchId){
      errors.errorBatchId = 'BatchId required';
      batchIdField.current.style.border = '1px solid red';
    }else{
      batchIdField.current.style.border = '2px solid #90ee90';
      refStartDate.current.style.marginLeft = '432px';
      refScheduleId.current.style.marginLeft = '340px';
      refStartDate.current.style.marginLeft = '260px';
    }
    if(!e.scheduleId){
      scheduleIdField.current.style.border = '1px solid red';
      errors.errorScheduleId = 'ScheduleID required';
    }else{
      scheduleIdField.current.style.border = '2px solid #90ee90';
      refStartDate.current.style.marginLeft = '355px';
    }
    if(e.batchId && e.scheduleId){
      refStartDate.current.style.marginLeft = '354px';
    }
    if(!e.desc){
      errors.errorDesc = 'Description required';
      descField.current.style.border = '1px solid red';
    }else{
      descField.current.style.border = '2px solid #90ee90';
    }  
    return errors;
 }

  const handleSubmit = async() =>{

    let errorObj = Validate(ipValues)  

     if(!startDate){
      document.getElementById('startDateId').style.border = '1px solid red';
      errorObj.errorStartDate = 'Start Date required';
     }else{
      document.getElementById('startDateId').style.border = '2px solid #90ee90';
     }
     if(!endDate){
      document.getElementById('endDateId').style.border = '1px solid red';
      errorObj.errorEndDate = 'End Date required';
     }else{
      document.getElementById('endDateId').style.border = '2px solid #90ee90';
      refDesc.current.style.marginLeft = '340px'
     }
      setError(errorObj)
      if (errorObj && Object.keys(errorObj).length != 0) {
        return;
      }
      if(startDate && endDate){
        let sDate = startDate.toLocaleDateString().replaceAll('/','-');
        let eDate = endDate.toLocaleDateString().replaceAll('/','-');

        let currentDate = new Date().toLocaleDateString().replaceAll('/','-')

        ipValues.sDate = sDate;
        ipValues.eDate = eDate;
        ipValues.status = 'Completed';
        ipValues.currentDate = currentDate;
        setIpValues(ipValues)
      }
      console.log(ipValues);
      let response = await axios.post('http://localhost:8080/sendTaskDetails',ipValues)
      console.log(response);
      Swal.fire({
        title: "Successfully submitted!",
        text: "Click ok to See details!",
        icon: "success",
        customClass: "swal-size-sm"
      }).then(() => {
         navigate("/getTask");
      });
  }

  const handleDiscard = () =>{
    setIpValues('')
    setStartDate('')
    setEndDate('')
  }
  return (
    <div>
       <Sidebar/>
       <div style={{display:'flex'}}>
       <div className='scheduleAlign'>Task</div>
       <div className='scheduleAlign leftSched leftTask' onClick={()=>navigate('/getTask')}>Task &#62;</div>
       <div className='scheduleAlign schedLeft leftTasks'>Add Task</div>
        </div>
       <div className="shadowBox position" style={{paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "500px"}}>
            <div className="mt-4 ms-3 addBatch">Add Task</div>
            <div className="mt-1 ms-3 required">
              Enter the required information below to add a new employee.
            </div>
            <div className="row ">
              <div className="col-md-4">
                  <div className="form-floating">
                    <input style={{height:'40px',width:'315px'}} ref={taskTitleField} className="form-control ms-3 mt-2 tesxtSize" placeholder='Task Title'
                     name='taskTitle' onChange={handleChange} value={ipValues.taskTitle || ''}/>
                    <label className='task_floatAlign'>Task Title</label>
                  </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="form-floating" style={{width:'310px'}} >
                    <select ref={assignedByField} style={{height:'40px'}} className="form-select tesxtSize" 
                     name='assignedBy' onChange={handleChange} value={ipValues.assignedBy || ''}>
                      <option value="">Assigned By</option>
                      {trainerName.map((data, i) => {
                       return (
                        <option key={i} value={data}>
                            {data}
                        </option>
                        );
                      })}
                    </select>
                    <label className='topic_floatAlign'>Assigned By</label>
                  </div>
                </div>
              <div className="col-md-4 mt-2">
                <div style={{width:'310px'}} className="form-floating"  >
                    <select ref={taskTypeField} style={{height:'40px'}} className="form-select tesxtSize"
                     name='taskType' onChange={handleChange} value={ipValues.taskType || ''}>
                      <option value="">Task Type</option>
                      <option>Objective</option>
                      <option>Theory</option>
                    </select>
                    <label className='topic_floatAlign'>Task Type</label>
                  </div>
                </div>
            </div>
            <div className='flex '>
              <div ref={refTaskTitle} className='marginAlignment leftTaskTitle'>{error.errorTaskTitle}</div>
              <div ref={refAssignedBy} className='marginAlignment leftassignedAlign'>{error.errorAssignedBy}</div>
              <div ref={refTaskType} className='marginAlignment leftTaskAlign'>{error.errorTaskType}</div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4 mt-2">
                <div style={{width:'315px'}} className="form-floating" >
                    <select ref={batchIdField} style={{height:'40px'}} className="form-select ms-3 tesxtSize"
                     name='batchId' onChange={handleChange} value={ipValues.batchId || ''}>
                      <option value="">Batch ID</option>
                      {batchId.map((data, i) => (
                        <>
                        {data<=9 ?
                          <option key={i} value={data}>Batch 0{data}</option>
                          :
                          <option key={i} value={data}>Batch {data}</option>
                        }
                        </>
                        )
                      )}
                    </select>
                     <label className='batch_floatAlign'>Batch ID</label>
                  </div>
                </div>
              <div className="col-md-4 mt-2" >
                <div style={{width:'310px'}} className="form-floating" >
                    <select ref={scheduleIdField} style={{height:'40px'}} className="form-select tesxtSize"
                     name='scheduleId' onChange={handleChange} value={ipValues.scheduleId || ''}>
                      <option value="">Schedule ID</option>
                      {data.map((data, i) => {
                        return (
                          <option key={i} value={data}>
                            Schedule 0{data}
                          </option>
                        );
                      })}
                    </select>
                    <label className='topic_floatAlign'>Schedule ID</label>
                  </div>
                </div>
              <div className="col-md-4 mt-2">
                <div style={{width:'310px'}}>
                <BsCalendarCheck style={{position: "absolute",top:'157px',left: "1000px",zIndex: 1}}/>
                 <div className='form-floating' style={{width:'310px'}}>
                  <DatePicker placeholderText="Start Date" className="form-control tesxtSize secondTextSize" 
                   id='startDateId' name='sDate' selected={startDate} onChange={setStartDate}/>
                    <label className='sDateFloatAlign'>Start Date</label>
                 </div>
                </div>
              </div>
            </div>
            <div className='flex '>
              <div ref={refBatchId} className='marginAlignment leftTaskTitle'>{error.errorBatchId}</div>
              <div ref={refScheduleId} className='marginAlignment leftScheduleAlign'>{error.errorScheduleId}</div>
              <div ref={refStartDate} className='marginAlignment leftStartDateAlign'>{error.errorStartDate}</div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="ms-3 mt-2">
                <BsCalendarCheck style={{position: "absolute",top:'229px',left: "310px",zIndex: 1}}/>
                  <div style={{width:'312px'}} className='form-floating'>
                   <DatePicker placeholderText="End Date" className="form-control tesxtSize secondTextSize" 
                   id='endDateId' name='eDate' selected={endDate} onChange={setEndDate}/>
                    <label className='sDateFloatAlign'>End Date</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
              <div className="form-floating mt-2">
                  <textarea ref={descField} style={{height:'80px',width:'310px'}} placeholder='Description' className='form-control tesxtSize secondTextSize'
                   name='desc' id='descId' onChange={handleChange} value={ipValues.desc || ''}/>
                    <label className='topic_floatAlign'>Description</label>
              </div>
              </div>
            </div>
            <div className='flex '>
            <div ref={refEndDate} className='marginAlignment leftTaskTitle endDateAlignment'>{error.errorEndDate}</div>
              <div ref={refDesc} className='marginAlignment leftDescAlign'>{error.errorDesc}</div>
            </div>
              <div style={{marginTop:'50px'}} className='topMargin disSubAlign'>
               <button className="discardButt" style={{marginLeft:'375px'}} onClick={handleDiscard}>Discard</button>
               <button style={{ marginTop: "5px", marginLeft: "15px" }} className="submitButt" onClick={handleSubmit}>Submit</button>
              </div>
       </div>
    </div>
  )
}

export default AddTaskDetails
