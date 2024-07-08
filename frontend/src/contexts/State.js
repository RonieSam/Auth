import React, { useState } from 'react'
import Context from './Context'

const State = (props) => {
  const [alert, setAlertState] = useState()


  const setAlert = (res) => {
    setAlertState({
      msg: res.msg,
      type: res.success ? "success" : "danger"
    })
    setTimeout(() => {
      setAlertState()
    }, 4000);
  }
 
  
  return (
    <Context.Provider value={{ setAlert, alert }}>
      {props.children}
    </Context.Provider>
  )
}
export default State