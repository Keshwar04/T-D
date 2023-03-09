import Sidebar from '../../../Sidebar/Sidebar';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddTrainingMasters = () => {

  const [training,setTraining] = useState({})
  const [imageStr, setImageStr] = useState("")

  let navigate = useNavigate()

  var currentDate = new Date().toLocaleDateString().replaceAll('/','-')
  console.log(currentDate);

    //trainer
  const handleTrainingChange = (e) =>{
    const {name,value} = e.target;
    if(e.target.files){
      imageUploaded();
    }
    setTraining(
      {...training,
       [name] : value,
       status : 'ACTIVE',
       'date' : currentDate,
       'updateDate' : currentDate,
       'createdBy' : 'Admin'
      }
    )
    console.log(name,value);
  }

  function imageUploaded() {
    var file = document.querySelector(
    'input[type=file]')['files'][0];
  
    var reader = new FileReader();
    console.log("next");
      
    reader.onload = function () {
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        //let imageBase64Stringsep = base64String;
  
        // alert(imageBase64Stringsep);
        setTimeout(() => {
        setImageStr(base64String);
        console.log(base64String);
        }, 500);
    }
    reader.readAsDataURL(file);
  }

  const handleTrainingSubmit = async() =>{
    training.img = imageStr;
    console.log(training);
    if(training.training){
    let response  = await axios.post('http://localhost:8080/sendTrainingDetails',training)
    console.log(response);
    Swal.fire({
        title: "Successfully submitted!",
        text: "Click ok to See details!",
        icon: "success",
        customClass: "swal-size-sm"
      }).then(() => {
         navigate("/getTrainingMasters");
      });
    }
  }

  return (
    <div>
      <Sidebar/>
      <div className='scheduleAlign'>Master's Training</div>
      <div className='scheduleAlign leftSched leftTraining' onClick={()=>navigate('/getTrainingMasters')}>Master's Training &#62;</div>
       <div className='scheduleAlign schedLeft leftTrainings'>&nbsp;Add Training</div>
       <div className="shadowBox position" style={{paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "500px"}}>
              <div className="mt-4 ms-3 required">
              Enter the required information below to add a new training.
            </div>
            <div className="mt-4 ms-3 addBatch">Add Training</div>
            <div className="row ">
              <div className="col-md-4 form-floating">
                <input className="form-control ms-3 mt-2 filedSize fontAdjust" placeholder='Training'
                 name='training' onChange={handleTrainingChange} value={training.training || ''}/>
                <label className='floatCity'>Training</label>
              </div>     
              <div className='col-md-4'>
                <input style={{width:'200px'}} type={'file'} name='img' className='form-control mt-2' onChange={handleTrainingChange}/>
              </div>
              <div className='col-md-4 subButtAdjust'>
              <button style={{height:'35px'}} className="submitBlueButt" onClick={handleTrainingSubmit}>Submit</button>
              </div>    
            </div>
            
       </div>
    </div>
  )
}

export default AddTrainingMasters;
