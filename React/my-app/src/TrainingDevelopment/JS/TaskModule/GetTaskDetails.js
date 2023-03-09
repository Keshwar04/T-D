import Sidebar from '../../Sidebar/Sidebar';
import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { BsEye } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import {MdOutlineAddCircleOutline} from "react-icons/md";
import axios from 'axios';

const GetTaskDetails = () => {
  const [search,setSearch] = useState([]);
  const [data, setData] = useState([]);

  let navigate = useNavigate();

  useEffect(()=>{
    loadData()
  },[])

  let editComp = (batchId,id) =>{
    navigate(`/updateTask/${batchId}/${id}`)
  }

  let viewComp = (batchId,id) =>{
    navigate(`/viewTask/${batchId}/${id}`)
  }

  const loadData = async () =>{
    let response = await axios.get('http://localhost:8080/getTaskDetails')
    console.log(response);
    setData(response.data)
  }
  return (
    <div>
      <Sidebar/>
      <div className='absolutes'>Task</div>
      <div style={{marginTop:'-5px'}} className="shadowBgWhite ms-1">
            <div style={{display:'flex'}}>
          <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
        paddingLeft:'10px'}} className='form-control' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input></div>
        <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
        <div style={{marginTop:'-20px',marginLeft:'478px'}}><button className="addEmpButtuon ps-3" onClick={()=>navigate('/addTask')}>
          <MdOutlineAddCircleOutline/> Add Task</button></div>
          
        </div> <br/> 
        <table id="table" className="table table-striped" style={{marginLeft:'20px',width:'96.5%'}}>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Batch ID</th>
            <th>Title</th>
            <th>Assigned By</th>
            <th>Task Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:'white'}}>
          {data.filter((val)=>{
           if(search == ""){
              return val
           }else if(val.id.toString().includes(search.toString())){
              return val
           }else if(val.batchId.toString().includes(search.toString())){
            return val
           }else if(val.taskTitle.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.assignedBy.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.taskType.toLowerCase().includes(search.toLowerCase())){
            return val
           }else if(val.startDate?.includes(search)){
             return val;
           }else if(val.endDate?.includes(search)){
            return val;
           }else if(val.status.toLowerCase().includes(search.toLowerCase())){
            return val;
           }
          }).map((e, id) => (
            <tr key={id}>
              {e.id<10 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Task 0{e.id}</td> 
              : 
              <td style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'15px'}}>Task{e.id}</td>}
              {e.BatchId<10 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Batch 0{e.BatchId}</td> 
              :
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Batch {e.batchId}</td>}
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.taskTitle}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.assignedBy}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px',width:'220px'}}>{e.taskType}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.startDate} </td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.endDate}</td>
              <td>
                {e.status === 'Incompleted' ? 
                <div className="statusButton" style={{paddingTop:'3px',paddingBottom:'15px',backgroundColor:'#FDEEEC',color:'#E74C3C',fontSize:'11.5px',width:'100px'}}>{e.status}</div>
                :<></>
                }

                { e.status === 'Completed' ?
                <div className="statusButton" style={{paddingTop:'3px',backgroundColor:'#EBFAF1', color:'#2ECC71', paddingBottom:'15px',paddingLeft:'20px', fontSize:'11.5px',width:'100px'}}>{e.status}</div>
                :<></>   
                }
                { e.status === 'Pending' ?
                <div className="statusButton" style={{paddingTop:'4px',backgroundColor:'#FDF5E7', color:'#E9930A', paddingBottom:'15px',paddingLeft:'28px', fontSize:'11.5px',width:'100px'}}>{e.status}</div>
                :<></>   
                }
                { e.status === 'Inprogress' ?
                <div className="statusButton ps-4" style={{paddingTop:'3px',backgroundColor:'#EBFAF1', color:'#2ECC71;', paddingBottom:'12px',paddingLeft:'14px', fontSize:'11.5px',width:'100px'}}>{e.status}</div>
                :<></>   
                }
              </td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>
              <BsEye style={{cursor:'pointer',color:'#2ECC71'}} onClick={()=>viewComp(e.batchId,e.id)}/>&nbsp; &nbsp;
              <BiPencil style={{cursor:'pointer',color:'rgb(112, 106, 106)'}} onClick={()=>editComp(e.batchId,e.id)}/>&nbsp;&nbsp;
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default GetTaskDetails
