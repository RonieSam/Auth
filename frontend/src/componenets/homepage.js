import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../contexts/Context'



export default function Homepage() {
  const navigate = useNavigate()
  const context = useContext(Context)
  const {  setAlert} = context
  useEffect(()=>{
    const token=localStorage.getItem("authToken")

    if(!token) {
      setAlert({type:"danger",msg:"Unauthorized Login Please"})
      navigate("/login")}
 
  
  },[navigate,setAlert])




  return (
    <div>
      welcome to Homepage
    </div>
  )
}
