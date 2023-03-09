import "../../CSS/TrainingModule/AddTraining.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BiPencil, BiUserCircle } from "react-icons/bi";
import {MdOutlineAddCircleOutline,MdOutlineDelete,MdOutlineSchedule,MdOutlineGroups,} from "react-icons/md";
import { RiDashboardLine,RiMastercardLine } from "react-icons/ri";
import { TbBook } from "react-icons/tb";
import { VscTasklist } from "react-icons/vsc";
import { BsPerson, BsCalendar2Day, BsListTask } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { TiArrowSortedDown } from 'react-icons/ti';

const AddTraining = () => {
  const [data, setData] = useState([])
  const [show,setShow] = useState(false)
  const [list,setList] = useState([])
  const [ipValues, setIpValues] = useState({})
  const [training, setTraining] = useState([])
  const [error, setError] = useState({})
  const [employeeId,setEmployeeId] = useState([])
  const [employeeDetails,setEmployeeDetails] = useState([])
  const [indexes, setIndexes] = useState([999]);
  const [counter, setCounter] = useState(0);
  const { register, handleSubmit, formState: { errors }} = useForm();

  // console.log(errors?.assignTraining?.[0]?.tSDate );
  // console.log(indexes);
  
  const onSubmit = data => {
    console.log(data);
  };

  

  const addFriend = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeFriend = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  const clearFriends = () => {
    setIndexes([]);
  };

  const navigate = useNavigate();

  const empName = useRef();
  const empId = useRef();
  const trainingNmae = useRef();
  const tSDate = useRef();
  const tEDate = useRef();
  
  ///error Alignment
  const idError = useRef();
  const nameError = useRef();

  const goToTrainingComp = () => {
    navigate("/training");
  };
  const goToEmpComp = () => {
    navigate("/get");
  };

  const errorHandlingUseRef = () =>{
    idError.current.style.marginTop = '13px';
    nameError.current.style.marginTop = '-15px';
  }

  ///sweet alert
  const modalHandle = (id) => {
    console.log(id);
    list.splice(id, 1);
    let myList = list;
    setList([...myList]);
  };

  useEffect(() => {
    trainingDetails()
    getData()
    getEmployeeId()
  }, []);

  ///Training SELECT tag
  const trainingDetails = () => {
    axios
      .get("http://localhost:8080/training")
      .then((response) => {
        const data = [];
        for (var i = 0; i < response.data.training.length; i++) {
          const { training } = response.data.training[i];
          data.push(training);
        }
        setTraining(data);
        console.log('116 line',training);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEmployeeId  = async() =>{
    let response = await axios.get('http://localhost:8080/getDetails')
    console.log(response.data);
    setEmployeeDetails(response.data)
    let arr=[];
    for(var i=0; i<response.data.length; i++){
      let empId = response.data[i]['empId']
      arr.push(empId)
    }
    console.log('empId===>',arr);
    setEmployeeId(arr)
  }
  ///get empName with empId
  // const gettingValue = (empId, inputId) => {
  //   let empName = "";
  //   axios
  //     .get(`http://localhost:8080/getValues?empId=` + empId)
  //     .then((response) => {
  //       if (response.data != null && response.data.length > 0) {
        
  //          empName = response.data[0].empName + " " + response.data[0].empLastName;
  //       } 
  //       document.getElementsByName(inputId)[0].value =empName;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  ///onChange
  const targetIpValue = (e) => {
  const {name,value} = e.target;
  setIpValues({
    ...ipValues,
    [name] : value
  })
  console.log(ipValues);

  if(name == 'id') {
    getEmployeeName(value)
  }
  //   console.log(e.target.name, e.target.value);
  // let inputId = e.target.name.replace("id", "empName");  ;
  //     gettingValue(e.target.value, inputId)
  };

  let final = '';
  const getEmployeeName = (value) =>{  
    employeeDetails.filter((e)=>{
    if(e.empId == value){
        final = e.empName + ' ' + e.empLastName
    }
   })
   setIpValues({
    ...ipValues,
    id : value,
    empName : final
   })
  }

  const validate = (e) => {
    console.log(e);
    const errors = {};

    if (!e.id) {
      errors.id = "empoyee Id required";
      empId.current.style.border = "1px solid red";
      empName.current.style.border = "1px solid red";
    } else {
      empId.current.style.border = "2px solid #90ee90";
      empName.current.style.border = "2px solid #90ee90";
     // console.log(kkk);
      // nameError.current.style.marginTop = '85px';
    }

    // if (!e.empName) {
    //   errors.empName = "employee name required!";
    //   empName.current.style.border = "1px solid red";
    // } else {
    //   empName.current.style.border = "2px solid #90ee90";
    // }

    if (!e.trainName) {
      errors.trainName = "training name required!";
      trainingNmae.current.style.border = "1px solid red";
    } else {
      trainingNmae.current.style.border = "2px solid #90ee90";
    }

    if (!e.sDate) {
      errors.sDate = "start date required!";
      tSDate.current.style.border = "1px solid red";
    } else {
      tSDate.current.style.border = "2px solid #90ee90";
    }

    if (!e.eDate) {
      errors.eDate = "end  date required!";
      tEDate.current.style.border = "1px solid red";
    } else {
      tEDate.current.style.border = "2px solid #90ee90";
    }
    return errors;
  };

  const changeBorderColor = () =>{
    empName.current.style.border = '1px solid #ced4da';
    empId.current.style.border = '1px solid #ced4da';
    trainingNmae.current.style.border = '1px solid #ced4da';
    tSDate.current.style.border = '1px solid #ced4da';
    tEDate.current.style.border = '1px solid #ced4da';
  }

  ///send to DB
  const saveData = () => {
    console.log(ipValues);
    
    const errorObj = validate(ipValues);
    console.log(errorObj);
    setError(errorObj);
    console.log(error);
    // errorHandlingUseRef();

    if (errorObj && Object.keys(errorObj).length != 0) {
      return;
    }

    setList((e)=>[...e,ipValues])
    console.log(list);
    changeBorderColor()
    setIpValues('')
    // axios
    //   .post("http://localhost:8080/trainingSendDetails", ipValues)
    //   .then((response) => {
    //     empId.current.style.border = "none";
    //     empName.current.style.border = "none";
    //     trainingNmae.current.style.border = "none";
    //     tSDate.current.style.border = "none";
    //     tEDate.current.style.border = "none";
    //     console.log(response);
    //     getData();
    //     setIpValues("");
    //   })
    //   .catch((err) => {
    //     console.log("Not Added");
    //   });
  };

  ///get from DB
  const getData = () => {
    axios
      .get("http://localhost:8080/trainingGetDetails")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitListValues = async() =>{
    list.push(ipValues)
    console.log(list);
    for (let index = 0; index < list.length; index++) {
      if(typeof list[index] == 'string' ){
        console.log(index);
         list.splice(index,1)
      }      
    }
    console.log(list);

    Swal.fire({
      title: "Well Done!",
      text: "Training details has been updated successfully",
      icon: "success",
      customClass: "swal-size-sm",
      confirmButtonColor: "orange",
      confirmButtonText: "continue",
    }).then(()=>{
      navigate('/training')
    })
    
    await axios.post("http://localhost:8080/trainingSendDetails",list)
  }
  const DeleteData = () => {
    setIpValues("");
  };

  return (
    <div>
      <div className="colorAdjust">Training and Development</div>
      <div style={{ marginLeft: "-22px", marginTop: "-32px" }}>
        <div style={{ display: "flex" }}>
          <button className="FAsButton">FA</button>
          <div className="bToT"> FA SOFTWARE </div>
        </div>
        <div className="service">SERVICES PVT.LTD</div>
        <div className="fly">Fly Ahead</div>
      </div>
      <div style={{ backgroundColor: "#F9FAFE", marginTop: "13px" }}>
        <div style={{ display: "flex" }}>
          <div className="blue">
            <div className='assiTra' onClick={()=>navigate('/training')}>Assign&nbsp;Training&nbsp;&#62;</div>
            <div className='addTrains'>Add&nbsp;Training</div>
            <div style={{ width: "150px",marginTop:'-29px' }} className="empHead">Assign Training</div>
            <div className="general same">General</div>
            <hr className="same"></hr>
            <div style={{ display: "flex" }}>
              <RiDashboardLine
                className="Icon same"
                style={{ fontSize: "15px" }}
              />
              <div className="empIcon same">Dashboard</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }}>
              <BsPerson className="Icon same" style={{ fontSize: "15px" }} />
              <div className="empIcon same" onClick={goToEmpComp}>
                Employee
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }}>
              <TbBook className="Icon same" style={{ fontSize: "15px" }} />
              <div className="empIcon same" onClick={goToTrainingComp}>
                Assign Training
              </div>
            </div>
            <div className="same Icon" style={{ marginTop: "25px" }}>
              Training
            </div>
            <hr className="same"></hr>
            <div style={{ display: "flex", marginTop: "25px" }}>
              <MdOutlineGroups
                className="Icon same"
                style={{ fontSize: "15px" }}
                onClick={()=>navigate('/getBatch')}
              />
              <div className="empIcon same" onClick={()=>navigate('/getBatch')}>Batch</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getSchedule')}>
              <BsCalendar2Day
                className="Icon same"
                style={{ fontSize: "15px" }}
              />
              <div className="empIcon same">Schedule</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getTrainer')}>
              <BiUserCircle
                className="Icon same"
                style={{ fontSize: "15px" }}
              />
              <div className="empIcon same">Trainer</div>
            </div>
            <div className="same Icon" style={{ marginTop: "25px" }} >
              Development
            </div>
            <hr className="same"></hr>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getTask')}>
              <BsListTask className="Icon same" style={{ fontSize: "15px" }} />
              <div className="empIcon same">Task</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getTaskEvaluation')}>
              <VscTasklist className="Icon same" style={{ fontSize: "15px" }} />
              <div className="empIcon same">Task Evaluation</div>
            </div>
            <div style={{ display: "flex", marginTop: "25px" }} onClick={()=>navigate('/getAttendance')}>
              <MdOutlineSchedule
                className="Icon same"
                style={{ fontSize: "15px" }}
              />
              <div className="empIcon same">Attendance</div>
            </div>
            <div style={{display:'flex', marginTop:'25px'}}>
          <RiMastercardLine className="Icon same" style={{fontSize:'15px'}}/>
          <div className="empIcon same" onClick={()=>setShow(!show)}>Masters <TiArrowSortedDown/></div>
          </div>
          { show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getLocationMasters')}>Location</div>
        :null
      }
      {
        show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getTrainerMasters')}>Trainer Name</div>
        : null
      }
      {
        show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getSkillMasters')}>Skill</div>
        : null
      }
      {
        show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getDesgMasters')}>Designation</div>
        : null
      }
      {
        show ?
        <div className='empIcon same topMargi' onClick={()=>navigate('/getTrainingMasters')}>Training Name</div>
        : null
      }
          </div>
          <div style={{marginTop: "35px",marginLeft:'20px', width: "83%",}} className='colors'>
            <div className="addTrain mt-2">Add Training</div>
            <div className="lText">
              Enter the required information below to assign Training for an
              Employee
            </div>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                {indexes.map(index => {
        const fieldName = `assignTraining[${index}]`;
        return (
        <div key={fieldName}>
                   <input {...register(`${fieldName}.id`)} style={{height:'33px'}}  className="heightAlign form-control w-75" onChange={targetIpValue}  /> 
                   <input disabled style={{height:'33px'}} {...register(`${fieldName}.empName`)} className="form-control w-75" /> 
                 
                    <select  {...register(`${fieldName}.trainingNmae`)} style={{ backgroundColor: "white", fontSize: "12.5px" }} 
                      id="ip9" className="form-select w-75 h-25">
                      <option>---select---</option>
                      {training.map((data, i) => {
                        return (
                          <option key={i} value={data}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  
                    <input {...register(`${fieldName}.tSDate`, { required: true })} style={{ fontSize: "13px",height:'33px' }} 
                    type={"date"} className="form-control w-75 pt-1"/>
                 { errors?.assignTraining?.[index]?.tSDate  && 
                  (<p>Date required</p>)
                }
                    <input  {...register(`${fieldName}.eDate`, { required: true })} style={{ fontSize: "13px",height:'33px' }} type={"date"} className="form-control w-75 pt-1"
                        />
                  { errors?.assignTraining?.[index]?.eDate  && 
                  (<p>Date required</p>)
                }
                    <MdOutlineAddCircleOutline style={{ marginLeft: "-30px" }} className="getDetail" onClick={saveData}/>
                  
                    <MdOutlineDelete style={{ marginLeft: "-30px" }} className="delete" onClick={DeleteData}/>
                    <div ref={idError} style={{marginLeft:'-1008px',marginTop:'-10px',fontSize:'10px',color:'red'}}>{error.id}</div>
                    <div ref={nameError} style={{marginLeft:'-811px',marginTop:'-30px',fontSize:'10px',color:'red'}}>{error.empName}</div>
                    </div>
                      );})}
<button type="submit" >
        Submit
      </button>
                </form> */}
            <table
              style={{ marginLeft: "17px", width: "96%" }}
              id="table"
              className="table table-striped"
            >
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>Emp Name</th>
                  <th>Training Name</th>
                  <th>Training Start Date</th>
                  <th>Training End Date</th>
                </tr>                
              </thead>
              <tbody>
                <tr>
                <td>
                   <select name="id" ref={empId} className="form-select ipSizes padSize" onChange={targetIpValue}
                     value={ipValues.id || ''}>
                    <option>select</option>
                    {employeeId.map((e)=>
                     <>
                      <option value={e}>{e}</option>
                     </>
                    )}
                   </select>
                </td>
                <td><input ref={empName} disabled name="empName" className="form-control ipSizes" onChange={targetIpValue}
                     value={ipValues.empName || ''}/>
                </td>
                <td>
                   <select name="trainName" ref={trainingNmae} className="form-select ipSizes padSize" onChange={targetIpValue}
                    value={ipValues.trainName || ''}>
                     <option>selcect</option>
                     {training.map((data)=>
                     <>
                       <option value={data}>{data}</option>
                     </>)}
                   </select>
                </td>
                <td><input type='date' name="sDate" ref={tSDate}  className="form-control ipSizes" onChange={targetIpValue} 
                     value={ipValues.sDate || ''}/>
                </td>
                <td><input type='date' name="eDate" ref={tEDate} className="form-control ipSizes" onChange={targetIpValue}
                     value={ipValues.eDate || ''}/>
                </td>
                <td><MdOutlineAddCircleOutline style={{ marginLeft: "-30px" }} className="getDetail" onClick={saveData}/>
                    <MdOutlineDelete style={{ marginLeft: "16px" }} className="delete" onClick={DeleteData}/>
                </td>
                </tr>
                 {/* <div style={{display:'flex'}}>
                 <div ref={idError} style={{fontSize:'10px',color:'red'}}>{error.id}</div>
                 <div ref={nameError} style={{fontSize:'10px',color:'red'}}>{error.trainName}</div>
                 <div style={{fontSize:'10px',color:'red'}}>{error.sDate}</div>
                 <div style={{fontSize:'10px',color:'red'}}>{error.eDate}</div>
                 </div> */}
                {list.map((data, index) => (
                  <tr key={index}>
                    <td style={{ paddingBottom: "11px" }}>{data.id}</td>
                    <td style={{ paddingBottom: "11px" }}>{data.empName} &nbsp; {data.empLastName}</td>
                    <td style={{ paddingBottom: "11px" }}>{data.trainName}</td>
                    <td style={{ paddingBottom: "11px" }}>{data.sDate}</td>
                    <td style={{ paddingBottom: "11px" }}>{data.eDate}</td>
                    <td><MdOutlineDelete style={{ cursor: "pointer" }}className="delete"onClick={()=> modalHandle(index)}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
             
   

      {/* <button type="button" onClick={addFriend}>
        Add Friend
      </button>
      <button type="button" onClick={clearFriends}>
        Clear Friends
      </button>   */}
             
            <div className='topMargin'>
             <button className="discardButt" style={{marginLeft:'375px'}} onClick={()=>setIpValues('')}>Discard</button>
             <button style={{ marginTop: "5px", marginLeft: "15px" }} className="submitButt" onClick={submitListValues}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTraining;
