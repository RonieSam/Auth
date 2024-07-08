import React, { useContext } from 'react'
import Context from '../contexts/Context'

export default function Alert() {
  const context = useContext(Context)
  const { alert } = context
  {
    if (alert) {
      return ((<div className={`alert alert-${alert.type}`} role="alert" style={{ height: "60px" }}>
        {alert.msg}
      </div>))
    }
    else { return (<div  className="alert"style={{ height: "60px" }}></div>) }
  }

}


