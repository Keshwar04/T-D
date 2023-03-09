import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Sidebar from "../../Sidebar/Sidebar";
import "../../CSS/EmployeeModule/SendEmpDetails.css";


const SendEmpDetails = () => {
  const [details, setDetails] = useState({})
  const [designations, setDesigantions] = useState([])
  const [city, setCity] = useState([])
  const [state,setState] = useState([])
  const [skill, setSkill] = useState([])
  const [error, setError] = useState({})
  const [cityAndStateDetails,setCityAndStateDetails] = useState([])
  const [selected, setSelected] = useState([])
  const [imageStr, setImageStr] = useState("")

  const navigate = useNavigate();

  // console.log(selected.map(e => e.value));

  ///border
  const fNameIp = useRef();
  const lNameIp = useRef();
  const empId = useRef();
  const empMobNo = useRef();
  const empEmail = useRef();
  const DOB = useRef();
  const desg = useRef();
  const joinDate = useRef();
  const pSDate = useRef();
  const pEDate = useRef();
  const emplocation = useRef()
  const empSkill = useRef()
  const male = useRef()
  const female = useRef()
  const probYes = useRef()
  const probNo = useRef()
  const empState = useRef()
  const refImage = useRef()

  //errorMsg
  const fNameError = useRef();
  const lNameError = useRef();
  const empIdError = useRef();
  const mobNoError = useRef();
  const emailError = useRef();

  useEffect(() => {
    loadEmployeeBasicDetails();
    locationDetails();
    skillDetails();
  }, []);

  

  const errorHandlingUseRef = () => {
    // fNameError.current.style.marginTop = "-29px";
    // lNameError.current.style.marginTop = "-29px";
    // empIdError.current.style.marginTop = "-29px";
    // mobNoError.current.style.marginTop = "-29px";
    // emailError.current.style.marginTop = "-29px";
  };

  ///desegination SELECT tag
  const loadEmployeeBasicDetails = () => {
    axios
      .get("http://localhost:8080/getBasicDetailsForSave")
      .then((response) => {
        const data = [];
        for (var i = 0; i < response.data.designation.length; i++) {
          const { designation } = response.data.designation[i];
          data.push(designation);
          console.log(data);
        }
        setDesigantions(data);
        console.log(data);
      });
  };

  ///location SELECT tag
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

  ///skill SELECT tag
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

  const handlChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if(e.target.files){
      imageUploaded();
    setDetails((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
        status: 'Active',
      };
    });
  }else{
    setDetails((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
        status: 'Active',
      };
    });
  }
  console.log(details);
  if(name == 'locatio' && value !=''){ 
    filterState(value)
  }
  
  if(name == 'prob' && value == 'No'){
     document.getElementById('probStartDate').disabled = true;
     document.getElementById('probEndDate').disabled = true;
     setDetails({
      ...details,
      'prob' : value,
      'probStartDate' : undefined,
      'probEndDate' : undefined
     })
  }else if(name == 'prob' && value == 'Yes'){
     document.getElementById('probStartDate').disabled = false;
     document.getElementById('probEndDate').disabled = false;
  }
};

  const filterState = (value) =>{

    let filterValue = cityAndStateDetails.filter( e =>(e.city == value))
    console.log(filterValue[0].state);

    setDetails(
      {...details,
         'locatio' : value,
         'state' : filterValue[0].state 
      }
    )
  }

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
  const discardValues = () => {
    setDetails("");
    skill = ''
  };

  const validate = (e) => {
    const error = {};
    const regexemail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    const regexMobNo = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

    if (!e.empName) {
      //errorIcon.current.style.visibility = 'visible';
      error.empName = "first name required!";
      fNameIp.current.style.border = "1px solid red";
    } else {
      fNameIp.current.style.border = "2px solid #90ee90";
      fNameIp.current.style.backgroundColor = "white";
      // lNameError.current.style.marginLeft = "357px";
      //successIcon.current.style.display = 'inline';
    }

    if (!e.empLastName) {
      error.empLastName = "last name required!";
      lNameIp.current.style.border = "1px solid red";
    } else {
      lNameIp.current.style.border = "2px solid #90ee90";
      // empIdError.current.style.marginLeft = "355px";
    }

    if (!e.empId) {
      error.empId = "employee Id required!";
      empId.current.style.border = "1px solid red";
    } else {
      empId.current.style.border = "2px solid #5ced73";
    }

    if (!e.empMobNo) {
      error.empMobNo = "mobile number required!";
      empMobNo.current.style.border = "1px solid red";
    } else if (!regexMobNo.test(e.empMobNo)) {
      error.empMobNo = "mob no must be a 10 digit!";
      empMobNo.current.style.border = "1px solid red";
      // emailError.current.style.marginLeft = "232px";
    } else {
      empMobNo.current.style.border = "2px solid #90ee90";
      // emailError.current.style.marginLeft = "357px";
    }

    if (!e.empEmail) {
      error.empEmail = "email required!";
      empEmail.current.style.border = "1px solid red";
    } else if (!regexemail.test(e.empEmail)) {
      error.empEmail = "email is not a valid format!";
      empEmail.current.style.border = "1px solid red";
    } else {
      empEmail.current.style.border = "2px solid #90ee90";
    }

    if (!e.empDOB) {
      error.empDOB = "DOB required";
      DOB.current.style.border = "1px solid red";
    } else {
      DOB.current.style.border = "2px solid #90ee90";
    }

    if (!e.empDesg) {
      error.empDesg = "Desg required";
      desg.current.style.border = "1px solid red";
    } else {
      desg.current.style.border = "2px solid #90ee90";
    }

    if (!e.joinDate) {
      error.joinDate = "joinDate required";
      joinDate.current.style.border = "1px solid red";
    } else {
      joinDate.current.style.border = "2px solid #90ee90";
    }

    if (!e.probStartDate && e.prob == 'Yes') {
      error.probStartDate = "required";
      pSDate.current.style.border = "1px solid red";
    }else{
      pSDate.current.style.border = "2px solid #90ee90";
    }
    if(!e.probStartDate){
      pSDate.current.style.border = "1px solid red";
    }
    if(e.prob == 'No'){
      pSDate.current.style.border = "2px solid #90ee90";
    }

    if (!e.probEndDate && e.prob == 'Yes') {
      error.probEndDate = "required";
      pEDate.current.style.border = "1px solid red";
    }else{
      pEDate.current.style.border = "2px solid #90ee90";
    }
    if(!e.probEndDate){
      pEDate.current.style.border = "1px solid red";
    }
    if(e.prob == 'No'){
      pEDate.current.style.border = "2px solid #90ee90";
    }
    

    if (!e.locatio) {
      //error.location = "location required";
      emplocation.current.style.border = "1px solid red";
      empState.current.style.border = "1px solid red";
    } else {
      emplocation.current.style.border = "2px solid #90ee90";
      empState.current.style.border = "2px solid #90ee90";
    }

    if (!e.skill) {
      error.skill = "skill required";
      //empSkill.current.style.border = "1px solid red";
    } else {
      //empSkill.current.style.border = "2px solid #90ee90";
    }

    if (!e.gender) {
      error.gender = "gender required";
      male.current.style.border = "1px solid red";
      female.current.style.border = "1px solid red";
    } else {
      male.current.style.border = "2px solid #90ee90";
      female.current.style.border = "2px solid #90ee90";
    }

    if(!e.prob) {
      error.prob = "required";
      probYes.current.style.border = "1px solid red";
      probNo.current.style.border = "1px solid red";
    }else{
      probYes.current.style.border = "2px solid #90ee90";
      probNo.current.style.border = "2px solid #90ee90";
    }
    if(!e.image){
      refImage.current.style.border = '1px solid red';
      error.image = 'required';
    }else{
      refImage.current.style.border = '2px solid #90ee90';
    }
    return error;
  };

  const handleSubmit = () => {
    let skill ="";
    selected.forEach(data => {
      skill == "" ? (skill += data.value) : (skill +=","+data.value)
    })
    console.log(skill);
    console.log(details);

    details.skill = skill;
    details.image = imageStr;

      if(!selected){
        const collection = document.getElementById('hide');
        console.log(collection);
      }
      
    const errorObj = validate(details);
    setError(errorObj);
    errorHandlingUseRef();
    console.log(errorObj);
    console.log(Object.keys(errorObj));
    if (errorObj && Object.keys(errorObj).length != 0) {
      return;
    }
    console.log(details);
    axios.post("http://localhost:8080/sendDetails", details).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });

    Swal.fire({
      title: "Successfully submitted!",
      text: "Click ok to See details!",
      icon: "success",
      customClass: "swal-size-sm"
    }).then(() => {
       navigate("/get");
    });
  };

  let options = [];
  for (let i = 0; i < skill.length; i++) {
     options.push({ label: skill[i], value: skill[i] });
    // options.push(skill[i])
  }
  console.log(skill);
  console.log(options);

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
        <div style={{height:'580px'}} className='boxShadow newShodowBgColor'>
          <div style={{marginTop:'-290px'}} className="ps-3">
          <div className="addEmpDesign pt-2">Add Employee</div>
          <div style={{opacity:'0.7'}} className='pt-1 pb-3'>Enter the required information below to add a new employee.</div> 
  
          <div className="row pe-3 gap" >
            <div className='col-4'>
              <div className="form-floating">
              <input ref={fNameIp} className="form-control setHeight" placeholder="l" name="empName"
               value={details.empName || ''} onChange={handlChange}/>
              <label className="setPadAlign">First Name</label>
              </div>
              <div className='text-color' >{error.empName}</div>
            </div>
            <div className='col-4'>
              <div className="form-floating">
              <input ref={lNameIp} className="form-control setHeight" placeholder="l" name="empLastName"
              value={details.empLastName || ''} onChange={handlChange}/>
              <label className="setPadAlign">Last Name</label>
              </div>
              <div className='text-color'>{error.empLastName}</div>
            </div>
            <div className='col-4'>
              <div className='form-floating'>
              <input ref={empId} className="form-control setHeight" placeholder="l" name="empId"
               value={details.empId || ''} onChange={handlChange}/>
              <label className="setPadAlign">Employee ID</label>
            </div>
              <div className='text-color'>{error.empId}</div>
            </div>
            <div className='col-4'>
              <div className="form-floating">
              <input type={'number'} ref={empMobNo} className="form-control setHeight" placeholder="l" name="empMobNo"
               value={details.empMobNo || ''} onChange={handlChange}/>
              <label className="setPadAlign">Mobile Number</label>
              </div>
              <div className="text-color">{error.empMobNo}</div>
            </div>
            <div className='col-4 '>
              <div className="form-floating">
              <input ref={empEmail} className="form-control setHeight" placeholder="l" name="empEmail"
               value={details.empEmail || '' } onChange={handlChange}/>
              <label className="setPadAlign">E-mail Address</label>
              </div>
              <div className='text-color'>{error.empEmail}</div>
            </div>
            <div className='col-4 form-floating'>
              <input type={'date'} ref={DOB} className="form-control setHeight" placeholder="l" name="empDOB"
               value={details.empDOB || ''} onChange={handlChange}/>
              <label className="formFloatAlign">Date of Birth</label>
            </div>
            <div className='col-4 '>
              <label className="label_gend">Gender :&nbsp;</label>
            <div ref={male} className="inline">Male</div>
            <input type="radio" className="gen_Left" name="gender" checked={details.gender === "Male" || '' }
             value="Male" onChange={handlChange}/>
            <div ref={female} className="inline2">Female</div>
            <input type="radio" className="gen_Left2" name="gender" checked={details.gender === "Female" || ''}
             value="Female" onChange={handlChange}/>
            </div>
            <div className='col-4 form-floating'>
              <select ref={desg} className="form-select setHeight pad_top_adjust" placeholder="l" name="empDesg"
               value={details.empDesg || ''} onChange={handlChange}>
              <option value=''>Designation</option>
              {designations.map((data, i) => {
              return (
                <option key={i} value={data}>
                  {data}
                </option>
               );
              })}
              </select>
              <label className="formFloatAlign">Designation</label>
            </div>
            <div className='col-4 form-floating'>
              <input type='date' ref={joinDate} className="form-control setHeight" placeholder="l" name="joinDate"
               value={details.joinDate || ''} onChange={handlChange}/>
              <label className="formFloatAlign">Join Date</label>
            </div>
         
            <div className='col-4 '>
             <label className="label_gend">Probation :&nbsp;</label>
              <div ref={probYes} className="inline">Yes</div>
               <input type="radio" name="prob" className="gen_Left" checked={details.prob === "Yes" || ''}
                value="Yes" onChange={handlChange}/>
              <div ref={probNo} className="inline2">No</div>
               <input type="radio" name="prob" className="gen_Left2" checked={details.prob === "No" || ''}
                value="No" onChange={handlChange}/>
              </div>
            <div className='col-4 form-floating'>
              <input disabled type={'date'} ref={pSDate} className="form-control setHeight" placeholder="l" id="probStartDate" name="probStartDate"
               value={details.probStartDate || ''} onChange={handlChange}/>
              <label className="formFloatAlign">Probation Start Date</label>
            </div>
            <div className='col-4 form-floating'>
              <input disabled type={'date'} ref={pEDate} className="form-control setHeight" placeholder="l" id="probEndDate" name="probEndDate"
               value={details.probEndDate || ''} onChange={handlChange}/>
              <label className="formFloatAlign">Proation End Date</label>
            </div>
      
            <div className='col-4 form-floating'>
              <select ref={emplocation} className="form-select setHeight" placeholder="l" name="locatio"
              value={details.locatio || ''} onChange={handlChange}>
              <option value=''>City</option>
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
              <input disabled ref={empState}  className="form-control setHeight width_adjust" name="state"
               value={details.state || ''} onChange={handlChange}/>
              <label className="formFloatAlign">State</label>
            </div>
            <div className='col-4 form-floating width_adjust_skill'>
              <div className={false ? 'multi-border' : 'multi-border-default'}>
              <MultiSelect displayValue='Skills' options={options} name="skill"
               value={selected} onChange={setSelected} labelledBy="Select"/>
               </div>
              <label className="formFloatAlignForSkill">Skill</label>
            </div>
            <div className='col-4'>
              <input ref={refImage} type={'file'} className="form-control setHeight width_adjust" name="image"
               onChange={handlChange}/>
              {/* <label className="formFloatAlign">State</label> */}
            </div>
          </div>
       
          </div>
            {/* <div><input className="fileAlign" type={'file'} name='imgddd' onChange={handlChange}/></div> */}
      <div style={{marginLeft:'-170px',marginTop:'-20px'}}>
      <button className="discardButt" onClick={discardValues}>Discard</button>
      <button style={{ marginTop: "95px", marginLeft: "25px" }}
        className="submitButt" onClick={handleSubmit}>Submit</button>
      </div>
      {/* <img src={'data:image/png;base64,'+imageStr} alt="asd"/> */}
      </div>
      </div>
    </div>
    </div>
  );
};

export default SendEmpDetails;
