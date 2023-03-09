import React,{useEffect, useState} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { BsEye } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GetTaskEvaluationDetails = () => {

  const [search,setSearch] = useState([]);
  const [data, setData] = useState([]);

  let navigate = useNavigate()

  useEffect(()=>{
    loadData()
  },[])

  const editComp = (batchId,id) =>{
      navigate(`/updateTaskEvaluation/${batchId}/${id}`)
  }

  const viewComp = (batchId,id) =>{
    navigate(`/viewTaskEvaluation/${batchId}/${id}`)
}

  const loadData = async() =>{
    let response  = await axios.get('http://localhost:8080/getTaskEvaluationDetails')
    console.log(response);
    setData(response.data)
  }
  
  return (
    <div>
      <Sidebar/>
      <div className='absolutes'>Task Evaulation</div>
      <div style={{marginTop:'-5px'}} className="shadowBgWhite ms-1">
            <div style={{display:'flex'}}>
          <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
        paddingLeft:'10px'}} className='form-control' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input></div>
        <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
        </div> <br/> 
        <table id="table" className="table table-striped" style={{marginLeft:'20px',width:'96.5%'}}>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Schedule ID</th>
            <th>Batch ID</th>
            <th>Training Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:'white'}}>
          {data.filter((val)=>{
           if(search == ""){
              return val
           }else if(val.id.toString().includes(search.toString())){
              return val
           }else if(val.scheduleId.toString().includes(search.toString())){
            return val
           }else if(val.batchId.toString().includes(search.toString())){
            return val
           }else if(val.TrainingName.toLowerCase().includes(search.toLowerCase())){
              return val
           }}).map((e, id) => (
            <tr key={id}>
              {e.id<=9 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Task 0{e.id}</td> 
              : 
              <td style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'15px'}}>Task{e.id}</td>}

              {e.scheduleId<10 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Schedule 0{e.scheduleId}</td> 
              :
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Schedule {e.scheduleId}</td>}

              {e.batchId<10 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Batch 0{e.batchId}</td> 
              :
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Batch {e.batchId}</td>}

              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.TrainingName}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>
              <BsEye style={{cursor:'pointer',color:'#2ECC71'}} onClick={()=>(viewComp(e.batchId,e.id))}/>&nbsp; &nbsp;
              <BiPencil style={{cursor:'pointer',color:'rgb(112, 106, 106)'}} onClick={()=>(editComp(e.batchId,e.id))}/>&nbsp;&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default GetTaskEvaluationDetails;
