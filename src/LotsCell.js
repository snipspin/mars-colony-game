import React from 'react'

function LotsCell(props) {
  return(
    <div >
      LotsCell of {props.type}  
      {props.extra}
    </div>
  )
}
export default LotsCell