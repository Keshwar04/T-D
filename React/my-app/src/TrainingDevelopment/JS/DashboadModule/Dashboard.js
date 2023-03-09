import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar';
import '../../CSS/Dashboard/Dashboard.css';
import {MdOutlineGroups} from 'react-icons/md';
import axios from 'axios';
import { textAlign } from '@mui/system';

const Dashboard = () => {
  const [data,seData] = useState([])
  const [scheduledata,setScheduleData] = useState([])
  const [secondData,setSecondData] = useState([])
  const [trainingData,setTrainingData] = useState([])

  useEffect(()=>{
    loadData()
    // currentDateDetails()
  },[])

  const loadData = async() =>{
    let response = await axios.get('http://localhost:8080/getDashboardDetails')
    console.log(response);
    seData(response.data.batchListDetails)
    setScheduleData(response.data.scheduleDetails)
    setSecondData(response.data.batchTrainingListTable)
    setTrainingData(response.data.trainingListTable)
    console.log(trainingData);
  }

  console.log(trainingData);

  let currentDate = new Date().toLocaleDateString().replaceAll('/','-')


  var arr = [];

    for (let index = 0; index < scheduledata.length; index++) {
      let startDate =  scheduledata[index].StartDate
      let batchId = scheduledata[index].BatchId
      let training = scheduledata[index].TrainingName
      let sTime = scheduledata[index].StartTime
      let eTime = scheduledata[index].EndTime
      let topic = scheduledata[index].Topic
      let location = scheduledata[index].Location;
      let trainingListData;
      let image;
       for (let index = 0; index < trainingData.length; index++) {
         trainingListData = trainingData[index].training
         if(trainingListData.toLowerCase() == training.toLowerCase()){
          image = trainingData[index].image
          // console.log(image);
         }
       }
       
      if(currentDate == startDate){
      arr.push({startDate,batchId,training,sTime,eTime,topic,location,image})
      }
    }
    // let text;
    // if(arr.length == 0){
    //   text = 'Today No Schedule';
    // }else{
    //   text = undefined;
    // }

     let newArr = [];
     let finalarr =[];
     let temId =0;
     let loopId =0;
     
    for (let index = 0; index < secondData.length; index++) {
      let id = secondData[index].batchId;
      let attendance = secondData[index].attendance;
      let absent = secondData[index].attendance
  
      newArr.push({id, attendance,absent});
      //console.log(newArr);
    }
     
    for (let i=0; i<newArr.length; i++){
    
      for (let j=i+1; j<newArr.length; j++)
      {
        if (newArr[i].id>newArr[j].id)
        {
          let temp =newArr[i].id;
          newArr[i].id=newArr[j].id;
          newArr[j].id=temp;
        }
        // console.log(secondData[i].attendance);
       
          if (newArr[i].id==newArr[j].id)
          {
          newArr[j].id=0;
          }				
      }
     
      if(newArr[i].id != 0){
        temId = newArr[i].id;
  
        finalarr.push({batchID:newArr[i].id, total:1, attendance:0, absent:0});
        if(newArr[i].attendance =='present' && (newArr[i].attendance != null)){
          finalarr[loopId].attendance =finalarr[loopId].attendance +1;
        }else if(newArr[i].absent =='absent' && (newArr[i].absent != null)){
          finalarr[loopId].absent =finalarr[loopId].absent +1;
        }
        loopId++;
      }else{
        for (let k = 0; k < finalarr.length; k++) {
         if(finalarr[k].batchID == temId){
          finalarr[k].total =finalarr[k].total +1;
          if(newArr[i].attendance =='present' && (newArr[i].attendance !=null)){
           finalarr[k].attendance =finalarr[k].attendance +1;
          }else if(newArr[i].absent =='absent' && (newArr[i].absent !=null)){
            finalarr[k].absent =finalarr[k].absent +1;
          }
         }
         
        }
        //console.log(finalarr);
      }
    }
  
  let totalValue = finalarr.map(e => e.total)

  let presentees = finalarr.map(e => e.attendance)

  let absentees = finalarr.map(e => e.absent)

  let totalBatches = data.length;

  let filterData = scheduledata.filter(e => e.Status === 'Completed')
  var completedBatches = filterData.length

  let filterData2 = scheduledata.filter(e => e.Status === 'Pending')
  var pendingBatches = filterData2.length

  let filterData3 = scheduledata.filter(e => e.Status === 'Incompleted')
  var InCompleteBatches = filterData3.length

  
  return (
    <div>
      <Sidebar/>
      <div className='scheduleAlign'>Dashboard</div>
    <div className='flex-container'>
      <div className='widthSquare'>
        <MdOutlineGroups className='blue_color rounded-circle'/>
        <div className='totalCount'>{totalBatches}</div>
        <div className='textCount'>Total No of Batches</div>
      </div>
      <div className='widthSquare'>
        <MdOutlineGroups className='green_color rounded-circle'/>
        <div className='totalCount'>{completedBatches}</div>
        <div className='textCount'>Completed Batches</div>
      </div>
      <div className='widthSquare'>
        <MdOutlineGroups className='orange_color rounded-circle'/>
        <div className='totalCount'>{pendingBatches}</div>
        <div className='textCount'>Pending Batches</div>
      </div>
      <div className='widthSquare'>
        <MdOutlineGroups className='red_color rounded-circle'/>
        <div className='totalCount'>{InCompleteBatches}</div>
        <div className='textCount'>Incomplete Batches</div>
      </div>
    </div>
      <div className='flex-container2'>
        <div className='firstSquare'>
          <div className='BatchAtt'>Batch Attendance</div>
          <table className='table table-striped left_margin_move'>
           <thead>
            <tr>
              <th className='tableHead'>Batch ID</th>
              <th className='tableHead'>Batch Name</th>
              <th className='tableHead'>Total Employee</th>
              <th className='tableHead'>Presentees</th>
              <th className='tableHead'>Absentees</th>
            </tr>
           </thead>
           <tbody>
            {data.map((e,i)=>(
             <tr key={i}>
              {e.batchId < 10 ?<td>Batch 0{e.batchId}</td>
              :
              <td>Batch {e.batchId}</td>
              }
              <td>{e.trainingName}</td>
              <td className='totalNoOfColor marLeft'>{totalValue[i]}</td>
              {presentees == 0 ?
               <td className='ps-3'>
                <div className='presentColor'>-</div>
               </td>
              :
               <td className='ps-3'>
                <div className='presentColor'>{presentees[i]}</div>
               </td>
              }
              <td className='ps-3'>
               <div className='absentColor'>{absentees[i]}</div>
              </td>
             </tr>
            ))}
           </tbody>
          </table>
        </div>
        <div className='secondSquare'>
         <div className='BatchAtt'>Today's Training Schedule</div>
         {/* <div>{text}</div> */}
         {arr.length === 0 ?
         <div className='fs-4 text-warning center'>Today No Schedule</div>
          :
          <div className='ashColor'>
            {arr.map((e,i)=>(
             <div className='whiteBgColor p-2' key={i}>
               <div className='row g-1'>
                  <div className='col-2'>
                    <div><img  src={'data:image/png;base64,'+e.image} height='50px' width='50px'/>
                    </div>
                  </div>
                  <div className='col-6'>
                      <span className='fontAlterSize2'>{e.training}</span>
                    <div className='fontAlterColor'>Session 01 : <span className='fontAlterTimeSize'>{e.sTime} - {e.eTime}</span></div>
                  </div>
                  <div className='col-4 my-auto'>
                    <span>10 Par</span>
                    </div>
                    </div>
                    <div className='row g-1 mt-2'>
                <div className='col-4'>
                  <div className='fontAlterColor'>Batch</div>
                  {e.batchId <=9 ?
                  <div className='fontAlterSize'>Batch 0{e.batchId}</div>
                  :
                  <div className='fontAlterSize'>Batch {e.batchId}</div>
                  }
                </div>
                <div className='col-4 ps-2'>
                   <div className='fontAlterColor'>Location</div>
                   <div className='fontAlterSize'>{e.location}</div>
                </div>
                <div className='col-4 ps-5'>
                  <div className='fontAlterColor'>Topic</div>
                  <div className='fontAlterSize'>{e.topic}</div>
                </div>
               </div>
             </div>
             
            ))}
          </div>
         }
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
