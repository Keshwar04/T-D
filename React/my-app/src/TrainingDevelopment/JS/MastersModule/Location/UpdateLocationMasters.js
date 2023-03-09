import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Sidebar/Sidebar';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateLocationMasters = () => {

    const [data,setData] = useState({})

    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
      loadDataById()
    },[])

    var currentDate = new Date().toLocaleDateString().replaceAll('/','-')

    const handleLocationChange = (e) =>{
      const {name,value} = e.target;
      setData({
        ...data,
        [name] : value,
        'updatedDate' : currentDate
      })
      console.log(name,value);
    }

    const loadDataById = async() =>{
        let response = await axios.get(`http://localhost:8080/getLocationDetailsById/?id=`+id)
        console.log(response);
        setData(response.data[0])
    }
    
    const handleLocationUpdate = async() =>{
        console.log(data);
        let response = await axios.put(`http://localhost:8080/updateLocationDetailsById/${id}`,data)
        console.log(response);
        Swal.fire({
            title: "Well Done!",
            text: "Location has been updated successfully",
            icon: "success",
            customClass: "swal-size-sm",
            confirmButtonColor: "orange",
            confirmButtonText: "continue",
          }).then(()=>{
            navigate('/getLocationMasters')
          })
    }
  return (
    <div>
      <Sidebar/>
      <div className='scheduleAlign'>Master's Location</div>
      <div className='scheduleAlign leftSched leftLoc' onClick={()=>navigate('/getLocationMasters')}>Master's Location &#62;</div>
       <div className='scheduleAlign schedLeft leftLocs'>&nbsp;Edit Location</div>
       <div className="shadowBox position" style={{paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "500px"}}>
              <div className="mt-4 ms-3 required">
              Enter the required information below to add a new location.
            </div>
            <div className="mt-4 ms-3 addBatch">Add Location</div>
            <div className="row ">
              <div className="col-md-4 form-floating">
                <input className="form-control ms-3 mt-2 filedSize fontAdjust" placeholder='Trainer'
                name='city' onChange={handleLocationChange} value={data.city || ''}/>
                <label className='floatUpdateCity'>City</label>
              </div> 
              <div className="col-md-4 form-floating">
                <input className="form-control ms-3 mt-2 filedSize fontAdjust" placeholder='Trainer'
                name='state' onChange={handleLocationChange} value={data.state || ''}/>
                <label className='floatUpdateSate'>State</label>
              </div>     
              <div className='col-md-4 subButtAdjust'>
              <button style={{height:'32px'}} className="submitBlueButt" onClick={handleLocationUpdate}>Update</button>
              </div>    
            </div>
       </div>
    </div>
  )
}

export default UpdateLocationMasters;
