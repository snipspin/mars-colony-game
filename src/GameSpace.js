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
			<ResourceBar water={props.water} food={props.food} people={props.people} reset={props.reset} />
			<Switch>
				<Route path='/lots' component={() => 
					<LotsOverview water={props.water} food={props.food} people={props.people}
						setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} 
						worldSize={props.worldSize} worldLots={props.buildings} addNewBuildingToLot={props.addNewBuildingToLot} 
						waterThreshold={props.waterThreshold} foodThreshold={props.foodThreshold} peopleThreshold={props.peopleThreshold}
						setWaterThreshold={props.setWaterThreshold} setFoodThreshold={props.setFoodThreshold} setPeopleThreshold={props.setPeopleThreshold}
					/>} 
				/>
				<Route path='/' component={() => <ActiveBuildings updateTimer={props.updateTimer} updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} buildings={props.buildings} water={props.water} food={props.food} people={props.people} setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} />} />
				<Route path='/active' component={() => <ActiveBuildings updateTimer={props.updateTimer} updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} buildings={props.buildings} water={props.water} food={props.food} people={props.people} setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} />} />
			</Switch>
			
			
		</div>
		//routing to the main column based viewport
		//routing to the add a new cell
		//routing to form to select a building

	)

}
export default GameSpace