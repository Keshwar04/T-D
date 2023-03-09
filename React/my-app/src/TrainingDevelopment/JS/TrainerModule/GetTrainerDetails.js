import Sidebar from '../../Sidebar/Sidebar';
import '../../CSS/TrainerModule/GetTrainerDetails.css'
import {useState,useEffect} from 'react';
import axios from 'axios';
import { BsEye,BsDot } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import {MdOutlineAddCircleOutline} from "react-icons/md";
import {useNavigate} from 'react-router-dom';

const GetTrainerDetails = () => {

    const [search,setSearch] = useState([]);
    const [data, setData] = useState([]);

    let navigate = useNavigate();

    useEffect(()=>{
      loadData();
    },[])

    let loadData = async() =>{
      let response = await axios.get('http://localhost:8080/scheduleGetDetails')
      console.log(response);
      setData(response.data)
    }

    let editComp = (BatchId) =>{
        navigate(`/updateTrainer/${BatchId}`)
    }

    let viewComp = (BatchId) =>{
      navigate(`/viewTrainer/${BatchId}`)
    }

  return (
    <div>
       <Sidebar/>
       <div className='absolutes'>Trainer's Module</div>
      <div style={{marginTop:'-5px'}} className="shadowBgWhite ms-1">
            <div style={{display:'flex'}}>
          <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
        paddingLeft:'10px'}} className='form-control mb-3' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input></div>
        <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
        </div> <br/> 
        <table id="table" className="table table-striped" style={{marginLeft:'20px',width:'96.5%'}}>
        <thead>
          <tr>
            <th className='WidthAdjust'>Schedule ID</th>
            <th className='WidthAdjust'>Batch ID</th>
            <th className='WidthAdjust'>Trainer</th>
            <th style={{width:'250px'}} className='WidthAdjust'>Trainer's Attendance</th>
            <th className='WidthAdjust'>Status</th>
            <th className='WidthAdjust'>Remarks</th>
            <th className='WidthAdjust'>Action</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:'white'}}>
          {data.filter((val)=>{
           if(search == ""){
              return val
           }else if(val.id.toString().includes(search.toString())){
              return val
           }else if(val.BatchId.toString().includes(search.toString())){
              return val
           }else if(val.TrainerName.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.TrainerStatus.toLowerCase().includes(search.toLowerCase())){
             return val;
           }else if(val.Status.toLowerCase().includes(search.toLowerCase())){
            return val;
           }else if(val.Description.toLowerCase().includes(search.toLowerCase())){
            return val;
           }
          }).map((e, id) => (
            <tr key={id}>
              {id<10 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Schedule 0{id+1}</td> : 
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Schedule {id+1}</td>}       
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Batch {e.BatchId}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.TrainerName}</td>
              {e.TrainerStatus === 'present' ?<td style={{paddingTop:'15px',paddingBottom:'15px',color:'#2ECC71'}}><BsDot/>{e.TrainerStatus}</td>
              :
              <td style={{paddingTop:'15px',paddingBottom:'15px',color:'#E74C3C'}}><BsDot/>{e.TrainerStatus}</td>
              }
              <td>
                {e.Status === 'Incompleted' ? 
                <div className="statusButton" style={{paddingTop:'4px',paddingBottom:'15px',backgroundColor:'#FDEEEC',color:'#E74C3C',fontSize:'11.5px',width:'100px'}}>{e.Status}</div>
                :<></>
                }

                { e.Status === 'Completed' ?
                <div className="statusButton" style={{paddingTop:'4px',backgroundColor:'##EBFAF1', color:'#2ECC71', paddingBottom:'15px',paddingLeft:'18px', fontSize:'11.5px',width:'100px'}}>{e.Status}</div>
                :<></>   
                }
                { e.Status === 'Pending' ?
                <div className="statusButton" style={{paddingTop:'4px',backgroundColor:'#FDF5E7', color:'#E9930A', paddingBottom:'15px',paddingLeft:'28px', fontSize:'11.5px',width:'100px'}}>{e.Status}</div>
                :<></>   
                }
                { e.Status === 'Inprogress' ?
                <div className="statusButton ps-4" style={{paddingTop:'3px',backgroundColor:'#EBFAF1', color:'#2ECC71;', paddingBottom:'12px',paddingLeft:'14px', fontSize:'11.5px',width:'100px'}}>{e.Status}</div>
                :<></>   
                }
              </td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.Description} </td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>
              <BsEye style={{cursor:'pointer',color:'#2ECC71'}} onClick={()=>viewComp(e.BatchId)}/>&nbsp; &nbsp;
              <BiPencil style={{cursor:'pointer',color:'rgb(112, 106, 106)'}} onClick={()=>editComp(e.BatchId)}/>&nbsp;&nbsp;
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </div>
  )
}

export default GetTrainerDetails
