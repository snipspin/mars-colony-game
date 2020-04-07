import React, {useState, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ResourceBar from './ResourceBar'
import ActiveBuildings from './ActiveBuildings'
import BuildingCell from './BuildingCell'
import LotsOverview from './LotsOverview'
const GameSpace = (props) => {

	// Get the initial set of buildings owned by player
	const [buildings, setBuildings] = useState([])
	const [worldSize, setWorldSize] = useState(9)
	useEffect(() => {
		setBuildings([
			{type:"empty", level:0, lot:0},
			{type:"water", level:1, lot:1},
			{type:"food", level:1, lot:2},
			{type:"empty", level:0, lot:3},
			{type:"empty", level:0, lot:4},
			{type:"empty", level:0, lot:5},
			{type:"empty", level:0, lot:6},
			{type:"empty", level:0, lot:7},
			{type:"empty", level:0, lot:8}
		])
	},[])

	function addNewBuildingToLot(type,lot) {
		let currentBuildings = buildings
		let newBuilding = {type:type, level:1, lot:lot}
		currentBuildings[lot] = newBuilding
		setBuildings(currentBuildings)
	}

	return (
		//top bar resource info
		<div>
			<ResourceBar water={props.water} food={props.food} people={props.people} />
			<Route component={({match}) => <Route path='/lots' component={() => <LotsOverview worldSize={worldSize} worldLots={buildings} addNewBuildingToLot={addNewBuildingToLot} />} /> }/>
			<ActiveBuildings buildings={buildings} water={props.water} food={props.food} people={props.people} setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} />
		</div>
		//routing to the main column based viewport
		//routing to the add a new cell
		//routing to form to select a building

	)

}
export default GameSpace