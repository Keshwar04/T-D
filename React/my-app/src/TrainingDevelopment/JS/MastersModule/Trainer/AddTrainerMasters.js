import Sidebar from '../../../Sidebar/Sidebar';
import React,{useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddTrainerMasters = () => {

  const [trainer,setTrainer] = useState({})

  let navigate = useNavigate()

  var currentDate = new Date().toLocaleDateString().replaceAll('/','-')
  console.log(currentDate);

    //trainer
  const handleTrainerChange = (e) =>{
    const {name,value} = e.target;
    setTrainer(
      {...trainer,
       [name] : value,
       status : 'ACTIVE',
       'date' : currentDate,
       'updateDate' : currentDate,
       'createdBy' : 'Admin'

      }
    )
    console.log(name,value);
  }

  const handleTrainerSubmit = async() =>{
    console.log(trainer);
    if(trainer.trainer){
    let response  = await axios.post('http://localhost:8080/sendTrainerDetails',trainer)
    console.log(response);
    Swal.fire({
        title: "Successfully submitted!",
        text: "Click ok to See details!",
        icon: "success",
        customClass: "swal-size-sm"
      }).then(() => {
         navigate("/getTrainerMasters");
      });
    }
  }

  return (
    <div>
      <Sidebar/>
      <div className='scheduleAlign'>Master's Trainer</div>
      <div className='scheduleAlign leftSched leftTrainer' onClick={()=>navigate('/getTrainerMasters')}>Master's Trainer &#62;</div>
       <div className='scheduleAlign schedLeft leftTrainers'>&nbsp;Add Trainer</div>
       <div className="shadowBox position" style={{paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "500px"}}>
              <div className="mt-4 ms-3 required">
              Enter the required information below to add a new trainer.
            </div>
            <div className="mt-4 ms-3 addBatch">Add Trainer</div>
            <div className="row ">
              <div className="col-md-4 form-floating">
                <input className="form-control ms-3 mt-2 filedSize fontAdjust" placeholder='Trainer'
                name='trainer' onChange={handleTrainerChange} value={trainer.trainer || ''}/>
                <label className='floatCity'>Trainer Name</label>
              </div>     
              <div className='col-md-4 subButtAdjust'>
              <button className="submitBlueButt locSubmit" onClick={handleTrainerSubmit}>Submit</button>
              </div>    
            </div>
            
       </div>
    </div>
  )
}

export default AddTrainerMasters;
