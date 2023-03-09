import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Sidebar/Sidebar';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { height } from '@mui/system';

const UpdateTrainingMasters = () => {

    const [data,setData] = useState({})
    const [imageStr, setImageStr] = useState("")

    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
      loadDataById()
    },[])

    const loadDataById = async() =>{
      let response = await axios.get(`http://localhost:8080/getTrainingNameDetailsById/?id=`+id)
      console.log(response);
      setData(response.data[0])
  }

    var currentDate = new Date().toLocaleDateString().replaceAll('/','-')

    const handleTrainingChange = (e) =>{
      const {name,value} = e.target;
      setData({
        ...data,
        [name] : value,
        'updatedDate' : currentDate,
        'image' : data.image
      })
      console.log(name,value);
      if(e.target.files){
        imageUploaded();
      }
      console.log(data);
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
          
          //data.image = base64String;
          console.log(base64String);
          console.log(data);
          setData({
            ...data,
            'image':base64String
          })
      }
      reader.readAsDataURL(file);
    }

    console.log(imageStr);

    const handleTrainingUpdate = async() =>{
        console.log(data);
        let response = await axios.put(`http://localhost:8080/updateTrainingNameDetailsById/${id}`,data)
        console.log(response);
        Swal.fire({
            title: "Well Done!",
            text: "Training has been updated successfully",
            icon: "success",
            customClass: "swal-size-sm",
            confirmButtonColor: "orange",
            confirmButtonText: "continue",
          }).then(()=>{
            navigate('/getTrainingMasters')
          })
    }
  return (
    <div>
      <Sidebar/>
      <div className='scheduleAlign'>Master's Trainer</div>
      <div className='scheduleAlign leftSched leftTraining' onClick={()=>navigate('/getTrainingMasters')}>Master's Training &#62;</div>
       <div className='scheduleAlign schedLeft leftTrainings'>&nbsp;Edit Training</div>
       <div className="shadowBox position" style={{paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "500px"}}>
              <div className="mt-4 ms-3 required">
              Enter the required information below to add a new location.
            </div>
            <div className="mt-4 ms-3 addBatch">Update Trainer</div>
            <div className="row ">
              <div className="col-md-4 form-floating">
                <input className="form-control ms-3 mt-2 filedSize2 fontAdjust"
                 name='training' onChange={handleTrainingChange} value={data.training || ''}/>
                <label className='floatCity2'>Designation</label>
              </div>     
              <div className='col-md-4'>
                <input style={{width:'200px'}} type={'file'} name='image' className='form-control mt-1' onChange={handleTrainingChange}/>
                {/* <div><img src={`data:image/jpeg;base64,${data.image}`} height='20px' width='20px'/></div> */}
              </div>
              <div className='col-md-4 subButtAdjust'>
              <button style={{height:'32px'}} className="submitBlueButt" onClick={handleTrainingUpdate}>Update</button>
              </div>    
            </div>
       </div>
    </div>
  )
}

export default UpdateTrainingMasters;
