import '../../CSS/EmployeeModule/ViewEmpDetails.css';
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {IoCallOutline} from 'react-icons/io5';
import {AiOutlineMail} from 'react-icons/ai';
import { BiPencil } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import {BsDot} from "react-icons/bs";
import Sidebar from '../../Sidebar/Sidebar';

const ViewEmpDetails = () => {

  const [data, setData] = useState([]);
  const [batchData,setBatchData] = useState([]);
  const [scheduleData,setScheduleData] = useState([]);
  const [trainingData,setTrainingData] = useState([]);
  const [batchTrainingListData,setBatchTrainingListData] = useState([]);
  const [firstQuery,setFirstQuery] = useState([]);
  const [secondQuery,setSecondQuery] = useState([]);

  const navigate = useNavigate();

  let {empId} = useParams();

  useEffect(()=>{
    loadData();
    console.log('30thline==>'+empId);
  },[])

  const loadData = () => {
    //console.log(id);
    axios.get("http://localhost:8080/getIdDetails?empId="+empId).then((response) => {
    //  console.log(details);
      console.log(response);
      setData(response.data.empDetails[0]);
      setBatchData(response.data.BatchList);
      setScheduleData(response.data.scheduleDetails);
      setTrainingData(response.data.assignTraining);
      setBatchTrainingListData(response.data.BatchTrainingList)
      setFirstQuery(response.data.firstQuery)
      setSecondQuery(response.data.secondQuery)
    });
  };
  console.log('batch==>',batchData);
  console.log('schedule==>',scheduleData);
  console.log('training==>',trainingData);
  console.log('batchTrainingList==>',batchTrainingListData);

   let firstArr = [];

  for(let x of firstQuery){
    let firstTrainingName = x.TrainingName;
    let batchId = x.BatchId;
    let startTime = x.StartTime;
    let endTime = x.EndTime 
    console.log(x);
    for(let y of secondQuery){
      console.log(y);
      let secondTrainingName = y.trainingName;
      if(firstTrainingName == secondTrainingName){
        let status = y.status;
        firstArr.push({batchId,firstTrainingName,startTime,endTime,status})
      }
    }
  }
  console.log(firstArr);

     const batchValues = batchTrainingListData.filter(e => e.empId == empId)
     console.log(batchValues);

     const arr = [];

     let status;
     let tempArr = [];
     

     for (let index = 0;  index < trainingData.length; index++) {
      let trainingDataEmpId = trainingData[index].empId;
      status = trainingData[index].status;
      let tempTrainingName= trainingData[index].trainingName;
        if(trainingDataEmpId == empId){
          for (let index = 0; index < batchValues.length; index++) {
            let trainingName = batchValues[index].trainingName;
            let tempBatchId = batchValues[index].batchId;
             if(trainingName == tempTrainingName){
                // console.log(batchValues);
               for (let index = 0; index < scheduleData.length; index++) {
                const batchId = scheduleData[index].BatchId             
                 if(tempBatchId == batchId){
                  tempArr.push(status)
                 }
               }
             }
          }
        }
      }

      console.log(tempArr);

     for (let index = 0; index < batchValues.length; index++) {
      let batchId = batchValues[index].batchId;
      let trainingName = batchValues[index].trainingName;
       for (let index = 0; index < scheduleData.length; index++) {
          // console.log(scheduleData);
         let scheduleBatchId = scheduleData[index].BatchId;
         let startTime = scheduleData[index].StartTime;
         let endTime = scheduleData[index].EndTime;
        if(batchId == scheduleBatchId)
           for (let index = 0; index < tempArr.length; index++) {
              let status = tempArr[index];
            arr.push({batchId,trainingName,startTime,endTime,status})
           }
         }
       }
     
     console.log(arr);
    
   
  const goToEdit = (empId) =>{
    navigate(`/update/${empId}`)
  }

  
  return (
    <div>
          <Sidebar/>
          <div className='profile' style={{marginTop:'-7px'}}>
          <div style={{display:'flex'}}>
            <div>Profile</div>
            <div style={{marginTop:'7px',marginLeft:'906px'}} className='topMar greater' onClick={()=>navigate('/get')}>Employee &#62;</div>
          <div style={{marginTop:'7px'}} className='topMar nBSP'>&nbsp;Profile</div>
         </div>
            <div className='mt-1 boxShadow bgWidth'>
                <div className='parent d-flex justify-content-between px-3 py-2'>
                  <div>Profile Details</div>
                  <div style={{cursor:'pointer'}} className='text_Color' onClick={()=>goToEdit(data.empId)}>
                    <BiPencil/><span className='textDec' style={{cursor:'pointer'}} onClick={()=>goToEdit(data.empId)}>edit</span>
                  </div>
                </div>
                <div className='parent d-flex justify-content-between py-3'>
                  <div className='col-lg-3'>
                    <div className='text-center'>
                    <div><img className='rounded-circle' src={`data:image/jpg;base64,${data.image}`} height='100px' width='100px'/></div>
                    {data.status === 'Inactive' ?
                    <div className='font_bold'>
                       <BsDot style={{color:'#E74C3C'}}/> <span className='fontSizeAdjust' style={{color:'#E74C3C'}}>{data.status}</span>
                    </div>
                    :
                    <div className='font_bold ps-5 pt-2'>{data.empName} {data.empLastName}
                       <BsDot style={{color:'#2ECC71'}}/> <span className='fontSizeAdjust' style={{color:'#2ECC71'}}>{data.status}</span>
                    </div>
                    }
                    <div className='fontWithOpacity'>{data.empDesg}</div>
                    <div className='iconSize'><IoCallOutline/>&nbsp;<span>+91 {data.empMobNo}</span></div>
                    <div className='iconSize'><AiOutlineMail/>&nbsp;<span>{data.empEmail}</span></div>
                  </div>
                  </div>
                  <div className='col-lg-9'>
                    <div className='row gy-5 px-5'>
                      <div className='col-3'>
                        <div className="label">EmpId</div>
                        <div className="label-value">{data.empId}</div>
                      </div>
                      <div className='col-3'>
                        <div className="label">Gender</div>
                        <div className="label-value">{data.gender}</div>
                      </div>
                      <div className='col-3'>
                        <div className="label">Date of Birth</div>
                        <div className="label-value">{data.empDOB}</div>
                      </div>
                      <div className='col-3'>
                        <div className="label">Join Date</div>
                        <div className="label-value">{data.joinDate}</div>
                      </div>
                      <div className='col-3'>
                        <div className="label">Location</div>
                        <div className="label-value">{data.location}</div>
                      </div>
                      <div className='col-3'>
                        <div className="label">Probation</div>
                        <div className="label-value">{data.prob}</div>
                      </div>
                      <div className='col-3'>
                        <div className="label">Probation Start Date</div>
                        <div className="label-value">{data.probStartDate}</div>
                      </div>
                      <div className='col-3'>
                        <div className="label">Probation End Date</div>
                        <div className="label-value">{data.probEndDate}</div>
                      </div>
                      <div className='col-3'>
                        <div className="label">Skills</div>
                        <div className="label-value">{data.skill}</div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className='mt-2 boxShadow bgWidths'>
            <div className='ps-3'>Training Info</div>
             <table style={{width:'1045px'}} className='table table table-striped ms-4'>
               <thead>
                <tr>
                 <th>S.No</th>
                 <th>Batch ID</th>
                 <th>Training Name</th>
                 <th>Time Period</th>
                 <th>Status</th>
                </tr>
               </thead>
               <tbody>
                {firstArr.map((e,id)=>(
                <tr key={id}>
                 {id <9 ?
                  <td className='py-3'>0{id+1}</td>
                  :
                  <td className='py-3'>{id+1}</td>
                 }
                 {e.batchId <= 9 ?
                 <td className='py-3'>Batch 0{e.batchId}</td>
                 :
                 <td className='py-3'>Batch {e.batchId}</td>
                 }
                <td className='py-3'>{e.firstTrainingName}</td>
                <td className='py-3'>{e.startTime} - {e.endTime}</td>
                {e.status === 'Assigned'?
                <td>
                 <div style={{marginLeft:'-27px'}} className='statusDiv py-1 ps-4'>{e.status}</div>
                </td>
                :
                <td>
                 <div style={{color:'#E74C3C',background:'#FDEEEC',paddingLeft:'12px',marginLeft:'-27px'}} className='statusDiv pt-1'>{e.status}</div>
                </td>
                }
                </tr>
                ))}
               </tbody>
             </table>
            </div>
          </div>
    </div>
  )
}


export default ViewEmpDetails;