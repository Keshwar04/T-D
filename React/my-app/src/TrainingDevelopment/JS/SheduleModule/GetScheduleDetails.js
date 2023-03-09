import Sidebar from '../../Sidebar/Sidebar';
import '../../CSS/ScheduleModule/GetScheduleDetails.css'
import {useEffect, useState} from 'react';
import { BsEye } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import {IoSearchOutline} from "react-icons/io5";
import {MdOutlineAddCircleOutline} from "react-icons/md";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

const GetScheduleDetails = () => {

  const [search,setSearch] = useState([]);
  const [data, setData] = useState([]);

  let navigate = useNavigate();

  useEffect(()=>{
    loadData();
  },[])

  let convertingExcelToObject = async(e) =>{
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const convert =     console.log(data);};
      reader.readAsBinaryString(file);

    // let response = await axios.post('http://localhost:8080/excelFileReader',data)
    // console.log(response);

  }

  let onChangeExcel = (e) =>{
     let file = e.target.files[0]
     console.log(file);
  }
  let loadData = async() =>{
    let response = await axios.get('http://localhost:8080/scheduleGetDetails')
    console.log(response);
    setData(response.data)
  }

  let viewSchedule = (id,BatchId) =>{
    navigate(`/viewSchedule/${id}/${BatchId}`)
  }

  let updateSchedule = (id,BatchId) =>{
      navigate(`/updateSchedule/${id}/${BatchId}`)
  }

  return (
    <div>
      <Sidebar/>
      <div className='absolutes'>Schedule</div>
      <div style={{marginTop:'-5px'}} className="shadowBgWhite ms-1">
            <div style={{display:'flex'}}>
          <div><input style={{width:'290px',marginTop:'20px',marginLeft:'20px',borderRadius:'4px',fontSize:'13px',height:'30px',border:'1px solid #ced4da',
        paddingLeft:'10px'}} className='form-control' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input></div>
        <IoSearchOutline style={{position:'absolute',marginTop:'28px',marginLeft:'280px',color:'grey'}}/>
        <div style={{marginTop:'-20px',marginLeft:'478px'}}><button className="addEmpButtuon ps-3" onClick={()=>navigate('/addSchedule')}>
          <MdOutlineAddCircleOutline/> Add Schedule</button></div>
        </div> <br/> 
        <table id="table" className="table table-striped" style={{marginLeft:'20px',width:'96.5%'}}>
        <thead>
          <tr>
            <th>Schedule ID</th>
            <th>Batch ID</th>
            <th style={{width:'215px'}}>Training Name</th>
            <th>Topic</th>
            <th>Trainer Name</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:'white'}}>
          {data.filter((val)=>{
           if(search == ""){
              return val
           }else if(val.BatchId.toString().includes(search.toString())){
              return val
           }else if(val.TrainingName.toLowerCase().includes(search.toLocaleString)){
              return val
           }else if(val.Topic.toLowerCase().includes(search.toLowerCase())){
              return val
           }else if(val.TrainerName.toLowerCase().includes(search.toLowerCase())){
            return val;
           }else if(val.Location.toLowerCase().includes(search.toLowerCase())){
            return val;
           }else if(val.StartDate.toString().includes(search.toString())){
            return val;
           }else if(val.Status.toLowerCase().includes(search.toLowerCase())){
            return val;
           }
          }).map((e, id) => (
            <tr key={id}>
              {id<9 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Schedule 0{id+1}</td> : 
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Schedule{id+1}</td>
              }
              {e.BatchId<10 ? <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Batch 0{e.BatchId}</td> :
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>Batch {e.BatchId}</td>
              }
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.TrainingName}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.Topic}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.TrainerName}</td>
              <td style={{paddingTop:'15px',paddingBottom:'15px',width:'220px'}}>{e.Location} </td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>{e.StartDate}</td>
              <td>
              {e.Status === 'Incompleted' ? 
                <div className="statusButton" style={{paddingTop:'4px',paddingBottom:'15px',backgroundColor:'#FDEEEC',color:'#E74C3C',fontSize:'11.5px',width:'100px'}}>{e.Status}</div>
                :<></>
                }

                { e.Status === 'Completed' ?
                <div className="statusButton" style={{paddingTop:'4px',backgroundColor:'#EBFAF1', color:'#2ECC71', paddingBottom:'15px',paddingLeft:'20px', fontSize:'11.5px',width:'100px'}}>{e.Status}</div>
                :<></>   
                }
                { e.Status === 'Pending' ?
                <div className="statusButton" style={{paddingTop:'4px',backgroundColor:'#FDF5E7', color:'#E9930A', paddingBottom:'15px',paddingLeft:'28px', fontSize:'11.5px',width:'100px'}}>{e.Status}</div>
                :<></>   
                }
                { e.Status === 'Inprogress' ?
                <div className="statusButton ps-4" style={{paddingTop:'3px',backgroundColor:'#EBFAF1', color:'#2ECC71', paddingBottom:'12px',paddingLeft:'14px', fontSize:'11.5px',width:'100px'}}>{e.Status}</div>
                :<></>   
                }
              </td>
              <td style={{paddingTop:'15px',paddingBottom:'15px'}}>
              <BsEye style={{cursor:'pointer',color:'#2ECC71'}} onClick={()=>viewSchedule(e.id,e.BatchId)}/>&nbsp; &nbsp;
              <BiPencil style={{cursor:'pointer',color:'rgb(112, 106, 106)'}} onClick={()=>updateSchedule(e.id, e.BatchId)}/>&nbsp;&nbsp;
              
              </td>
            </tr>
          ))}
          {/* <input type={'file'} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style={{width:'250px'}} onChange={convertingExcelToObject}/> */}
        </tbody>
      </table>
        </div>
    </div>
  )
}

export default GetScheduleDetails;
