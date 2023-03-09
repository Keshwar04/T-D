import Sidebar from '../../Sidebar/Sidebar';
import '../../CSS/ScheduleModule/AddScheduleDetails.css';
import React, { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarCheck } from "react-icons/bs";
import Swal from 'sweetalert2';

const AddScheduleDetails = () => {

  let navigate = useNavigate()

  let refBatchId = useRef();
  let refTopic = useRef();
  let refSubTopic = useRef();
  let refTrainerName = useRef();
  let subTopicId = useRef();
  let refStartDate = useRef();
  let refEndDate = useRef();
  let refStartTime = useRef();
  let refEndTime = useRef();
  let refLocation = useRef();
  let refStatus = useRef();
  let refDesc = useRef();

  const [batchId,setBatchId] = useState([]);
  const [location, setLocation] = useState([]);
  const [ipDatas,setIpDatas] = useState({});
  const [error,setError] = useState({})
  const [startDate,setStartDate] = useState();
  const [endDate,setEndDate] = useState();
  const [trainingName,setTrainingName] = useState([]);
  const [trainerName,setTrainerName] = useState([])
  

  useEffect(()=>{
    loadData()
    trainerNameDetails()
    locationDetails()
  },[])

  const handleChange = (e) =>{
    const {name,value} = e.target;
    console.log(ipDatas);
    setIpDatas(
      {...ipDatas,
      [name]:value
    }
    )
    if(name === 'batchId' && value !=''){
    console.log(name,value);
      filterValue(value)
    }
  }

  const trainerNameDetails = async() =>{
     let response = await axios.get('http://localhost:8080/trainerNameListDetails')
     console.log(response);
     const data =[];
     for(var i=0; i<response.data.trainerName.length; i++){
      const {trainerName} = response.data.trainerName[i]
      data.push(trainerName)
     }
     console.log(data);
      setTrainerName(data)
  }

  const filterValue = (value) =>{
//let arr = trainingName.filter (training => (training.batchId === value));
let arr = trainingName.filter((e)=>{
  if(e.batchId == value)
  return e;
})
console.log(arr);       

setIpDatas((prevalue) => ({
     ...prevalue, 
    "trainName": arr[0].trainingName
}));
console.log("position",arr[0]);
console.log(arr);       
  }

  const Validate = (e) =>{
   const errors = {}
   if(!e.batchId){
    errors.errorBatchId = 'please select batch Id!';
    document.getElementById('batchId').style.border = '1px solid red';
    refBatchId.current.style.marginTop  = '-20px';
   }else{
    document.getElementById('batchId').style.border = '2px solid #90ee90';
    refTopic.current.style.marginLeft  = '117px';
   }
   if(!e.topic){
    errors.errorTopic = 'Topic required!';
    document.getElementById('topicId').style.border = '1px solid red';
    refTopic.current.style.marginTop  = '-20px';
   }else{
    document.getElementById('topicId').style.border = '2px solid #90ee90';
   }  
   if(!e.subTopic){
    errors.subTopic = 'SubTopic required!';
    subTopicId.current.style.border = '1px solid red';
    refSubTopic.current.style.marginTop = '-20px';
   }else{
    subTopicId.current.style.border = '2px solid #90ee90';
    refTrainerName.current.style.marginLeft = '340px';
   }
   if(!e.trainerName){
    errors.errorTrainerName = 'Trainer Name required!';
    refTrainerName.current.style.marginTop = '-20px';
    document.getElementById('trainerNameId').style.border = '1px solid red';
   }else{
    document.getElementById('trainerNameId').style.border = '2px solid #90ee90';
    refStartDate.current.style.marginLeft = '355px';
   }
   if(!e.sTime){
    errors.errorStartTime = 'Start Time required!';
    document.getElementById('startTimeId').style.border = '1px solid red';
    refStartTime.current.style.marginTop = '-20px';
   }else{
    document.getElementById('startTimeId').style.border = '2px solid #90ee90';
    refEndTime.current.style.marginLeft = '356px';
   }
   if(!e.eTime){
    errors.errorEndTime = 'End Time required!';
    document.getElementById('endTimeId').style.border = '1px solid red';
    refEndTime.current.style.marginTop = '-20px';
   }else{
    document.getElementById('endTimeId').style.border = '2px solid #90ee90';
   }
   if(!e.location){
    errors.errorLocation = 'Location required!';
    document.getElementById('locationId').style.border = '1px solid red';
   }else{
    document.getElementById('locationId').style.border = '2px solid #90ee90';
    refStatus.current.style.marginLeft = '340px';
   }
   if(!e.status){
    errors.errorStatus = 'Status required!';
    document.getElementById('statusId').style.border = '1px solid red';
   }else{
    document.getElementById('statusId').style.border = '2px solid #90ee90';
    refDesc.current.style.marginLeft = '352px';
   }
   if(!e.desc){
    errors.errorDesc = 'Description required!';
    document.getElementById('descId').style.border = '1px solid red';
   }else{
    document.getElementById('descId').style.border = '2px solid #90ee90';
   }
   return errors;
  }

  const loadData = async() => {
    const response = await axios.get('http://localhost:8080/batchListDetails')
        console.log(response);
        setTrainingName(response.data)
        const data = [];
        for (var i = 0; i < response.data.length; i++) {
          let batchId = response.data[i].batchId
          data.push(batchId);
        }
        console.log(data);
        setBatchId(data);
  };

  ///location SELECT tag
  const locationDetails = () => {
    axios.get("http://localhost:8080/location").then((response) => {
      const data = [];
      for (var i = 0; i < response.data.location.length; i++) {
        const { location } = response.data.location[i];
        data.push(location);
      }
      setLocation(data);
    });
  };
  
  const handleDiscard = () =>{
    console.log('check');
    setIpDatas("")
  }

  const handleSubmit = async () =>{
    let errorObj = Validate(ipDatas)

    if(!startDate){
      document.getElementById('startDateId').style.border = '1px solid red';
      errorObj.errorStartDate = 'Start Date required';
      refStartDate.current.style.marginTop = '-20px';
    }else{
      document.getElementById('startDateId').style.border = '2px solid #90ee90';
    }
    if(!endDate){
     document.getElementById('endDateId').style.border = '1px solid red';
     errorObj.errorEndDate = 'End Date required';
     refEndDate.current.style.marginTop = '-20px';
    }else{
     document.getElementById('endDateId').style.border = '2px solid #90ee90';
     refStartTime.current.style.marginLeft = '340px';
    }
    setError(errorObj)
    if (errorObj && Object.keys(errorObj).length != 0) {
      return;
    }
    
    if(startDate && endDate){
      let sDate = startDate.toLocaleDateString().replaceAll('/','-');
      let eDate = endDate.toLocaleDateString().replaceAll('/','-');
      
      ipDatas.sDate = sDate;
      ipDatas.eDate = eDate;
      ipDatas.trainerStatus = 'present';
      setIpDatas(ipDatas);
      }
      console.log(ipDatas);
      let response = await axios.post('http://localhost:8080/scheduleSendDetails',ipDatas)
      console.log(response);
      Swal.fire({
        title: "Successfully submitted!",
        text: "Click ok to See details!",
        icon: "success",
        customClass: "swal-size-sm"
      }).then(() => {
         navigate("/getSchedule");
      });
  }


  return (
    <div>
       <Sidebar/>
       <div style={{display:'flex'}}>
       <div className='scheduleAlign'>Schedule</div>
       <div className='scheduleAlign leftSched' onClick={()=>navigate('/getSchedule')}>Schedule &#62;</div>
       <div className='scheduleAlign schedLeft'>Add Schedule</div>
        </div>
       <div className="shadowBox position" style={{paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "500px",opacity:'1'}}>
            <div className="mt-4 ms-3 addBatch">Add Schedule</div>
            <div className="mt-1 ms-3 required">
              Enter the required information below to add a new employee.
            </div>
            <div className="row">
              <div className="col-md-4">
                  <div className="form-floating" >
                    <select style={{height:'40px',width:'317px'}} className="form-select ms-3 mt-2 tesxtSize"
                      name='batchId' id="batchId" onChange={handleChange} value={ipDatas.batchId || ''}>
                      <option value="">Batch ID</option>
                      {batchId.map((data, i) => (   
                        <>
                        {data<=9 ?
                        <option value={data}>Batch 0{data}</option>
                        :
                        <option value={data}> Batch {data}</option>
                        }
                      </> 
                      ))}
                    </select>
                    <label className='batchIdFloatAlign'>Batch ID</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <div className="input-group form-floating" style={{width:'310px'}}>
                    <input style={{height:'40px'}} disabled className="form-control mt-2 ipHeight" name='trainName' 
                      onChange={handleChange} value={ipDatas.trainName || ''}/>
                    <label className="sTimeLabel trainTopAlign">Trianing Name</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="form-floating" style={{width:'310px'}}>
                  <input style={{height:'40px'}} className='form-control secondTextSize' name='topic' id='topicId' placeholder='Topic'
                  onChange={handleChange} value={ipDatas.topic || ''}/>
                  <label className='topic_floatAlign'>Topic</label>
                </div>  
              </div>
            </div>
            <div className='flex'>
              <div ref={refBatchId} className='errorBacthId fontSize'>{error.errorBatchId}</div>
              <div ref={refTopic} className=' errorTopic fontSize'>{error.errorTopic}</div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4 mt-2">
                <div className="ms-3 form-floating">
                  <input style={{height:'40px'}} ref={subTopicId} className='form-control' name='subTopic' id='small' placeholder='Sub Topic' 
                   onChange={handleChange} value={ipDatas.subTopic || ''}/>
                  <label className='topic_floatAlign'>Sub Topic</label>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div style={{width:'310px'}} className='form-floating'>
                    <select style={{height:'40px'}} className="form-select tesxtSize"
                      name='trainerName' id="trainerNameId" onChange={handleChange} value={ipDatas.trainerName || ''}>
                      <option>Trainer Name</option>
                      {trainerName.map((data, i) => {
                       return (
                        <option key={i} value={data}>
                            {data}
                        </option>
                        );
                      })}
                    </select>
                    <label className='topic_floatAlign'>Trainer Name</label>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="form-group" style={{width:'310px'}}>
                <BsCalendarCheck style={{position: "absolute",top:'157px',left: "1000px",zIndex: 1}}/>
                <div className='form-floating' style={{width:'310px'}}>
                  <DatePicker selected={startDate} placeholderText="Start Date" className="form-control tesxtSize secondTextSize" 
                   id='startDateId' name='sDate' onChange={setStartDate}/>
                  <label className='sDateFloatAlign'>Start Date</label>
                </div>
                </div>
              </div>
            </div>
            <div className='flex'>
              <div ref={refSubTopic} className='errorBacthId fontSize'>{error.subTopic}</div>
              <div ref={refTrainerName} className=' errorTrainerName fontSize'>{error.errorTrainerName}</div>
              <div ref={refStartDate} className=' errorStartDate fontSize'>{error.errorStartDate}</div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="form-group ms-3 mt-2">
                <BsCalendarCheck style={{position: "absolute",top:'229px',left: "310px",zIndex: 1}}/>
                  <div style={{width:'312px'}} className='form-floating'>
                  <DatePicker selected={endDate} placeholderText="End Date" className="form-control tesxtSize secondTextSize" 
                   id='endDateId' name='eDate' onChange={setEndDate}/>
                   <label className='sDateFloatAlign'>End Date</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="form-group form-floating" style={{width:'310px'}}>
                  <input style={{height:'40px',paddingTop:'12px'}} type={'time'} className="form-control ipHeight" 
                   name='sTime' id="startTimeId" onChange={handleChange} value={ipDatas.sTime || ''} ></input>
                  <label className="sTimeLabel startTimeAlign">Start Time</label>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="form-group form-floating" style={{width:'310px'}}>
                  <input style={{height:'40px'}} type={'time'} id="endTimeId" 
                   name='eTime' className="form-control ipHeight" onChange={handleChange} value={ipDatas.eTime || ''}></input>
                  <label className="sTimeLabel startTimeAlign">End Time</label>
                </div>
              </div>
            </div>
            <div className='flex'>
                <div ref={refEndDate} className='errorBacthId fontSize'>{error.errorEndDate}</div>
                <div ref={refStartTime} className='errorStartTime fontSize'>{error.errorStartTime}</div>
                <div ref={refEndTime} className='errorEndTime fontSize'>{error.errorEndTime}</div>
            </div>
            <div className="row mt-4">
            <div className="col-md-4 mt-2">
                  <div className="form-floating" >
                    <select style={{height:'40px',width:'310px'}} className="form-select ms-3 mt-2 tesxtSize"
                     name='location' id="locationId" onChange={handleChange} value={ipDatas.location || ''}>
                      <option>Location</option>
                       {location.map((data, i) => {
                       return (
                       <option key={i} value={data}>{data}</option>
                        );
                      })}
                    </select>
                    <label className='loc_floatAlign'>Location</label>
                  </div>
                </div>
              <div className="col-md-4 mt-3">
                <div style={{width:'310px'}} className="form-floating" >
                    <select style={{height:'40px'}} className="form-select tesxtSize"
                      name='status' id="statusId" onChange={handleChange} value={ipDatas.status || ''}>
                      <option>Status</option>
                      <option>Inprogress</option>
                      <option>Pending</option>
                      <option>Incompleted</option>
                      <option>Completed</option>
                    </select>
                  <label className='topic_floatAlign'>Status</label>
                </div>
                </div>
              <div className="col-md-4">
              <div className="mt-3 form-floating">
                  <textarea style={{height:'80px',width:'310px'}} placeholder='Description' className='form-control tesxtSize secondTextSize'
                   name='desc' id='descId' onChange={handleChange} value={ipDatas.desc || ''}/>
                   <label className='topic_floatAlign'>Description</label>
              </div>
              </div>
            </div>
            <div className='flex'>
              <div ref={refLocation} className='errorLocation fontSize'>{error.errorLocation}</div>
              <div ref={refStatus} className=' errorStatus fontSize'>{error.errorStatus}</div>
              <div ref={refDesc} className=' errorDesc fontSize'>{error.errorDesc}</div>
            </div>
            <div style={{marginTop:'-20px'}} className='topMargin'>
            <button className="discardButt" style={{marginLeft:'375px'}} onClick={handleDiscard}>Discard</button>
            <button style={{ marginTop: "5px", marginLeft: "15px" }} className="submitButt" onClick={handleSubmit}>Submit</button>
            </div>
       </div>
    </div>
  )
}

export default AddScheduleDetails;
