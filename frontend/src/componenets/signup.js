import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Context from '../contexts/Context'

export default function Signup() {
const [credentials,setCredentials]=useState({
  name:"",
  email:"",
  password:""
})
const navigate=useNavigate()
  const context=useContext(Context)
  const {setAlert}=context
  localStorage.removeItem("authToken")



const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}


const onSubmit=async(e)=>{
  e.preventDefault();
  const body=JSON.stringify({
    name:credentials.name,
    email:credentials.email,
    password:credentials.password
  })
  const response = await fetch("http://localhost:8000/api/auth/signup", {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:body
  });
  const json=await response.json()
  if(json.success){
    localStorage.setItem("authToken",json.auth)
    setAlert(json)
    navigate("/")
  }
  else{
    setAlert(json)
  }

}

  return (
    <div style={{position:"relative",height: "100vh"}}>
      <div className="z-3 btn-group position-absolute" style={{position:"absolute",top:"60px",left:"560px"}}>
      <Link to="/signup" className="btn btn-primary active">Sign Up</Link>
      <Link to="/login" className="btn btn-primary ">Sign In</Link>
</div>
      <div style={{ position:"absolute",top:"77px",left:"400px",width:"500px"}}>
        <form className='border border-primary p-5 rounded' onSubmit={onSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
            <input className="form-control" id="name" name='name' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="password"name='password'onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
    </div>
  )
}
