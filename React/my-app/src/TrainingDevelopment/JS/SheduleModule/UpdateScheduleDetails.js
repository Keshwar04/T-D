import Sidebar from '../../Sidebar/Sidebar';
import '../../CSS/ScheduleModule/UpdateScheduleDetails.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarCheck } from "react-icons/bs";
import {MdOutlineDelete} from "react-icons/md";
import {useParams,useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateScheduleDetails = () => {

  const [array,newArray] = useState([]);
  const [savedData,setSavedData] = useState([]);
  const [batchIds,setBatchIds] = useState([]);
  const [ipValues,setIpValues] = useState({})
  const [startDate,setStartDate] = useState();
  const [endDate,setEndDate] = useState();
  const [data,setData] = useState([]);
  const [trainerName,setTrainerName] = useState([])
  //file upload
  const [file,setFile] = useState()

  let navigate = useNavigate();

  let {id} = useParams();
  let {BatchId} = useParams();

  useEffect(()=>{
    loadDataById();
    console.log(id,BatchId);
    loadData()
    trainerNameDetails()
  },[])

  const handleChange = (e) =>{
    const {name,value} = e.target;
    //console.log(ipValues);
    console.log(name,value);
      setIpValues({
        ...ipValues,
        [name]: value
      })
  }

  const loadDataById = async() =>{
    const response = await axios.get('http://localhost:8080/getScheduleBtyIdDetails?id='+id+'&batchId='+BatchId)
    console.log(response.data)  
    setData(response.data.scheduleDetailsById)
    setSavedData(response.data.scheduleDetailsById)
    setIpValues(response.data.scheduleDetailsById[0])
    newArray(response.data.batchTrainingListById)
  }

  const loadData = async() => {
    const response = await axios.get('http://localhost:8080/batchListDetails')
        //setTrainingName(response.data)
        const data = [];
        for (var i = 0; i < response.data.length; i++) {
          //const { batchId } = secondResponse.data[i];
          let batchId = response.data[i].batchId
          data.push(batchId);
        }
        setBatchIds(data);
  };

  ///Delete
  const handleDelete = (id) =>{
    Swal.fire({
      title: "Are you sure !",
      text: "If you proceed, The changes has been undone",
      icon: "warning",
      customClass: "swal-size-sm",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
    const response = await axios.delete(`http://localhost:8080/deleteBatchDeleteDetails/${id}`)
    console.log(response);
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
      customClass: "swal-size-sm"
    });
    loadDataById();
  }
 });
}

  const setDataForUpdateState=(e,name) => {
    if(name ==="StartDate"){
      console.log(e);
      setStartDate(e);
    }else if(name === "EndDate"){
      setEndDate(e);
    }
    
    let date= e.toLocaleDateString().replaceAll('/','-');
    data[0][name] = date;
    //setData(data);
  }

  ///update
  const handleUpdate = async() =>{
        console.log(ipValues);
        let response = await axios.put(`http://localhost:8080/updatingScheduleDetails/${id}`, ipValues)
        console.log(response);
        Swal.fire({
          title: "Well Done!",
          text: "Batch has been updated successfully",
          icon: "success",
          customClass: "swal-size-sm",
          confirmButtonColor: "orange",
          confirmButtonText: "continue",
        }).then(()=>{
          navigate('/getSchedule')
        })
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

  const fileUpload = async() =>{
       const data = new FormData();
       //data.append('name',names)
       data.append('file',file)
       console.log(data);

       let response = await axios.post('http://localhost:8080/fileUpload',data)
       console.log(response);
  }
  let handleFileChange = (e) =>{
    const file = e.target.files[0]
    console.log(file);
    setFile(file)
  }

  let discardValues = () =>{
    setIpValues('')
  }

  return (
    <div>
       <Sidebar/>
       <div className='absolutes'>Schedule</div>
       <div className='absolutes leftScheds' onClick={()=>navigate('/getSchedule')}>Schedule &#62;</div>
       <div className='absolutes schedLefts'>Update Schedule</div>
       <div className="position" style={{paddingLeft:'1px',backgroundColor:'#F8F9FF',
              width: "83%",height: "500px"}}>
                <div style={{height:'430px'}} className="shadowBox">
            <div className="pt-2 ms-3 addBatch">Edit Schedule</div>
            <div className="mt-1 ms-3 required">
              Enter the required information below to update employee.
            </div>
            {savedData.map((u,i)=>(  
             <div key={i}>
            <div className="row">
              <div className="col-md-4">
                  <div className="form-group form-floating" style={{width:'310px'}} >
                  {u.id<10 ? <input disabled style={{height:'40px'}} className="form-control ms-3 mt-2"
                   name='scheduleId' defaultValue={'Schedule 0'+u.id} value={ipValues.scheduleId} onChange={handleChange}/> : 
                  <input disabled style={{height:'40px'}} className="form-control ms-3 mt-2"
                   name='ScheduleId' defaultValue={'Schedule'+u.id} value={ipValues.scheduleId} onChange={handleChange}/>
                  }
                  <label className="sTimeLabel topicAlign ms-3">Schedule ID</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <div className="input-group form-floating" style={{width:'310px'}}>
                    <select style={{height:'40px'}} className="form-select tesxtSize mt-2"
                     name='BatchId' defaultValue={u.BatchId} value={ipValues.BatchId || ''} onChange={handleChange}>
                      {batchIds.map((data, i) => (
                        data <=9 ? 
                          <option key={i} value={data}>
                            Batch 0{data}
                          </option>
                        :
                          <option key={i} value={data}>
                          Batch{data}
                          </option>
                        ))}
                    </select>
                    <label className='sTimeLabel mt-0'>Batch ID</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group" style={{width:'310px'}}>
                  <div className="input-group form-floating" style={{width:'310px'}}>                
                    <input disabled style={{height:'40px'}} className="form-select mt-2 tesxtSize" name='TrainingName'
                      defaultValue={u.TrainingName} value={ipValues.TrainingName || ''} onChange={handleChange}/>
                    <label className='sTimeLabel trainingAdjust'>Training Name</label>
                  </div>
                </div>  
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="form-group form-floating ms-3" style={{width:'310px'}}>
                  <input style={{height:'40px'}} className='form-control tesxtSize' name='Topic' defaultValue={u.Topic}
                   value={ipValues.Topic || ''} onChange={handleChange}/>
                  <label className='sTimeLabel topicAlign'>Topic</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group form-floating" style={{width:'310px'}} >
                  <input style={{height:'40px'}} className='form-control' name='SubTopic' defaultValue={u.SubTopic}
                   value={ipValues.SubTopic || ''} onChange={handleChange}/>
                  <label className='sTimeLabel topicAlign'>Sub Topic</label>    
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group form-floating" style={{width:'310px'}} >
                  <select style={{height:'40px',fontSize:'13px'}} className='form-select' name='TrainerName' 
                    defaultValue={u.TrainerName || ''} onChange={handleChange} value={ipValues.TrainerName}>
                   {trainerName.map((data,i) => {
                  return (
                    <option key={i} style={{ fontSize: "13.5px" }} defaultValue={data}> {data}</option>
                    );
                   })}
                  </select>
                  <label className='sTimeLabel topicAlign'>Trainer Name</label>    
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">       
                <BsCalendarCheck style={{position: "absolute",top:'196px',left: "297px",zIndex: 1}}/>
                  <div className='form-floating ms-3' style={{width:'310px'}}>
                  <DatePicker className="form-control" selected={startDate} value={u.StartDate}
                   name='StartDate' onChange={(e) =>setDataForUpdateState(e,'StartDate')}/>
                  <label className='sTimeLabel sDateWAlign'>Start Date</label> 
                </div>
              </div>
              <div className="col-md-4">
                <BsCalendarCheck style={{position: "absolute",top:'196px',left:'645px',zIndex: 1}}/>
                  <div className='form-floating' style={{width:'310px'}}>
                  <DatePicker className="form-control" selected={endDate} value={u.EndDate}
                   name='EndDate' onChange={(e) =>setDataForUpdateState(e,'EndDate')}/>
                  <label className='sTimeLabel sDateWAlign'>End Date</label> 
                </div>
              </div>
              <div className="col-md-4">
                  <div className="form-group form-floating" style={{width:'310px'}}>
                    <input type={'time'} style={{height:'40px'}} className="form-control" name='StartTime' 
                    defaultValue={u.StartTime} value={ipValues.StartTime || ''} onChange={handleChange}/>
                    <label className='sTimeLabel topicAlign'>Start Time</label>
                  </div>
              </div>
            </div>
            <div className="row mt-4">
            <div className="col-md-4">
                <div className="form-group form-floating ms-3" style={{width:'310px'}}>
                  <input type='time' style={{height:'40px'}} className='form-control' name='EndTime'
                  defaultValue={u.EndTime} value={ipValues.EndTime || ''}  onChange={handleChange}/>
                  <label className='sTimeLabel topicAlign'>End Time</label>
                </div>
              </div>
              <div className="col-md-4">
               <div className="form-group" style={{width:'310px'}}>
                  <div className="input-group form-floating" style={{width:'310px'}}>                
                    <select style={{height:'40px'}} className="form-select tesxtSize" name='Location'
                     defaultValue={u.Location} value={ipValues.Location || ''} onChange={handleChange}>
                      <option>Training Room</option>
                    </select>
                    <label className='sTimeLabel'>Location</label>
                  </div>
                </div>  
              </div>
              <div className="col-md-4">
               <div className="form-group" style={{width:'310px'}}>
                  <div className="input-group form-floating" style={{width:'310px'}}>                
                    <select style={{height:'40px'}} className="form-select tesxtSize" name='Status'
                     defaultValue={u.Status} value={ipValues.Status || ''} onChange={handleChange}>
                      <option>Status</option>
                      <option>Inprogress</option>
                      <option>Pending</option>
                      <option>Incompleted</option>
                      <option>Completed</option>
                    </select>
                    <label className='sTimeLabel'>Status</label>
                  </div>
                </div>  
              </div>
            </div>
            <div className="row spaceAdjust">
             <div className="col-md-4">
              <div className="form-group form-floating ms-3 topMarginAlign">
                  <textarea style={{height:'80px',width:'310px'}} className='form-control' name='Description'
                  defaultValue={u.Description} value={ipValues.Description || ''} onChange={handleChange}/>
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
                 <td>1 yr &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <MdOutlineDelete style={{ cursor: "pointer" }} className="delete" onClick={()=>handleDelete(e.id)}/></td>
              </tr>
             ))}
           </tbody>
              </table>
              
              <button className="discardButt" style={{marginLeft:'375px'}} onClick={discardValues}>Discard</button>
              <button style={{ marginTop: "5px", marginLeft: "15px" }} className="submitButt" onClick={handleUpdate}>Update</button>
            </div>
       </div> 
       {/* <div className='row'>
                <div className='col-3'>
              <input type='file' accept='.jpeg' className='form-control' onChange={handleFileChange}/>
              </div>
              <div className='col-3'>
              <button onClick={fileUpload}>upload</button>
              </div>
        </div>   */}
    </div>
  )
}

export default UpdateScheduleDetails;
