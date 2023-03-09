import Sidebar from '../../../Sidebar/Sidebar';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddDesgMasters = () => {

    const [desg,setDesg] = useState({})

  let navigate = useNavigate()

  var currentDate = new Date().toLocaleDateString().replaceAll('/','-')
  console.log(currentDate);

    //trainer
  const handleDesgChange = (e) =>{
    const {name,value} = e.target;
    setDesg(
      {...desg,
       [name] : value,
       status : 'ACTIVE',
       'date' : currentDate,
       'updateDate' : currentDate,
       'createdBy' : 'Admin'
      }
    )
    console.log(name,value);
  }

  const handleDesgSubmit = async() =>{
    console.log(desg);
    if(desg.designation){
    let response  = await axios.post('http://localhost:8080/sendDesgDetails',desg)
    console.log(response);
    Swal.fire({
        title: "Successfully submitted!",
        text: "Click ok to See details!",
        icon: "success",
        customClass: "swal-size-sm"
      }).then(() => {
         navigate("/getDesgMasters");
      });
    }
  }

  return (
    <div>
      <Sidebar/>
      <div className='scheduleAlign'>Master's Designation</div>
      <div className='scheduleAlign leftSched leftDesg' onClick={()=>navigate('/getDesgMasters')}>Master's Designation &#62;</div>
       <div className='scheduleAlign schedLeft leftDesgs'>&nbsp;Add Designation</div>
       <div className="shadowBox position" style={{paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "500px"}}>
              <div className="mt-4 ms-3 required">
              Enter the required information below to add a new designation.
            </div>
            <div className="mt-4 ms-3 addBatch">Add Designation</div>
            <div className="row ">
              <div className="col-md-4 form-floating">
                <input className="form-control ms-3 mt-2 filedSize fontAdjust" placeholder='Designation'
                name='designation' onChange={handleDesgChange} value={desg.designation || ''}/>
                <label className='floatCity'>Designation</label>
              </div>     
              <div className='col-md-4 subButtAdjust'>
              <button className="submitBlueButt locSubmit" onClick={handleDesgSubmit}>Submit</button>
              </div>    
            </div>
            
       </div>
    </div>
  )
}

export default AddDesgMasters;
