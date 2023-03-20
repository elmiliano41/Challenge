import React from 'react';


const Alert = ({alert}) => {
    return (
      <div className= "errors">
          {alert.msg}
      </div>
    )
  }
  
  export default Alert