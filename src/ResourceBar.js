import React from 'react'
import {Grid, Box} from '@material-ui/core'
import AccessibilityNewOutlinedIcon from '@material-ui/icons/AccessibilityNewOutlined'
import EcoIcon from '@material-ui/icons/Eco'
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined'
import LocalDrinkOutlinedIcon from '@material-ui/icons/LocalDrinkOutlined'
import './App.css'
const ResourceBar = (props) => {
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems = "center"
		>
			<Grid item xs={12}>
				<Box style={{"display":"flex", "justifyContent":"center"}}>
					<span className="resourceNumberWater"><LocalDrinkOutlinedIcon /> 
						<span style={{"position":"relative", "bottom":"6px"}}>
							{props.water}
						</span>
					</span>
					<span className="resourceNumberFood"><EcoOutlinedIcon />
						<span style={{"position":"relative", "bottom":"6px"}}>
							{props.food}
						</span>
					</span>
					<span className="resourceNumberPeople"><AccessibilityNewOutlinedIcon />
						<span style={{"position":"relative", "bottom":"6px"}}>
							{props.food}
						</span>
					</span>
				</Box>
			</Grid>
		</Grid>
	)
}
export default ResourceBar