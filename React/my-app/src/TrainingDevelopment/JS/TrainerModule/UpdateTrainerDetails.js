import '../../CSS/TrainerModule/UpdateTrainerDetails.css';
import Sidebar from '../../Sidebar/Sidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsCalendarCheck} from "react-icons/bs";
import {useNavigate, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateTrainerDetails = () => {

  const [array,newArray] = useState([])
  const [scheduleData,setScheduleDta] = useState([])
  const [ipValues,setIpValues] = useState({})

  let{BatchId} = useParams()
  let navigate = useNavigate()

  useEffect(()=>{
    loadDataById();
  },[])

  const handleChange = (e) =>{
    const {name,value} = e.target
    console.log(name,value);
    setIpValues(
      {...ipValues,
       [name]:value}
    )
  }

  const loadDataById = async() =>{
    const response = await axios.get('http://localhost:8080/updateTrainerDetails?BatchId='+BatchId)
    console.log("datas", response)  
    newArray(response.data.batchTrainingListById)
    setScheduleDta(response.data.scheduleDetailsById)
    setIpValues(response.data.scheduleDetailsById[0])
  }

  const handleUpdate = async() =>{
    console.log(ipValues);
    const response = await axios.put(`http://localhost:8080/updatingTrainingDetails/${BatchId}`,ipValues)
    console.log(response);
    Swal.fire({
      title: "Well Done!",
      text: "Trainer details has been updated successfully",
      icon: "success",
      customClass: "swal-size-sm",
      confirmButtonColor: "orange",
      confirmButtonText: "continue",
    }).then(()=>{
      navigate('/getTrainer')
    })
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

  return (
    <div>
      <Sidebar/>
      <div className='absolutes'>Trainer's Module</div>
      <div className='absolutes leftScheds leftTrainer' onClick={()=>navigate('/getTrainer')}>Trainer's Module &#62;</div>
       <div className='absolutes schedLefts leftTrainers'>Edit</div>
      {scheduleData.map((e,id)=>(
              <div key={id}>
       <div className="position" style={{paddingLeft:'1px',backgroundColor:'#F8F9FF',
              width: "83%",height: "500px"}}>
                <div style={{height:'430px'}} className="shadowBox">
            <div className="pt-2 ms-3 addBatch">Edit Schedule</div>
            <div className="mt-1 ms-3 required">
              Enter the required information below to update employee.
            </div>
            
            <div className="row">
              <div className="col-md-4">
                  <div className="form-group form-floating" style={{width:'310px'}} >
                  <input disabled style={{height:'40px'}} className="form-control ms-3 mt-2"
                    defaultValue={'Schedule 0'+e.id}/>
                  <label className="sTimeLabel topicAlign ms-3">Schedule ID</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <div className="input-group form-floating" style={{width:'310px'}}>                
                    <input disabled style={{height:'40px'}} className="form-select mt-2 tesxtSize"
                     defaultValue={'Batch '+e.BatchId}/>
                    <label className='sTimeLabel labeBatchALign'>Batch ID</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group" style={{width:'310px'}}>
                  <div className="input-group form-floating" style={{width:'310px'}}>                
                    <input disabled style={{height:'40px'}} className="form-select mt-2 tesxtSize"
                     defaultValue={e.TrainingName}/>
                    <label className='sTimeLabel labeBatchALign'>Training</label>
                  </div>
                </div>  
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="form-group form-floating ms-3 mt-1" style={{width:'310px'}}>
                  <input disabled style={{height:'40px'}} className='form-control'defaultValue={e.Topic}/>
                  <label className='sTimeLabel topicAlign'>Topic</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group form-floating" style={{width:'310px'}} >
                  <input disabled style={{height:'40px'}} className='form-control mt-1' defaultValue={e.SubTopic}/>
                  <label className='sTimeLabel topicAlign'>Sub Topic</label>    
                </div>
              </div>
              <div className="col-md-4">
              <div className="form-group" style={{width:'310px'}}>
                  <div className="input-group form-floating" style={{width:'310px'}}>                
                    <input disabled style={{height:'40px'}} className="form-select mt-1 tesxtSize" defaultValue={e.TrainerName}/>  
                    <label className='sTimeLabel paddingTopALign'>Trainers</label>
                  </div>
                </div>  
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4 mt-1">
                <div className="form-group" >
                  <div className="input-group form-floating" style={{width:'326px'}}>                
                    <input disabled style={{height:'40px'}} className="form-select ms-3 tesxtSize" defaultValue={e.Location}/>
                    <label className='sTimeLabel topicAlign ms-3'>Location</label>
                  </div>
                </div>  
              </div>
              <div className="col-md-4 mt-1">
                <div className="form-group form-floating" style={{width:'310px'}} >
                  <input disabled style={{height:'40px'}} className='form-control' defaultValue={finalResult+' Hrs'}/>
                  <label className='sTimeLabel topicAlign'>Duration</label>    
                </div>
              </div>
              <div className="col-md-4 mt-1">
                <BsCalendarCheck style={{position: "absolute",top:'206px',left:'1005px',zIndex: 1}}/>
                  <div className='form-floating' style={{width:'310px'}}>
                  <DatePicker disabled className="form-control" value={e.StartDate}/>
                  <label className='sTimeLabel sDateWAlign'>Start Date</label> 
                </div>
              </div>
            </div>
            <div className="row mt-4">
            <div className="col-md-4 mt-1">
                <div className="form-group form-floating ms-3" style={{width:'310px'}}>
                  <input type='time' disabled style={{height:'40px'}} className='form-control' defaultValue={e.StartTime}/>
                  <label className='sTimeLabel topicAlign'>Start Time</label>
                </div>
              </div>
              <div className="col-md-4 mt-1">
                <div className="form-group form-floating" style={{width:'310px'}}>
                  <input type='time' disabled style={{height:'40px'}} className='form-control' defaultValue={e.EndTime}/>
                  <label className='sTimeLabel topicAlign'>End Time</label>
                </div>
              </div>
              <div className="col-md-4 mt-1">
              <div className="form-group form-floating" style={{width:'310px'}}>
                  <textarea disabled style={{height:'80px'}} className='form-control' defaultValue={e.Description}/>
                  <label className='sTimeLabel topicAlign'>Description</label>
              </div>
             </div>
            </div>
            
            </div>
            <div className="shadowBox" style={{marginTop: "30px",height:'185px'}}> 
              <div className='pt-2 ps-3 batchMembFont'>Edit Trainer details</div>
              <div className='pt-2 ps-3 required'>Enter the required information below to update schedule</div>
              <div className="row mt-4">
              <div className="col-md-4 mt-1">
                <div className="form-group">
                  <div className="input-group form-floating" style={{width:'326px'}}>                
                    <select style={{height:'40px'}} className="form-select ms-3 tesxtSize" name='Status' 
                    defaultValue={e.Status} value={ipValues.Status} onChange={handleChange}>
                      <option>Status</option>
                      <option>Inprogress</option>
                      <option>Pending</option>
                      <option>Incompleted</option>
                      <option>Completed</option>
                    </select>
                    <label className='sTimeLabel topicAlign ms-3'>Status</label>
                  </div>
                </div>  
              </div>
              <div className='col-md-4'>
                <div className='trainAttend'>Trainers's Attendance</div>
                <br/>
                 <div className='adjustRadButOuter'>
                  <input type={'radio'} name='TrainerStatus' className='firstRadio'defaultChecked={e.TrainerStatus === 'present'}
                   checked={ipValues.TrainerStatus === 'present'} value='present' onChange={handleChange}/>
                  <label className='firstRadioLabel'>Present</label>
                  <input type={'radio'} name='TrainerStatus' className='secondRadio' defaultChecked={e.TrainerStatus === 'Absent'}
                   checked={ipValues.TrainerStatus === 'Absent'} value='Absent' onChange={handleChange}/>
                  <label className='secondRadioLabel'>Absent</label>
                 </div>
              </div>
              <div className='col-md-4'>
               <div className="form-group form-floating" style={{width:'310px'}}>
                  <textarea style={{height:'80px'}} className='form-control' name='Description' defaultValue={e.Description}
                   value={ipValues.Description} onChange={handleChange}/>
                  <label className='sTimeLabel topicAlign'>Remarks</label>
               </div>
              </div>
              </div>
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
            ))}
    </div>
  )
}

export default UpdateTrainerDetails;
