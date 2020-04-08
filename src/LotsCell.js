import React from 'react'
import {Box} from '@material-ui/core'
function LotsCell(props) {
	const displayBuilding = () => {
		if(props.type === "water") {
			return (
				<h4 style={{"fontWeight": "normal", "text-align":"center"}}>Ice Mining Plant</h4>
			)
		} else if(props.type === "food") {
			return(
				<h4 style={{"fontWeight": "normal", "text-align":"center"}}>Farming Biosphere</h4>
			)
		} else if(props.type === "people"){
			return (
				<h4 style={{"fontWeight": "normal", "text-align":"center"}}>Housing Unit</h4>
			)
		} else {
			return (
				<h4 style={{"fontSize":"1.5em", "fontWeight": "normal", "text-align":"center"}}>Empty Lot</h4>
			)			
		}
	}
  return(
    <Box style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "text-align":"center","height": "50px"}}>
    	{displayBuilding}
    </Box>
  )
}
export default LotsCell