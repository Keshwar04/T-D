import Sidebar from '../../../Sidebar/Sidebar';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { BiPencil } from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import {MdOutlineAddCircleOutline} from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const GetLocationMasters = () => {

    const [data, setData] = useState([]);
    const [search,setSearch] = useState([]);

    let navigate = useNavigate()

    useEffect(()=>{
     loadData()
    },[])

    const editComp = (id) =>{
         navigate(`/updateLocationMasters/${id}`)
    }

    const loadData = async() =>{
        let response = await axios.get('http://localhost:8080/getLocationDetails')
        console.log(response);
        setData(response.data)
    }

  return (
    <div>
      <Sidebar show='true'/>
      <div className='absolutes'>Master's Location</div>
      <div style={{marginTop:'-5px'}} className="shadowBgWhite ms-1">
            <div style={{display:'flex'}}>
          <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
        paddingLeft:'10px'}} className='form-control' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input></div>
        <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
        <div style={{marginTop:'-20px',marginLeft:'478px'}}><button className="addEmpButtuon ps-3" onClick={()=>navigate('/addLocationMasters')}>
          <MdOutlineAddCircleOutline/> Add Location</button></div>
        </div> <br/> 
        <table id="table" className="table table-striped" style={{marginLeft:'20px',width:'96.5%'}}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>City</th>
            <th>State</th>
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
           }else if(val.state.toLowerCase().includes(search.toLowerCase())){
            return val
           }else if(val.city.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.createdBy.toLowerCase().includes(search.toLowerCase())){
            return val
           }}).map((e, id) => (
            <tr key={id}>
              {id<9 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>0{id+1}</td> : 
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{id+1}</td>
              }
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.city}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.state}</td>
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
export default GetLocationMasters;
