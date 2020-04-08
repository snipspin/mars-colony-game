import React, {useState, useEffect} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Button, Grid, Box, ButtonBase} from '@material-ui/core'
import BuildingCell from './BuildingCell'
import AddNewBuilding from './AddNewBuilding'

const LinkBehavior = React.forwardRef((props, ref) => (
	<RouterLink ref={ref} to="/lots" {...props} />
))

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

				<Grid item lg={12} style={{"border": "2px solid red", "margin": "5px 0", "padding": "20px", "borderRadius": "10px", "maxWidth":"400px"}}>
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
			style={{"marginBottom":"50px"}}
		>
			{props.buildings.map((building, i) => (
				getJSX(building.type, building.level, building.lot, building.amount)
			))}
			<Grid item lg={12} style={{"border": "2px dashed grey", "margin": "5px 0", "borderRadius": "10px", "maxWidth":"400px"}}>
            	<ButtonBase  style={{"display":"flex", "justify":"center", "width":"100%", "height":"100%", "text-align":"center"}} focusRipple component={LinkBehavior}> 
            		<AddNewBuilding />
            	</ButtonBase>
			</Grid>
		</Grid>
	)

}
export default ActiveBuildings