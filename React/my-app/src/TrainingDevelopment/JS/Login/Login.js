import '../../CSS/Login/Login.css';
import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const initValues = {}
  const [ipValues,setIpValues] = useState(initValues);
  const [spinner,setSpinner] = useState(false);
  const [error,setError] = useState({});

  const navigate = useNavigate();
  const errorHandle = useRef();
  const errorHandle2 = useRef();
  const secondIpField = useRef();
  const button  = useRef();

  const handlingUseRef = () =>{
      errorHandle.current.style.marginTop = '-33px';
      errorHandle2.current.style.marginTop = '-33px';
      secondIpField.current.style.marginTop = '-5px';
      button.current.style.marginTop = '5px';
  }

  let checkEmptyObj = (ipValues) => {
    for (let x in ipValues) {
      if (ipValues[x] == null || ipValues[x] == "") {
        return false;
      } else {
        return true;
      }
    }
  };

  const handlingUseRefer = () =>{
    console.log("");
  }

  const getIpValue = (e)=>{
      const {name,value} = e.target;
      console.log(name,value);
      setIpValues({ ...ipValues,
        [name]: value})
  }

  const validate  = (e) =>{
      const errors = {};
      const regexemail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      const regexpassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if(!e.empEmail){
        errors.empEmail = 'email cannot be empty!';
      }else if(!regexemail.test(e.empEmail)){
        errors.empEmail = 'email is not a valid format!'
        secondIpField.current.style.marginTop = '1px';
      }

      if(!e.empPassword){
        errors.empPassword = 'password cannot be empty!';
     }else if(!regexpassword.test(e.empPassword)){
       errors.empPassword = "password not a valid format!";
       //password must contain eight characters,one uppercase \n one lowercase, one number and one special character
     }
      return errors;
  }
  const handleSubmit = () =>{
       setError(validate(ipValues));
       let check = checkEmptyObj(ipValues);
       if(Object.keys(error).length === 0 && check){ 
        handlingUseRefer();
       }else{
         console.log("else part");
        handlingUseRef();
       }
       var userName = ipValues.empEmail;
       var password = ipValues.empPassword;
       const url = "http://localhost:8080/login?epmEmail="+ +"&empPassword="+password
       axios.post(url).then((response)=>{
         if(response.data === 'Login Success'){
           setSpinner(true)
          setTimeout(() => {
            navigate('/get')
          }, 1000);
         }else{
           console.log(response.statusText);
         }

       })
  }
  return (
      <div className='outerContent mt-5'>
      {
        spinner?
          <div id="backdrop">
            <div className="text-center loading">
               <div className="spinner-border" role="status">
              <span className="sr-only"></span>
               </div>
            </div>
          </div>: null
      }
      <button className='FAbutton' style={{marginLeft:'500px', marginTop:'50px'}}>FA</button>
      <div className='head spacing' style={{fontWeight:'600', marginLeft:'550px',
            fontSize:'20px',marginTop:'-48px',color:'#263D93'}}>FA SOFTWARE</div>
      <div className='head ltoR' style={{fontSize:'18px',lineHeight:'18px', letterSpacing:'0.2px',
            marginLeft:'549px',marginTop:'0px',color:'#263D93'}}>SERVICES PVT.LTD</div>
      <div className='small' style={{fontSize:'10px',marginTop:'-4px',color:'#2D419A'}}>Fly Ahead</div>
      <div className='bgDesign'>
      <div style={{marginLeft:'-460px',paddingTop:'40px'}}>
      <div style={{marginLeft:'480px',fontSize:'22px',fontWeight:'600'}}>Login</div>
      <div className='content'>Enter the credentials for login to your account!</div>
      <input style={{marginTop:'20px',color:'black',fontSize:'13.5px'}} placeholder='email' name='empEmail' className='form-control' onChange={getIpValue}/> <br/>
      <div className='error' ref={errorHandle2}>{error.empEmail}</div> <br/>
      <input style={{color:'black',fontSize:'13.5px',marginTop:'20px'}} placeholder='password' name='empPassword' className='form-control' ref={secondIpField} onChange={getIpValue}/> <br/>
      <div style={{width:'340px'}} className='error' ref={errorHandle}>{error.empPassword}</div> <br/>
      <Button variant="primary" className="mr-2" ref={button} onClick={handleSubmit}>Login</Button>
      </div>
      </div>
      </div>
  )
}

export default Login;
