import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Sidebar/Sidebar';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateDesgMasters = () => {

    const [data,setData] = useState({})

    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
      loadDataById()
    },[])

    var currentDate = new Date().toLocaleDateString().replaceAll('/','-')

    const handleDesgChange = (e) =>{
      const {name,value} = e.target;
      setData({
        ...data,
        [name] : value,
        'updatedDate' : currentDate
      })
      console.log(name,value);
    }

    const loadDataById = async() =>{
        let response = await axios.get(`http://localhost:8080/getDesgDetailsById/?id=`+id)
        console.log(response);
        setData(response.data[0])
    }
    
    const handleDesgUpdate = async() =>{
        console.log(data);
        let response = await axios.put(`http://localhost:8080/updateDesgDetailsById/${id}`,data)
        console.log(response);
        Swal.fire({
            title: "Well Done!",
            text: "Designation has been updated successfully",
            icon: "success",
            customClass: "swal-size-sm",
            confirmButtonColor: "orange",
            confirmButtonText: "continue",
          }).then(()=>{
            navigate('/getDesgMasters')
          })
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
              Enter the required information below to add a new location.
            </div>
            <div className="mt-4 ms-3 addBatch">Add Designation</div>
            <div className="row ">
              <div className="col-md-4 form-floating">
                <input className="form-control ms-3 mt-2 filedSize fontAdjust"
                name='designation' onChange={handleDesgChange} value={data.designation || ''}/>
                <label className='floatCity'>Designation</label>
              </div>     
              <div className='col-md-4 subButtAdjust'>
              <button style={{height:'32px'}} className="submitBlueButt" onClick={handleDesgUpdate}>Update</button>
              </div>    
            </div>
       </div>
    </div>
  )
}

export default UpdateDesgMasters;
