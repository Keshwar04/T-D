import Sidebar from '../../../Sidebar/Sidebar';
import React,{useEffect, useState} from 'react';
import { BsEye } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import {MdOutlineAddCircleOutline} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GetTrainerMasters = () =>{

    const [data, setData] = useState([]);
    const [search,setSearch] = useState([]);

    let navigate = useNavigate()

    useEffect(()=>{
     loadData()
    },[])

    const editComp = (id) =>{
         navigate(`/updateTrainerMasters/${id}`)
    }

    const loadData = async() =>{
        let response = await axios.get('http://localhost:8080/getTrainerNameDetails')
        console.log(response);
        setData(response.data)
    }

    return(
        <div>
           <Sidebar show='true'/>
           <div className='absolutes'>Master's Trainer</div>
        <div style={{marginTop:'-5px'}} className="shadowBgWhite ms-1">
            <div style={{display:'flex'}}>
          <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
        paddingLeft:'10px'}} className='form-control' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input></div>
        <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
        <div style={{marginTop:'-20px',marginLeft:'478px'}}><button className="addEmpButtuon ps-3" onClick={()=>navigate('/addTrainerMasters')}>
          <MdOutlineAddCircleOutline/> Add Trainer</button></div>
        </div> <br/> 
        <table id="table" className="table table-striped" style={{marginLeft:'20px',width:'96.5%'}}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Trainer Name</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:'white'}}>
          {data.filter((val)=>{
           if(search == ""){
              return val
           }else if(val.createdDate.includes(search)){
              return val
           }else if(val.updatedDate.includes(search)){
            return val
           }else if(val.trainerName.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.createdBy.toLowerCase().includes(search.toLowerCase())){
            return val
           }}).map((e, id) => (
            <tr key={id}>
              {id<9 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>0{id+1}</td> : 
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{id+1}</td>
              }
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.trainerName}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.createdBy}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.createdDate}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.updatedDate}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>
              <BiPencil style={{cursor:'pointer',color:'rgb(112, 106, 106)'}} onClick={()=>editComp(e.id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
        </div>
    )
}
export default GetTrainerMasters;