import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import ResourceBar from './ResourceBar'
import ActiveBuildings from './ActiveBuildings'
import BuildingCell from './BuildingCell'
const GameSpace = (props) => {

	// Get the initial set of buildings owned by player
	const [buildings, setBuildings] = useState([])
	useEffect(() => {
		// setBuildings([new RBWaterBuilding(props.water, props.setWater), new RBFoodBuilding(props.food, props.setFood)])
		setBuildings([
			{type:"water", level:1},
			{type:"food", level:1}
		])
	},[])


	

	//https://stackoverflow.com/questions/53395147/use-react-hook-to-implement-a-self-increment-counter
	// Game Event Ticker
	// const [tickEvent, setTickEvent] = useState(false)
	// useEffect(() => {
	// 	const timeOut = setTimeout(() => {
	// 		tick()
	// 	}, 1000)
	// 	return () => {
	// 		clearTimeout(timeOut)
	// 	}
	// },[tickEvent])

	// const tick = () => {
	// 	// Call all buildings and restart the clock
	// 	buildings.forEach(element => {
	// 		element.onTick()
	// 	})

	// 	setTickEvent(!tickEvent)
	// 	console.log('Tick')
	// }
	//state info

	return (
		//top bar resource info
		<div>
			<ResourceBar water={props.water} food={props.food} people={props.people} />
			<ActiveBuildings buildings={buildings} water={props.water} food={props.food} people={props.people} setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} />
		</div>
		//routing to the main column based viewport
		//routing to the add a new cell
		//routing to form to select a building

	)

}
export default GameSpace

// class RBWaterBuilding {
// 	constructor(resource, setResource) {
// 		this.resource = resource
// 		this.setResource = setResource
// 	}
// 	onTick() {
// 		console.log(`Produced water`)
// 	}
// 	onClick(amount) {
// 		// console.log(`Clicked Amount: ${amount}`)
// 		// let temp = this.resource + amount
// 		// console.log(`Temp is: ${temp}`)
// 		this.setResource(amount)
// 		// this.resource = temp
// 	}
// }
// class RBFoodBuilding {
// 	constructor(resource, setResource) {
// 		this.resource = resource
// 		this.setResource = setResource
// 	}
// 	onTick() {
// 		console.log(`Produced food`)
// 	}
// 	onClick(amount) {
// 		this.setResource(this.resource() + amount)
// 	}
// }