import React, {useState, useEffect} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Button, Grid, Box, ButtonBase} from '@material-ui/core'
import BuildingCell from './BuildingCell'
import AddNewBuilding from './AddNewBuilding'
import ResourceBar from './ResourceBar'
import {withStyles} from '@material-ui/core/styles'
import {green, blue, red} from '@material-ui/core/colors'

const LinkBehavior = React.forwardRef((props, ref) => (
	<RouterLink ref={ref} to="/lots" {...props} />
))

const ActiveBuildings = (props) => {
	// const [buildings, setBuildings] = useState([])
	//const type = "Water
	const [harvestWater, setHarvestWater] = useState(false)
	const [harvestFood, setHarvestFood] = useState(false)
	const [harvestPeople, setHarvestPeople] = useState(false)
	const BlueButton = withStyles(theme => ({
		root: {
    		color: "black",
    		borderColor: blue[500],
    		height: "50px",
    		minWidth: "200px",
    		'&:hover': {
      			backgroundColor: blue[200],
      			borderColor: blue[300],
      			boxShadow: 'none'
    		},
    		'&:active': {
    			backgroundColor: blue[200],
    			borderColor: 'rgba(0,0,255,1)',
    			boxShadow: '0 0 0.2rem 0.1rem rgba(50, 50, 125, .7)'
    		}
  		},
	}))(Button)
	const GreenButton = withStyles(theme => ({
		root: {
    		color: theme.palette.getContrastText(green[500]),
    		borderColor: green[500],
    		height: "50px",
    		minWidth: "200px",
    		'&:hover': {
      			backgroundColor: green[200],
      			borderColor: green[300],
      			boxShadow: 'none'
    		},
    		'&:active': {
    			backgroundColor: green[200],
    			borderColor: 'green',
    			boxShadow: '0 0 0.2rem 0.1rem rgba(50, 125, 50, .7)'
    		}
  		},
	}))(Button)
	const RedButton = withStyles(theme => ({
		root: {
    		color: "black",
    		borderColor: red[500],
    		height: "50px",
    		minWidth: "200px",
    		'&:hover': {
      			backgroundColor: red[200],
      			borderColor: red[300],
      			boxShadow: 'none'
    		},
    		'&:active': {
    			backgroundColor: red[200],
    			borderColor: 'rgba(255,0,0,1)',
    			boxShadow: '0 0 0.2rem 0.1rem rgba(125, 50, 50, .7)'
    		}
  		},
	}))(Button)
	useEffect(()=> {

	},[props.waterManager, props.foodManager, props.peopleManager])
	const handleBuyWaterManager = (e) => {
		e.preventDefault()
		props.setManagerWater()
		let tempWater = props.water
		tempWater = tempWater - 50000
		props.setWater(tempWater)
	}
	const handleBuyFoodManager = (e) => {
		e.preventDefault()
		props.setManagerFood()
		let tempFood = props.food
		tempFood = tempFood - 50000
		props.setFood(tempFood)
	}
	const handleBuyPeopleManager = (e) => {
		e.preventDefault()
		props.setManagerPeople()
		let tempPeople = props.people
		tempPeople = tempPeople - 50000
		props.setPeople(tempPeople)
	}
	const handleHarvestAllWater = (e) => {
		e.preventDefault()
		let harvestSum = 0
		props.buildings.forEach((building, i) => {
			if(building.type === "water"){
				harvestSum += building.amount
				props.updateBuildingAmount(i, 0)
			}
		})
		let amount = harvestSum + props.water
		props.setWater(amount)
	}
	const handleHarvestAllFood = (e) => {
		e.preventDefault()
		let harvestSum = 0
		props.buildings.forEach((building, i) => {
			if(building.type === "food"){
				harvestSum += building.amount
				props.updateBuildingAmount(i, 0)
			}
		})
		let amount = harvestSum + props.food
		props.setFood(amount)
	}
	const handleHarvestAllPeople = (e) => {
		e.preventDefault()
		let harvestSum = 0
		props.buildings.forEach((building, i) => {
			if(building.type === "people"){
				harvestSum += building.amount
				props.updateBuildingAmount(i, 0)
			}
		})
		let amount = harvestSum + props.people
		props.setPeople(amount)
	}
	const buyManagers = () => {
		return(
			<Grid 
				container
				justify="center"
				alignContent="center"
				alignItems="center"
			>
				<Grid alignSelf="center" style={{"display":"flex", "justifyContent":"center"}} item xs={12} md={4}>
					{(props.water >=100000 && props.waterManager === false) ? <BlueButton variant="outlined" onClick={(e) => handleBuyWaterManager(e)}><span>Buy Water Manager</span></BlueButton>:<BlueButton disabled={true} variant="outlined">Buy Water Manager</BlueButton>}
				</Grid>
				<Grid alignSelf="center" item xs={12} md={4} style={{"display":"flex", "justifyContent":"center"}}>
					{(props.food >=100000 && props.foodManager === false) ? <GreenButton variant="outlined" onClick={(e) => handleBuyFoodManager(e)}><span>Buy Food Manager</span></GreenButton>:<GreenButton disabled={true} variant="outlined">Buy Food Manager</GreenButton>}
				</Grid>
				<Grid alignSelf="center" item xs={12} md={4} style={{"display":"flex", "justifyContent":"center"}}>
					{(props.people >=100000 && props.peopleManager === false) ? <RedButton variant="outlined" onClick={(e) => handleBuyPeopleManager(e)}><span>Buy People Manager</span></RedButton>:<RedButton disabled={true} variant="outlined">Buy Food Manager</RedButton>}
				</Grid>
			</Grid>
		)
	}
	const showManagers = () => {
		return (
			<Grid 
				container
				justify="center"
				alignContent="center"
				alignItems="center"		
			>
				<Grid style={{"display":"flex", "justifyContent":"center"}} item xs={12} md={4}>
					{props.waterManager === true ? <BlueButton variant="outlined" onClick={(e) => handleHarvestAllWater(e)}>Harvest All Water</BlueButton>:<BlueButton disabled={true} variant="outlined">Harvest All Water</BlueButton>}
				</Grid>
				<Grid style={{"display":"flex", "justifyContent":"center"}} item xs={12} md={4}>
					{props.foodManager === true ? <GreenButton variant="outlined" onClick={(e) => handleHarvestAllFood(e)}>Harvest All Food</GreenButton>:<GreenButton disabled={true} variant="outlined">Harvest All Food</GreenButton>}
				</Grid>
				<Grid style={{"display":"flex", "justifyContent":"center"}} item xs={12} md={4}>
					{props.peopleManager === true ? <RedButton variant="outlined" onClick={(e) => handleHarvestAllPeople(e)}>Raise All People</RedButton>:<RedButton disabled={true} variant="outlined">Nurture All People</RedButton>}
				</Grid>
			</Grid>
		)
	}
	const getJSX = (type, level, lot, amount, timer, i) => {
		if (type === "water") {
			return (
				<Grid key={i} item lg={12} style={{"border": "2px solid blue", "margin": "5px 0", "padding": "20px", "borderRadius": "10px", "minWidth":"95%"}}>
					<BuildingCell key={i}timer={timer} harvestAll={harvestWater} setHarvestAll={setHarvestWater} updateTimer={props.updateTimer} updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} level={level} lot={lot} type={"Water"} setResource={props.setWater} resource={props.water} amount={amount} />
				</Grid>
			)
		} else if (type === "food") {
			return (
				<Grid key={i} item lg={12} style={{"border": "2px solid green", "margin": "5px 0", "padding": "20px", "borderRadius": "10px","minWidth":"95%"}}>
					<BuildingCell key={i} timer={timer} harvestAll={harvestFood} setHarvestAll={setHarvestFood} updateTimer={props.updateTimer} updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} level={level} lot={lot} type={"Food"} setResource={props.setFood} resource={props.food} amount={amount}/>
				</Grid>
			)
		}
		else if (type === "people") {
			return (
				<Grid key={i} item lg={12} style={{"border": "2px solid red", "margin": "5px 0", "padding": "20px", "borderRadius": "10px","minWidth":"95%"}}>
					<BuildingCell key={i} timer={timer} harvestAll={harvestPeople} setHarvestAll={setHarvestPeople} updateTimer={props.updateTimer} updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} level={level} lot={lot} type={"People"} setResource={props.setPeople} resource={props.people} amount={amount} />
				</Grid>
			)
		}
	}

	return (
		<Box style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100vw"}}>
		<Box style={{"backgroundColor":"rgba(255,255,255,.75)", "marginBottom":"25px","maxWidth":"75%", "minWidth":"50%","marginTop":"25px", "border":"2px black solid", "borderRadius":"10px", "height":"75%"}}>
		<ResourceBar handleCookieLogout={props.handleCookieLogout} logOut={props.logOut} loadGame={props.loadGame} saveGame={props.saveGame} signedIn={props.signedIn} gameSaved={props.gameSaved} setGameSaved={props.setGameSaved} water={props.water} food={props.food} people={props.people} reset={props.reset} />
		<Grid
			container
			direction="column"
			justify="space-evenly"
			alignItems = "center"
			alignContent = "center"
			style={{"marginBottom":"50px"}}
		>
			{props.allowManager === true ? 
				<Grid item lg={12} style={{"border": "2px solid black", "margin": "5px 15px", "padding": "20px", "borderRadius": "10px","minWidth":"95%"}}>
					{buyManagers()}
				</Grid>
				: <span></span>
			}
			
			<Grid item lg={12} style={{"border": "2px solid black", "margin": "5px 15px", "padding": "20px", "borderRadius": "10px","minWidth":"95%"}}>
				{showManagers()}
			</Grid>
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