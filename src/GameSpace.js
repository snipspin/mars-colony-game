import React, {useState, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ResourceBar from './ResourceBar'
import ActiveBuildings from './ActiveBuildings'
import BuildingCell from './BuildingCell'
import LotsOverview from './LotsOverview'
const GameSpace = (props) => {



	return (
		//top bar resource info
		<div>
			<ResourceBar water={props.water} food={props.food} people={props.people} />
			<Switch>
				<Route path='/lots' component={() => <LotsOverview worldSize={props.worldSize} worldLots={props.buildings} addNewBuildingToLot={props.addNewBuildingToLot} />} />
				<Route path='/' component={() => <ActiveBuildings updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} buildings={props.buildings} water={props.water} food={props.food} people={props.people} setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} />} />
				<Route path='/active' component={() => <ActiveBuildings updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} buildings={props.buildings} water={props.water} food={props.food} people={props.people} setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} />} />
			</Switch>
			
			
		</div>
		//routing to the main column based viewport
		//routing to the add a new cell
		//routing to form to select a building

	)

}
export default GameSpace