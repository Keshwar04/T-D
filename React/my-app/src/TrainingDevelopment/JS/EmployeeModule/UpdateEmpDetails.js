import React, { useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";

const UpdateEmpDetails = () => {
  const [updatedata, setUpdate] = useState({});
  const [data, setData] = useState([]);
  const [designations, setDesigantions] = useState([]);
  const [city, setCity] = useState([])
  const [state,setState] = useState([])
  const [cityAndStateDetails,setCityAndStateDetails] = useState([])
  const [skill, setSkill] = useState([]);
  const [selected, setSelected] = useState([]);
  const [imageStr,setImageStr] = useState()
  //const [optionsSelect,setselectValue] = useState([]);
  const navigate = useNavigate();
  let { empId } = useParams();

  useEffect(() => {
    loadEmployeeBasicDetails();
    locationDetails();
    skillDetails();
    loadData();
  },[]);
  
  useEffect(() => {
    selectedValue(data);
  }, [data]);

  const loadData = () => {
    //console.log(id);
    axios
      .get("http://localhost:8080/getIdDetails?empId=" + empId)
      .then((response) => {
         console.log(response);
        // console.log(response.data[0]);
         setData(response.data.empDetails);
        setUpdate(response.data.empDetails[0])
      });
  };
  const loadEmployeeBasicDetails = () => {
    axios
      .get("http://localhost:8080/getBasicDetailsForSave")
      .then((response) => {
        const data = [];
        for (var i = 0; i < response.data.designation.length; i++) {
          const { designation } = response.data.designation[i];
          data.push(designation);
        }
        setDesigantions(data);
      });
  };

  const locationDetails = async() => {
    let response = await axios.get("http://localhost:8080/locationDetailsForStateAndCity")
    console.log(response);
    setCityAndStateDetails(response.data)
    //city
    const data = [];
    for (var i=0; i<response.data.length; i++){
      const city = response.data[i].city
      data.push(city)
    }
    setCity(data)
    
    //state
    const stateData = [];
    for (var i=0; i<response.data.length; i++){
      const state = response.data[i].state
      stateData.push(state)
    }
    setState(stateData)
};
  ///location SELECT tag
  // const locationDetails = () => {
  //   axios.get("http://localhost:8080/location").then((response) => {
  //     const data = [];
  //     for (var i = 0; i < response.data.location.length; i++) {
  //       const { location } = response.data.location[i];
  //       data.push(location);
  //     }
  //     setLocation(data);
  //   });
  // };

  const skillDetails = () => {
    axios.get("http://localhost:8080/skillList").then((response) => {
      const data = [];
      for (var i = 0; i < response.data.skill.length; i++) {
        const { skill } = response.data.skill[i];
        data.push(skill);
      }
      setSkill(data);
    });
  };

  const updateSetData = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    console.log(name, value);    
    if(e.target.files){
      imageUploaded();
      setUpdate((prevValue) => {
        return{
          ...prevValue,
          [name]: value,
        }
      })
    }
    setUpdate((prevValue) => {
      return{
        ...prevValue,
        [name]: value,
      }
    })

    if(name == 'location' && value !=''){ 
      filterState(value)
    }

    if(name == 'prob' && value == 'No'){
      document.getElementById('probStartDate').disabled = true;
      document.getElementById('probEndDate').disabled = true;
   }else if(name == 'prob' && value == 'Yes'){
      document.getElementById('probStartDate').disabled = false;
      document.getElementById('probEndDate').disabled = false;
   }
  };

  function imageUploaded() {
    var file = document.querySelector('input[type=file]')['files'][0]
    let reader = new FileReader();
    reader.readAsDataURL(file)
    console.log(reader);
    reader.onload = () =>{
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "")
      console.log(base64String);
      setImageStr(base64String)
    }
  }

  const filterState = (value) =>{

    let filterValue = cityAndStateDetails.filter( e =>(e.city == value))
    console.log(filterValue[0].state);

    setUpdate(
      {...updatedata,
         'location' : value,
         'state' : filterValue[0].state 
      }
    )
  }

  const handleUpdate = () => {
    console.log(selected);

    let selectedUpdate = "";
    for (let i = 0; i < selected.length; i++) {
      console.log(selected.length , selected.length-1);
      if(selected.length-1 == i){
        selectedUpdate += selected[i].value;
      }else{
        selectedUpdate += selected[i].value+',';
      }
    }
    console.log(selectedUpdate);
    updatedata.skill = selectedUpdate.trim();
    console.log(updatedata);

    const id = data[0].id;
    updatedata.image = imageStr;
    console.log(updatedata);
    axios
      .put(`http://localhost:8080/updateDetails/${id}`, updatedata)
      .then((response) => console.log(response))
      .catch((e) => console.error(e.message));

    Swal.fire({
      title: "Well Done!",
      text: "Employee details has been updated successfully",
      icon: "success",
      customClass: "swal-size-sm",
      confirmButtonColor: "orange",
      confirmButtonText: "continue",
    }).then(()=>{
      navigate('/get')
    })
  }

  let options = [];
  for (let i = 0; i < skill.length; i++) {
    options.push({ label: skill[i], value: skill[i] });
  }
  let arr = [];
  let optionsSelect2 = [];

  function selectedValue(datas) {
    console.log("hii", datas);

    for (let i = 0; i < datas.length; i++) {
      if (datas[i].skill !== null) {
        arr = datas[i].skill.split(",");
      }
    }
    console.log(arr);

    for (let j = 0; j < arr.length; j++) {
      console.log(arr[j]);
      optionsSelect2.push({ label: arr[j], value: arr[j] });
    }
    console.log(optionsSelect2);
    setSelected(optionsSelect2);
    
  }

  console.log(data);

  return (
    <div>
    <Sidebar/>
    <div style={{ marginLeft: "195px", marginTop: "-620px" }}>
      <div style={{display:'flex'}}>
       <div className="content_1">Employee</div>
       <div className='topMar greater' onClick={()=>navigate('/get')}>Employee &#62;</div>
       <div className='topMar nBSP'>&nbsp;Add Employee</div>
      </div>
      <div className="content_2">
      <div style={{height:'550px'}} className='boxShadow newShodowBgColor'>
        <div style={{marginTop:'-290px'}} className="ps-3">
        <div className="addEmpDesign pt-2">Edit Profile</div>
        <div style={{opacity:'0.7'}} className='pt-1 pb-3'>Enter the required information below to update employee profile.</div> 
        
          {data.map((update,i) => (
        <div className="row gy-5 gx-4 pe-3 gap" >
          {console.log(update.empName)}
          <div className='col-4 form-floating'>
            <input className="form-control setHeight" placeholder="l" name="empName" onChange={updateSetData}
             defaultValue={update.empName} value={updatedata.empName}/>
            <label className="setPadAlign left12px">First Name</label>
          </div>
          <div className='col-4 form-floating'>
            <input className="form-control setHeight" placeholder="l" name="empLastName" onChange={updateSetData}
             defaultValue={update.empLastName} value={updatedata.empLastName}/>
            <label className="setPadAlign left12px">Last Name</label>
          </div>
          <div className='col-4 form-floating'>
            <input className="form-control setHeight" placeholder="l" name="empId" onChange={updateSetData}
             defaultValue={update.empId} value={updatedata.empId}/>
            <label className="setPadAlign left12px">Employee ID</label>
          </div>
         
          <div className='col-4 form-floating'>
            <input className="form-control setHeight" placeholder="l" name="empMobNo" onChange={updateSetData}
             defaultValue={update.empMobNo || ""} value={updatedata.empMobNo}/>
            <label className="setPadAlign left12px">Mobile Number</label>
          </div>
          <div className='col-4 form-floating'>
            <input className="form-control setHeight" placeholder="l" name="empEmail" onChange={updateSetData}
             defaultValue={update.empEmail || ""} value={updatedata.empEmail}/>
            <label className="setPadAlign left12px">E-mail Address</label>
          </div>
          <div className='col-4 form-floating'>
            <input type={'date'} className="form-control setHeight" placeholder="l" name="empDOB" onChange={updateSetData}
             defaultValue={update.empDOB || ""} value={updatedata.empDOB}/>
            <label className="formFloatAlign">Date of Birth</label>
          </div>
        
          <div className='col-4 '>
            <label className="label_gend">Gender :&nbsp;</label>
          <div className="inline">Male</div>
          <input type="radio" className="gen_Left"name="gender"  value="Male" onChange={updateSetData}
           defaultChecked={update.gender === "Male"} checked={updatedata.gender === 'Male'}/>
          <div className="inline2">Female</div>
          <input type="radio" className="gen_Left2" name="gender" value="Female" onChange={updateSetData}
           defaultChecked={update.gender === "Female"} checked={updatedata.gender === 'Female'}/>
          </div>
          <div className='col-4 form-floating'>
            <select className="form-select setHeight" placeholder="l" name="empDesg" onChange={updateSetData}
             defaultValue={update.empDesg} value={updatedata.empDesg}>
            {designations.map((data,i) => {
                  return (
                    <option key={i} style={{ fontSize: "13.5px" }} defaultValue={data}> {data}</option>
                  );
            })}
            </select>
            <label className="formFloatAlign">Designation</label>
          </div>
          <div className='col-4 form-floating'>
            <input type={'date'} className="form-control setHeight" placeholder="l" name="joinDate" onChange={updateSetData}
             defaultValue={update.joinDate || ""} value={updatedata.joinDate}/>
            <label className="formFloatAlign">Join Date</label>
          </div>
       
          <div className='col-4 '>
           <label className="label_gend">Probation :&nbsp;</label>
            <div className="inline">Yes</div>
             <input type="radio" className="gen_Left" name="prob" value="Yes" onChange={updateSetData}
              defaultChecked={update.prob === "Yes"} checked={updatedata.prob ==='Yes'}/>
            <div className="inline2">No</div>
             <input type="radio" className="gen_Left2" name="prob" value='No' onChange={updateSetData}
              defaultChecked={update.prob === "No"} checked={updatedata.prob ==='No'}/>
          </div>
          <div className='col-4 form-floating'>
            <input type={'date'} className="form-control setHeight" placeholder="l" id="probStartDate" name="probStartDate" onChange={updateSetData}
             defaultValue={update.probStartDate} value={updatedata.probStartDate}/>
            <label className="formFloatAlign">Probation Start Date</label>
          </div>
          <div className='col-4 form-floating'>
            <input type={'date'} className="form-control setHeight" placeholder="l" id="probEndDate" name="probEndDate" onChange={updateSetData}
             defaultValue={update.probEndDate} value={updatedata.probEndDate}/>
            <label className="formFloatAlign">Proation End Date</label>
          </div>
    
          <div className='col-4 form-floating'>
            <select className="form-select setHeight" placeholder="l" name="location" onChange={updateSetData}
             defaultValue={update.location} value={updatedata.location}>
              {city.map((data, i) => {
              return (
                <option key={i} value={data}>
                  {data}
                </option>
               );
              })}
            </select>
            <label className="formFloatAlign">City</label>
          </div>
          <div className='col-4 form-floating'>
              <input disabled  className="form-control setHeight " name="state" onChange={updateSetData}
               defaultValue={update.state} value={updatedata.state}/>
              <label className="formFloatAlign">State</label>
          </div>
          <div className='col-4 form-floating width_adjust_skill'>
              <MultiSelect id='hide' options={options} name="skill"
               value={selected} onChange={setSelected} labelledBy="Select"/>
              <label className="formFloatAlignForSkill">Skill</label>
          </div>
          <div className='col-4 form-floating'>
              <select className="form-select setHeight " name="status" onChange={updateSetData}
               defaultValue={update.status} value={updatedata.status}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <label className="formFloatAlign">State</label>
          </div>
          <div className='col-4 form-floating'>
            <div className="d-flex">
            <div><input type={'file'} className="form-control setHeight" name="image" onChange={updateSetData}/></div>
            <div className="topMin"><img className="rounded-circle" src={update.image == null||undefined||'' ?("data:image/png;base64,"+imageStr ): ("data:image/png;base64,"+update.image)} 
                 height='35px' width='35px'/></div>
            </div>
            {/* <label className="formImageAlign">Image</label> */}
          </div>

          {/* <div className='col-4 form-floating'>
            <MultiSelect/>
            <label>Proation End Date</label>
          </div> */}
        </div>
      
        ))}
        </div>
          {/* <div><input className="fileAlign" type={'file'} name='imgddd' onChange={handlChange}/></div> */}
    <div style={{marginLeft:'-170px'}}>
    <button className="discardButt" onClick={() => setUpdate("")}>Discard</button>
    <button style={{ marginTop: "25px", marginLeft: "25px" }}
      className="submitButt" onClick={handleUpdate}>Update</button>
    </div>
    {/* <img src={'data:image/png;base64,'+imageStr} alt="asd"/> */}
    </div>
    </div>
  </div>
  </div>
  );
};

export default UpdateEmpDetails;
