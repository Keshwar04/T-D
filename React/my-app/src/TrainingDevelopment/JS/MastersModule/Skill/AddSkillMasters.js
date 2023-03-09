import Sidebar from '../../../Sidebar/Sidebar';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddSkillMasters = () => {

    const [skill,setSkill] = useState({})

  let navigate = useNavigate()

  var currentDate = new Date().toLocaleDateString().replaceAll('/','-')
  console.log(currentDate);

    //trainer
  const handleSkillChange = (e) =>{
    const {name,value} = e.target;
    setSkill(
      {...skill,
       [name] : value,
       status : 'ACTIVE',
       'date' : currentDate,
       'updateDate' : currentDate,
       'createdBy' : 'Admin'
      }
    )
    console.log(name,value);
  }

  const handleSkillSubmit = async() =>{
    console.log(skill);
    if(skill.skill){
    let response  = await axios.post('http://localhost:8080/sendSkillDetails',skill)
    console.log(response);
    Swal.fire({
        title: "Successfully submitted!",
        text: "Click ok to See details!",
        icon: "success",
        customClass: "swal-size-sm"
      }).then(() => {
         navigate("/getSkillMasters");
      });
    }
  }

  return (
    <div>
      <Sidebar/>
      <div className='scheduleAlign'>Master's Skill</div>
      <div className='scheduleAlign leftSched leftSkill' onClick={()=>navigate('/getSkillMasters')}>Master's Skill &#62;</div>
       <div className='scheduleAlign schedLeft leftSkills'>&nbsp;Add Skill</div>
       <div className="shadowBox position" style={{paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "500px"}}>
              <div className="mt-4 ms-3 required">
              Enter the required information below to add a new location.
            </div>
            <div className="mt-4 ms-3 addBatch">Add Skill</div>
            <div className="row ">
              <div className="col-md-4 form-floating">
                <input className="form-control ms-3 mt-2 filedSize fontAdjust" placeholder='Skill'
                name='skill' onChange={handleSkillChange} value={skill.skill || ''}/>
                <label className='floatCity'>Skill</label>
              </div>     
              <div className='col-md-4 subButtAdjust'>
              <button className="submitBlueButt locSubmit" onClick={handleSkillSubmit}>Submit</button>
              </div>    
            </div>
            
       </div>
    </div>
  )
}

export default AddSkillMasters;
