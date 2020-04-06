import React, {useState} from 'react'
import {Button, Grid, Box} from '@material-ui/core'
import BuildingCell from './BuildingCell'
import AddNewBuilding from './AddNewBuilding'

const ActiveBuildings = (props) => {
	// const [buildings, setBuildings] = useState([])
	//const type = "water"
	
	const getJSX = (type, level) => {
		if (type === "water") {
			return (
				<Grid item lg={12} style={{"border": "2px solid blue", "margin": "5px 0", "padding": "20px", "borderRadius": "10px", "maxWidth":"400px"}}>
					<BuildingCell type={"Water"} setResource={props.setWater} resource={props.water} />
				</Grid>
			)
		} else if (type === "food") {
			return (
				<Grid item lg={12} style={{"border": "2px solid green", "margin": "5px 0", "padding": "20px", "borderRadius": "10px", "maxWidth":"400px"}}>
					<BuildingCell type={"Food"} setResource={props.setFood} resource={props.food} />
				</Grid>
			)
		}
		else if (type === "food") {
			return (
				<Grid item xs={12}>
					<BuildingCell type={"People"} setResource={props.setPeople} resource={props.people} />
				</Grid>
			)
		}
	}
	return (
		<Grid
			container
			direction="column"
			justify="space-evenly"
			alignItems = "center"
		>
			{props.buildings.map(building => (
				getJSX(building.type, building.level)
			))}
			<Grid item xs={12}>
				<AddNewBuilding />
			</Grid>
		</Grid>
	)

}
export default ActiveBuildings