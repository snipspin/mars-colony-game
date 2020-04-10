import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Button, Grid, Box, ButtonBase} from '@material-ui/core'
import BuildingCell from './BuildingCell'
import AddNewBuilding from './AddNewBuilding'
import ResourceBar from './ResourceBar'

const LinkBehavior = React.forwardRef((props, ref) => (
	<RouterLink ref={ref} to="/lots" {...props} />
))

const ActiveBuildings = (props) => {
	// const [buildings, setBuildings] = useState([])
	//const type = "Water
	const getJSX = (type, level, lot, amount, timer, i) => {
		if (type === "water") {
			return (
				<Grid key={i} item lg={12} style={{"border": "2px solid blue", "margin": "5px 0", "padding": "20px", "borderRadius": "10px", "minWidth":"95%"}}>
					<BuildingCell key={i}timer={timer} updateTimer={props.updateTimer} updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} level={level} lot={lot} type={"Water"} setResource={props.setWater} resource={props.water} amount={amount} />
				</Grid>
			)
		} else if (type === "food") {
			return (
				<Grid key={i} item lg={12} style={{"border": "2px solid green", "margin": "5px 0", "padding": "20px", "borderRadius": "10px","minWidth":"95%"}}>
					<BuildingCell key={i} timer={timer} updateTimer={props.updateTimer} updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} level={level} lot={lot} type={"Food"} setResource={props.setFood} resource={props.food} amount={amount}/>
				</Grid>
			)
		}
		else if (type === "people") {
			return (
				<Grid key={i} item lg={12} style={{"border": "2px solid red", "margin": "5px 0", "padding": "20px", "borderRadius": "10px","minWidth":"95%"}}>
					<BuildingCell key={i} timer={timer} updateTimer={props.updateTimer} updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} level={level} lot={lot} type={"People"} setResource={props.setPeople} resource={props.people} amount={amount} />
				</Grid>
			)
		}
	}
	return (
		<Box style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100vw"}}>
		<Box style={{"backgroundColor":"rgba(255,255,255,.75)", "marginBottom":"25px","maxWidth":"75%", "minWidth":"50%","marginTop":"25px", "border":"2px black solid", "borderRadius":"10px", "height":"75%"}}>
		<ResourceBar loadGame={props.loadGame} saveGame={props.saveGame} signedIn={props.signedIn} water={props.water} food={props.food} people={props.people} reset={props.reset} />
		<Grid
			container
			direction="column"
			justify="space-evenly"
			alignItems = "center"
			alignContent = "center"
			style={{"marginBottom":"50px"}}
		>
			{props.buildings.map((building, i) => (
				getJSX(building.type, building.level, building.lot, building.amount, building.timer, i)
			))}
			<Grid item lg={12} style={{"border": "2px dashed grey", "margin": "5px 0", "borderRadius": "10px", "maxWidth":"95%"}}>
            	<ButtonBase  style={{"display":"flex", "justify":"center", "width":"100%", "height":"100%", "textAlign":"center"}} focusRipple component={LinkBehavior}> 
            		<AddNewBuilding />
            	</ButtonBase>
			</Grid>
		</Grid>
		</Box>
		</Box>
	)

}
export default ActiveBuildings