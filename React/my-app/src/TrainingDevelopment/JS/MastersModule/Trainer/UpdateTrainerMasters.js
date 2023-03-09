import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Sidebar/Sidebar';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateTrainerMasters = () => {

    const [data,setData] = useState({})

    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
      loadDataById()
    },[])

    var currentDate = new Date().toLocaleDateString().replaceAll('/','-')

    const handleTrainerChange = (e) =>{
      const {name,value} = e.target;
      setData({
        ...data,
        [name] : value,
        'updatedDate' : currentDate
      })
      console.log(name,value);
    }

    const loadDataById = async() =>{
        let response = await axios.get(`http://localhost:8080/getTrainerNameDetailsById/?id=`+id)
        console.log(response);
        setData(response.data[0])
    }
    
    const handleTrainerUpdate = async() =>{
        console.log(data);
        let response = await axios.put(`http://localhost:8080/updateTrainerNameDetailsById/${id}`,data)
        console.log(response);
        Swal.fire({
            title: "Well Done!",
            text: "Trainer details has been updated successfully",
            icon: "success",
            customClass: "swal-size-sm",
            confirmButtonColor: "orange",
            confirmButtonText: "continue",
          }).then(()=>{
            navigate('/getTrainerMasters')
          })
    }
  return (
    <div>
      <Sidebar/>
      <div className='scheduleAlign'>Master's Trainer</div>
      <div className='scheduleAlign leftSched leftTrainer' onClick={()=>navigate('/getTrainerMasters')}>Master's Trainer &#62;</div>
       <div className='scheduleAlign schedLeft leftTrainers'>&nbsp;Edit Trainer</div>
       <div className="shadowBox position" style={{paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "500px"}}>
              <div className="mt-4 ms-3 required">
              Enter the required information below to add a new location.
            </div>
            <div className="mt-4 ms-3 addBatch">Update Trainer</div>
            <div className="row ">
              <div className="col-md-4 form-floating">
                <input className="form-control ms-3 mt-2 filedSize fontAdjust" placeholder='Trainer'
                name='trainerName' onChange={handleTrainerChange} value={data.trainerName || ''}/>
                <label className='floatCity'>Trainer Name</label>
              </div>     
              <div className='col-md-4 subButtAdjust'>
              <button style={{height:'32px'}} className="submitBlueButt" onClick={handleTrainerUpdate}>Update</button>
              </div>    
            </div>
       </div>
    </div>
  )
}

export default UpdateTrainerMasters;
