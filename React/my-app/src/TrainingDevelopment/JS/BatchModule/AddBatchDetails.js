import "../../CSS/BatchModule/AddBatchDetails.css";
import { Button, Modal, ModalFooter, ModalTitle } from "react-bootstrap";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import React, { useEffect, useState, useRef } from "react";
import { BsEye, BsCalendarCheck } from "react-icons/bs";
import { BiPencil, BiUserCircle } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {MdOutlineSchedule,} from "react-icons/md";
import { TiArrowSortedDown } from 'react-icons/ti';
import { RiDashboardLine, RiMastercardLine } from "react-icons/ri";
import { TbBook } from "react-icons/tb";
import { VscTasklist } from "react-icons/vsc";
import { MdOutlineGroups } from "react-icons/md";
import { BsPerson, BsCalendar2Day, BsListTask } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const AddBatchDetails = () => {
  const [ipFieldValue,setipFieldValue] = useState({})
  const [training, setTraining] = useState([]);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [error,setError] = useState({});
  const [selectedDate, setSelectedDate] = useState()
  const [selectedDate2, setSelectedDate2] = useState();
  const [checkBoxValue,setCheckBoxValue] = useState()
  const [show,setShow] = useState(false)

  const navigate = useNavigate();

  const trainingName = useRef();
  const batchLead = useRef();
  const startDate = useRef();
  const endDate  = useRef();
  const time  = useRef();
  const disabledInput = useRef();
  const endDateIcon = useRef();
  const endTime = useRef();

  //error
  const trainingNameError = useRef();
  const batchLeadError = useRef();
  const startDateError = useRef();
  const endDateError  = useRef();
  const timeError = useRef();
  const endTimeError = useRef();

  //div
  const endDateDiv = useRef();
  const startTimeDiv = useRef();
  const endTimeDiv = useRef();
  const disabledInputDiv  = useRef();

  const loadData = () => {
    axios.get("http://localhost:8080/batchGetDetails").then((response) => {
      console.log(response);
      setData(response.data);
    });
  };

  const trainingComponent = () => {
    navigate("/training");
  };

  const goToEmpComp = () =>{
    navigate('/get')
  }

  const goToTrainingComp = () => {
    navigate("/training");
  };

  ///Training SELECT tag
  const trainingDetails = () => {
    axios
      .get("http://localhost:8080/training")
      .then((response) => {
        console.log(response);
        const data = [];
        for (var i = 0; i < response.data.training.length; i++) {
          const { training } = response.data.training[i];
          data.push(training);
        }
        setTraining(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    trainingDetails();
    loadData();
  }, []);

  const targetIpField = (e) =>{
     const {name,value} = e.target;
     console.log(ipFieldValue);
     setipFieldValue(
      {...ipFieldValue,
        [name]: value}
     )
    
     if(e.target.name === 'trainingName'){
     setFilterValue(value);
  }}

  function setFilterValue(filterValue) {
    setTableData(
      data.filter((e) => {
        if(filterValue === e.trainingName){
          return e;
        }
      })
    );
  }
  const Validate = (e) =>{
    const errors = {}
    if(!e.trainingName){
      errors.errorTraining = 'please select training name';
      trainingName.current.style.border = '1px solid red';
    }else{
      trainingName.current.style.border = '2px solid #90ee90';
      batchLeadError.current.style.marginLeft = '340px';
    }
    if(!e.batchLead){
      errors.erroBatch = 'please select batch lead';
      batchLead.current.style.border = '1px solid red';
      endDateIcon.current.style.marginTop = '-16px';
      time.current.style.marginTop = '-16px';
      endTime.current.style.marginTop = '-16px';
    }else{
      batchLead.current.style.border = '2px solid #90ee90';
      startDateError.current.style.marginLeft = '355px';
      endDateIcon.current.style.marginTop = '-16px';
      time.current.style.marginTop = '-16px';
      endTime.current.style.marginTop = '-16px';
    }
    if(!e.time){
      errors.time = 'please select start time';
      time.current.style.border = '1px solid red';
    }else{
      time.current.style.border = '2px solid #90ee90';
      endTimeError.current.style.marginLeft = '355px'
    }
    if(!e.endTime){
      errors.endTime = 'please select end time';
      endTime.current.style.border = '1px solid red';
    }else{
      endTime.current.style.border = '2px solid #90ee90';
    }
    return errors;
  }

  const setALignment = (e,sDate,eDate) =>{
    if(e.trainingName && e.batchLead && sDate){
      endDateDiv.current.style.marginTop = '-9px';
      disabledInputDiv.current.style.marginTop = '-12px';
      startTimeDiv.current.style.marginTop = '-12px';
      endTimeDiv.current.style.marginTop = '-12px';
    }
    if(e.trainingName && e.batchLead && sDate && eDate && e.time && e.endTime){
      disabledInputDiv.current.style.marginTop = '17px';
    }
  }

  const handleSubmit = () =>{
    disabledInput.current.style.marginTop = '-17px';
    const errorObj = Validate(ipFieldValue)
     setALignment(ipFieldValue,selectedDate2,selectedDate)
    if(!selectedDate2){
      errorObj.errorsDate = 'please select start date';
      const collection = document.getElementById("sDate");
      //console.log(collection);
      collection.style.border = '1px solid red';
    }else{
      document.getElementById("sDate").style.border = '2px solid #90ee90';
      endDateIcon.current.style.marginTop = '18px';
      time.current.style.marginTop = '12px';
      endTime.current.style.marginTop = '12px';
    }
    if(!selectedDate){
      errorObj.erroreDate = 'please select end date';
      document.getElementById('endDate').style.border = '1px solid red';
    }else{
      document.getElementById('endDate').style.border = '2px solid #90ee90';
    }    
    console.log(errorObj);
    setError(errorObj);
    if(errorObj && Object.keys(errorObj).length != 0){
      return;
    }
    
    if(selectedDate2 && selectedDate){
      let convertedSelectedDate2 = selectedDate2.toLocaleDateString().replaceAll('/','-');
      let convertedSelectedDate = selectedDate.toLocaleDateString().replaceAll('/','-');
      console.log(selectedDate2);
      
      ipFieldValue.sDate = convertedSelectedDate2;
      ipFieldValue.eDate = convertedSelectedDate;
      ipFieldValue.empDetailsLength = tableData.length;
   } 

    console.log(ipFieldValue);
    console.log(checkBoxValue)
    if(checkBoxValue === true){
      //, {headers:{'content-length': 52098}}
      axios.post('http://localhost:8080/batchSendDetails', ipFieldValue).then((response)=>{
      console.log(response);
      Swal.fire({
        title: "Successfully submitted!",
        text: "Click ok to See details!",
        icon: "success",
        customClass: "swal-size-sm"
      }).then(() => {
        navigate("/getBatch");
     });
    })
   }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please select Employee!',
        customClass: "swal-size-sm"
      })
    }
  }

  const handleDelete = () =>{
    axios.delete('')
  }


  const setCheckbox = ((event,value) => {
       //console.log(event.target.checked);
       setCheckBoxValue(event.target.checked)
       console.log(checkBoxValue);
      if(tableData != null && tableData.length > 0){
        for(let i=0;i<tableData.length;i++){
          console.log(tableData[i]);
          if(tableData[i].empId === value)
        tableData[i].check = event.target.checked;
        // console.log(tableData[i].check);
        }
        let arr = [];
        for(let i=0;i<tableData.length;i++){
          if(tableData[i].check === true){
            arr.push(tableData[i]);
          }
        }
        setipFieldValue(
          {...ipFieldValue,
            'batchList': arr}
         )}
    })

    const handleDiscard = () =>{
       setipFieldValue('')
       setSelectedDate('')
       setSelectedDate2('')

    }

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
      <div style={{ backgroundColor: "#F8F9FF", marginTop: "13px" }}>
        <div style={{ display: "flex" }}>
        <div className="blue">
            <div style={{ width: "150px",marginTop:'0px' }} className="empHead">Assign Training</div>
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
          <div className="shadowBox" style={{marginTop: "34px",marginLeft: "23px",paddingLeft:'13px',
              paddingRight:'15px',width: "83%",height: "290px"}}>
            <div className="mt-4 ms-3 addBatch">Add Batch</div>
            <div className="mt-1 ms-3 required">
              Enter the required information below to add a new employee.
            </div>

            <div className="row">
              <div className="col-md-4">
                  <div className="form-floating" style={{width:'310px'}} >
                    <select 
                     ref={trainingName}
                     style={{height:'40px'}}
                      className="form-select ms-3 mt-2 tesxtSize"
                      name="trainingName"
                      value={ipFieldValue.trainingName || ''}
                      onChange={targetIpField}
                    >
                      <option value="">Training Name</option>
                      {training.map((data, i) => {
                        return (
                          <option key={i} value={data}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                    <label className="trainNameFloatAlign">Training Name</label>
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="form-floating" style={{width:'310px'}}>
                    <select
                      ref={batchLead}
                      style={{height:'40px'}}
                      className="form-select tesxtSize mt-2"
                      name="batchLead"
                      id="inputGroupSelect04"
                      aria-label="Example select with button addon"
                      value={ipFieldValue.batchLead || ''}
                      onChange={targetIpField}
                    >
                      <option value ={undefined}>Batch Lead</option>
                      <option value="Project manager">Project Manager</option>
                    </select>
                    <label className="batchLeadFloatAlign">Batch Lead</label>
                  </div>
                </div>
              <div className="col-md-4 mt-2" style={{ position: "relative" }}>
                
                <BsCalendarCheck style={{position: "absolute",top:'11px',right: "50px",zIndex: 1}}/>
                <div className="form-floating" style={{width:'310px'}}>
                  <DatePicker style={{fontSize:'13px'}} wrapperClassName="datePicker" selected={selectedDate2} onChange={setSelectedDate2} 
                  placeholderText="Start Date" className="form-control fontSize" id="sDate" name="sDate"/>
                  <label className="sDateFloatAlign">start date</label>
                </div>  
              </div>
              <div style={{display:'flex'}}>
              <div ref={trainingNameError} style={{color:'red',fontSize:'11.5px',marginLeft:'18px'}}>{error.errorTraining}</div>
              <div ref={batchLeadError} style={{color:'red',fontSize:'11.5px',marginLeft:'191px'}}>{error.erroBatch}</div>
              <div ref={startDateError} style={{color:'red',fontSize:'11.5px',marginLeft:'223px'}}>{error.errorsDate}</div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <div ref={endDateDiv} className="form-group ms-3">
                <div ref={endDateIcon}>
                <BsCalendarCheck style={{position: "absolute",top:'259px',left: '504px',zIndex: 1}}/>
                </div>
                  <div style={{width:'310px'}} className='mt-2 form-floating'>
                  <DatePicker  selected={selectedDate} wrapperClassName="date-picker" placeholderText="End Date" className="form-control tesxtSize"
                   id='endDate' name="eDate" onChange={setSelectedDate}/>
                   <label className="sDateFloatAlign">end date</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div ref={startTimeDiv} className="form-group form-floating" style={{width:'310px'}}>
                  <input style={{height:'40px'}} type={'time'} ref={time} name='time' className="form-control ipHeight" 
                  id="floatingInput" onChange={targetIpField} value={ipFieldValue.time || ''}></input>
                  <label for="floatingInput" className="sTimeLabel startTimeAlign">Start Time</label>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div ref={endTimeDiv} className="form-group form-floating" style={{width:'310px'}}>
                  <input style={{height:'40px'}} type={'time'} ref={endTime} name='endTime' id="floatingInput" 
                   className="form-control" onChange={targetIpField} value={ipFieldValue.endTime || ''}></input>
                  <label for="floatingInput" className="sTimeLabel startTimeAlign">End Time</label>
                </div>
              </div>             
              <div style={{display:'flex'}}>
            <div ref={endDateError} style={{color:'red', fontSize:'11.5px', marginLeft:'18px'}}>{error.erroreDate}</div>
            <div ref={timeError} style={{color:'red', fontSize:'11.5px', marginLeft:'217px'}}>{error.time}</div>
            <div ref={endTimeError} style={{color:'red', fontSize:'11.5px', marginLeft:'228px'}}>{error.endTime}</div>
            <div></div>
            </div>
            <div className="col-md-4 mt-2">
                <div ref={disabledInputDiv} className="form-group form-floating" style={{width:'310px',position:'relative',top:'25px'}}>
                  <input ref={disabledInput} style={{height:'40px'}} disabled name="empDetailsLength" id="floatingInput" 
                   className="form-control ms-3" value={tableData.length}></input>
                  <label for="floatingInput" className="sTimeLabel resLeftAlign">Available Resources</label>
                </div>
            </div>
            </div>
          </div>
          <div style={{marginTop: "360px", marginLeft: "-1063px", width: "83%", height: "auto"}} className='shadowBox'>
            <div className="bgWhiteContent ms-3 mt-2 mb-1"> Available Employee </div>
            <div className="bgwhiteContent2 ms-3">Select the employee and click on submit button to add the employee to this batch.</div>
            <br/>
                  <table id="table" className="table table-striped" style={{ marginLeft: "20px", width: "96.5%" }}>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Employee</th>
                      <th>Number</th>
                      <th>Email-ID</th>
                      <th>Designation</th>
                      <th>Date of joining</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "white" }}>
                  {tableData.map((e, id) => (
                  <tr key={id}>
                    <td style={{ paddingTop: "15px",paddingBottom: "15px",paddingLeft: "15px",}}>
                    <div style={{display:'flex'}}>
                    <div><input type="checkbox" id="checkbox" onClick={(eve) => setCheckbox(eve,e.empId)}/></div> &nbsp; &nbsp;
                      <div>{id + 1}</div>
                      </div>
                    </td>
                    <td style={{ paddingTop: "7px", paddingBottom: "7px" }}>{e.empName}<br/><div className="empIdStyle">{e.empId}</div></td>
                    <td style={{ paddingTop: "15px", paddingBottom: "15px"}}>{e.empMobNo}</td>
                    <td style={{ paddingTop: "15px", paddingBottom: "15px" }}>{e.empEmail}</td>
                    <td style={{ paddingTop: "15px", paddingBottom: "15px" }}>{e.empDesg}</td>
                    <td style={{ paddingTop: "15px", paddingBottom: "15px" }}>{e.joinDate}</td>
                    <td style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                      {/* <MdOutlineDelete style={{ cursor: "pointer", color: "red" }} onClick={()=>handleDelete(e.empId)}/> */}
                    </td>
                    </tr>
            ))}
             </tbody>
            </table>
            <button className="discardButt" style={{marginLeft:'375px'}} onClick={handleDiscard}>Discard</button>
            <button style={{ marginTop: "5px", marginLeft: "15px" }} className="submitButt"onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddBatchDetails;
