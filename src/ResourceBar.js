import React from 'react'
import {Grid, Box} from '@material-ui/core'
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
				<Box>
					<span className="resourceNumberWater">{props.water}</span>
					<span className="resourceNumberFood">{props.food}</span>
					<span className="resourceNumberPeople">{props.people}</span>
				</Box>
			</Grid>
		</Grid>
	)
}
export default ResourceBar