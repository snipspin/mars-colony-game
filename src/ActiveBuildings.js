import React, {useState, useEffect} from 'react'
import {Button, Grid, Box} from '@material-ui/core'
import BuildingCell from './BuildingCell'
import AddNewBuilding from './AddNewBuilding'

const ActiveBuildings = (props) => {
	// const [buildings, setBuildings] = useState([])
	//const type = "Water"

	const getJSX = (type, level, lot, amount) => {
		if (type === "water") {
			return (
				<Grid item lg={12} style={{"border": "2px solid blue", "margin": "5px 0", "padding": "20px", "borderRadius": "10px", "maxWidth":"400px"}}>
					<BuildingCell updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} level={level} lot={lot} type={"Water"} setResource={props.setWater} resource={props.water} amount={amount} />
				</Grid>
			)
		} else if (type === "food") {
			return (
				<Grid item lg={12} style={{"border": "2px solid green", "margin": "5px 0", "padding": "20px", "borderRadius": "10px", "maxWidth":"400px"}}>
					<BuildingCell updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} level={level} lot={lot} type={"Food"} setResource={props.setFood} resource={props.food} amount={amount}/>
				</Grid>
			)
		}
		else if (type === "people") {
			return (
				<Grid item xs={12}>
					<BuildingCell updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} level={level} lot={lot} type={"People"} setResource={props.setPeople} resource={props.people} amount={amount} />
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
			{props.buildings.map((building, i) => (
				getJSX(building.type, building.level, building.lot, building.amount)
			))}
			<Grid item xs={12}>
				<AddNewBuilding />
			</Grid>
		</Grid>
	)

}
export default ActiveBuildings