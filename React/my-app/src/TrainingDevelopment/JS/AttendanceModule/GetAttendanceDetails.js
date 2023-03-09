import Sidebar from '../../Sidebar/Sidebar';
import { BsEye } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

const GetAttendanceDetails = () => {

  const [search,setSearch] = useState([]);
  const [data, setData] = useState([]);
  const [secondData,setSecondData] = useState([])

  let navigate = useNavigate()

  useEffect(()=>{
    loadData()
  },[])

  let loadData = async() =>{
    let response = await axios.get('http://localhost:8080/getAttendanceByDetails')
    console.log(response);
    setData(response.data.batchListTable)
    setSecondData(response.data.batchTrainingListTable)
  }

   let filteredValue = secondData.map(e => e.batchId)
  //  console.log(filteredValue);

     let newArr = [];
     let finalarr =[];
     let temId =0;
     let loopId =0;

  for (let index = 0; index < secondData.length; index++) {
    let id = secondData[index].batchId;
    let attendance = secondData[index].attendance;
    let absent = secondData[index].attendance

    newArr.push({id, attendance,absent});
    console.log(newArr);
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
      console.log(finalarr);
    }
  }
  
  let totalValue =finalarr.map(e => e.total)

  let presentees =finalarr.map(e => e.attendance)
  

  const editComp = (batchId) =>{
    navigate(`/updateAttendance/${batchId}`)
  }

  const viewComp = (batchId) =>{
    navigate(`/viewAttendance/${batchId}`)
  }

  return (
    <div>
      <Sidebar/>     
      <div className='bgAshColor'>
      <div className='absolutes'>Attendance</div>
      <div style={{marginTop:'-5px'}} className="shadowBgWhite ms-1">
            <div style={{display:'flex'}}>
          <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
        paddingLeft:'10px'}} className='form-control' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input></div>
        <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
        </div> <br/> 
        <table id="table" className="table table-striped" style={{marginLeft:'20px',width:'96.5%'}}>
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Training Name</th>
            <th>Attendance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:'white'}}>
          {data.filter((val)=>{
           if(search == ""){
              return val
           }else if(val.batchId.toString().includes(search.toString())){
              return val
           }else if(val.trainingName.toLowerCase().includes(search.toLowerCase())){
              return val
           }}).map((e, id) => (
            <tr key={id}>
              {e.batchId<=9 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Batch 0{e.batchId}</td> 
              : 
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Batch {e.batchId}</td>
              }
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.trainingName}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{presentees[id]}/{totalValue[id]}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>
                <BsEye style={{cursor:'pointer',color:'#2ECC71'}} onClick={()=>viewComp(e.batchId)}/>&nbsp; &nbsp;
                <BiPencil style={{cursor:'pointer',color:'rgb(112, 106, 106)'}} onClick={()=>editComp(e.batchId)}/>&nbsp;&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
       </table>
      </div>
     </div>
    </div>
  )
}

export default GetAttendanceDetails
