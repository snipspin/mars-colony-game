import React from 'react'
import {Box} from '@material-ui/core'
function LotsCell(props) {
	const displayBuilding = () => {
		if(props.type === "water") {
			return (
				<h4 style={{"fontSize":"1em", "margin": "0 auto", "fontWeight": "normal", "textAlign":"center"}}>Ice Mining Plant</h4>
			)
		} else if(props.type === "food") {
			return(
				<h4 style={{"fontSize":"1em", "fontWeight": "normal", "textAlign":"center"}}>Farming Biosphere</h4>
			)
		} else if(props.type === "people"){
			return (
				<h4 style={{"fontSize":"1em", "fontWeight": "normal", "textAlign":"center"}}>Housing Unit</h4>
			)
		} else {
			return (
				<h4 style={{"fontSize":"1.5em", "fontWeight": "normal", "textAlign":"center"}}>Empty Lot</h4>
			)			
		}
	}
  return(
    <Box style={{"height": "100%"}}>
    	{displayBuilding}
    </Box>
  )
}
export default LotsCell