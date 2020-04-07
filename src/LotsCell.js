import React from 'react'
import {Box} from '@material-ui/core'
function LotsCell(props) {
  return(
    <Box style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "text-align":"center","height": "50px"}}>
      LotsCell of {props.type} 
    </Box>
  )
}
export default LotsCell