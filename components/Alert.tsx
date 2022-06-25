import React from 'react'

function Alert(error) {
   
  return (
    <div
    className={`alert alert-${error.type}`}
    role="alert"
  >
    {error.message}
  </div>

    )
}

export default Alert