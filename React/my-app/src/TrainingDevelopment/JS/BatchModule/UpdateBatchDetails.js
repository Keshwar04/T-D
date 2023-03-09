import Sidebar from '../../Sidebar/Sidebar';
import "../../CSS/BatchModule/UpdateBatchDetails.css";
import {useState,useEffect} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { BsCalendarCheck } from "react-icons/bs";
import {MdOutlineDelete} from "react-icons/md";
import Swal from 'sweetalert2';
import { useParams,useNavigate } from 'react-router-dom';

const UpdateBatchDetails = () => {
  const [training, setTraining] = useState([]);
  const [data,setData] = useState([]);
  const [array,newArray] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [startDate,setStartDate] = useState();
  const [endDate,setEndDate] = useState();

  let {id} = useParams();
  let{batchId}=useParams();
  let navigate = useNavigate();

  useEffect(() => {
    trainingDetails();
    console.log(id, batchId);
    loadDataById();
  },[]);

  const setDataForUpdateState=(e,name) => {
    if(name ==="startDate"){
      setStartDate(e);
    }else if(name === "endDate"){
      setEndDate(e);
    }
    
    let date= e.toLocaleDateString().replaceAll('/','-');
    data[0][name] = date;
   setData(data);
  }

  ///onChange
  const handleChange = (e) =>{
    const {name,value} = e.target;
    console.log(name,value);
    setUpdatedData({
      ...updatedData,
      [name] : value
    })
  }

  ///Training SELECT tag
  const trainingDetails = () => {
    axios.get("http://localhost:8080/training").then((response) => {
        const data = [];
        for (var i = 0; i < response.data.training.length; i++) {
          const { training } = response.data.training[i];
          data.push(training);
        }
        setTraining(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  ///get
  const loadDataById = async() =>{
    const dataById = await axios.get('http://localhost:8080/getBatchIdDetails?id='+id+'&batchId='+batchId)
    console.log(dataById.data)  
    setData(dataById.data.batchListById)
    setUpdatedData(dataById.data.batchListById[0])
    newArray(dataById.data.batchTrainingListById)
    console.log(updatedData);
  }
 
  ///update
  const handleUpdate = async() =>{
    console.log(updatedData);
    const response = await axios.put(`http://localhost:8080/updateBatchDetails/${id}`, updatedData)
    console.log(response);
    Swal.fire({
      title: "Well Done!",
      text: "Batch has been updated successfully",
      icon: "success",
      customClass: "swal-size-sm",
      confirmButtonColor: "orange",
      confirmButtonText: "continue",
    }).then(()=>{
      navigate('/getBatch')
    })
  }

  ///Delete
  const handleDelete = async(id) =>{
    const response = await axios.delete(`http://localhost:8080/updateBatchDeleteDetails/${id}`)
    console.log(response);
  }
  
  return (
    <div>
      <Sidebar/>
      <div className='minusMargin'>
      <div style={{display:'flex'}}>
        <div className='batchHead'>Batch</div>
        <div className='topMar greater minusMar leftBatMar' onClick={()=>navigate('/getBatch')}>Batch &#62;</div>
         <div className='topMar minusMar'>&nbsp;Update Batch</div>
         </div>
      <div className='whiteBackground'>
        <div className='editBatch ms-3 pt-2'>Edit Batch</div>
        <div className='blurtext ms-3 mt-1'>Enter the required information below to update Batch.</div>
        {data.map((updated,id)=>( 
              <div key={id}>
                <div className='row'>
          <div className='col-4 form-floating'>     
               <select style={{height:'40px',fontSize:'13.3px'}} disabled className="form-select ms-3 mt-4" name="trainingName"
                    id="floatingInput" defaultValue={updated.trainingName} value={updatedData.trainingName} onChange={handleChange}>
                      <option value="">Training Name</option>
                      {training.map((data, i) => {
                        return (
                          <option key={i} value={data}> {data}</option>
                      )})}
                    </select>
                    <label for="floatingInput" className='tAlign' >Training Name</label>
          </div>
          <div className="col-md-4 ">
                <div className="form-group form-floating"  style={{width:'310px'}}>
                  {updated.batchId <= 9 ?
                  <input style={{height:'40px',fontSize:'13.3px'}} disabled type={'text'} name='batchId' id="floatingInput" className="form-control ms-4 mt-4" 
                  defaultValue={'Batch 0'+updated.batchId}/>
                  :
                  <input style={{height:'40px',fontSize:'13.3px'}} disabled type={'text'} name='batchId' id="floatingInput" className="form-control ms-4 mt-4" 
                  defaultValue={'Batch '+updated.batchId}/>
                  }
                  <label for="floatingInput" className="sTimeLabel adjustAlign">Batch Id</label>
                </div>  
              </div>
              <div className="col-md-4">
                <div className="form-p">
                 <div style={{width:'302px'}} className='form-floating mb-3 ms-2 mt-4'>
                  <select style={{height:'40px',fontSize:'13.3px'}} name='batchLead' id="floatingInput" 
                     className='form-select' defaultValue={updated.batchLead} value={updatedData.batchLead} onChange={handleChange}>
                   <option value='project manager'>Project Manager</option>
                  </select>
                  <label for="floatingInput" className='statusFloat' >Batch Lead</label>
                </div>
                </div>
              </div>
        </div>
        <div className='row'>
        <div className="col-md-4 mt-3 ms-3" style={{ position: "relative" }}>
                <div className="form-group" >
                <BsCalendarCheck style={{position: "absolute",top:'11px',right: "30px",zIndex: 1}}/>
                  <div style={{width:'335px'}} className="form-floating">
                  <DatePicker id="floatingInput" className="form-control" name="startDate" selected={startDate} 
                   value={updated.startDate}  onChange={(e) =>setDataForUpdateState(e,'startDate')}/>
                  <label for="floatingInput" className="sTimeLabel sDateAlign">Start Date</label>
                </div>
                </div>  
              </div>
              <div className="col-md-4 mt-3 ms-2" style={{ position: "relative" }}>
                <div className="form-group" >
                <BsCalendarCheck style={{position: "absolute",top:'11px',right: "55px",zIndex: 1}}/>
                  <div style={{width:'310px'}} className="form-floating">
                  <DatePicker id='endDatepicker' className="form-control" name="endDate" value={updated.endDate} selected={endDate} onChange={(e) =>setDataForUpdateState(e,'endDate')}/>
                  <label className="sTimeLabel sDateAlign">End Date</label>
                </div>
                </div>
              </div>
              <div className="col-md-4 mt-0 ipStartTime">
                <div className="form-group form-floating" style={{width:'302px'}}>
                  <input style={{height:'40px',fontSize:'13.3px'}} type={'time'} name='Time' id="floatingInput" className="form-control ipHeight" defaultValue={updated.Time} value={updatedData.Time} onChange={handleChange}></input>
                  <label for="floatingInput" className="sTimeLabel sTimeAdjust">Start Time</label>
                </div>
              </div>
        </div>
        <div className='row ms-1 minusTime'>
        <div className="col-md-4">
                <div className="form-group form-floating">
                  <input style={{height:'40px',fontSize:'13.3px'}} type={'time'} name='endTime' id="floatingInput" className="form-control ipHeight" 
                   defaultValue={updated.endTime} value={updatedData.endTime} onChange={handleChange}></input>
                  <label for="floatingInput" className="sTimeLabel fontSizes ">End Time</label>
                </div>
        </div>
        <div className='col-md-4 leftMove'>        
          <div className='form-floating mb-3' style={{width:'310px'}}>
            <select style={{height:'40px',fontSize:'13.3px'}} name='status' id="floatingInput" className='form-select' 
             defaultValue={updated.status} value={updatedData.status} onChange={handleChange}>
                  <option>Active</option>
                  <option>Inactive</option>
            </select>
            <label for="floatingInput" className='statusFloat'>Status</label>
          </div>
        </div>
      </div>
     </div>
    ))}
      </div>
      <div className='secondWhiteBackground'>
        <div className='ms-3 pt-3'>Batch Members</div>
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
      <button style={{position:'relative',left:'-156px'}} className="discardButt">Discard</button>
      <button style={{ marginTop: "5px", marginLeft: "-125px" }} className="submitButt" onClick={handleUpdate}>Update</button>
      </div>
      </div>
    </div>
  )
}

export default UpdateBatchDetails;
