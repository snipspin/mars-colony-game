import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import ResourceBar from './ResourceBar'
import ActiveBuildings from './ActiveBuildings'
const GameSpace = (props) => {
	//state info

	return (
		//top bar resource info
		<div>
			<ResourceBar water={props.water} food={props.food} people={props.people} />
			<ActiveBuildings water={props.water} food={props.food} people={props.people} setWater={props.setWater} />
		</div>
		//routing to the main column based viewport
		//routing to the add a new cell
		//routing to form to select a building

	)

}
export default GameSpace