import React, {useState} from 'react'
import BuildingCell from './BuildingCell'
const ActiveBuildings = (props) => {
	// const [buildings, setBuildings] = useState([])
	//const type = "water"
	
	const getJSX = (type, level) => {
		if (type == "water") {
			return (
				<BuildingCell setResource={props.setWater} resource={props.water} />
			)
		} else if (type == "food") {
			return (
				<BuildingCell setResource={props.setFood} resource={props.food} />
			)
		}
		else if (type == "food") {
			return (
				<BuildingCell setResource={props.setPeople} resource={props.people} />
			)
		}
	}
	return (
		<div>
			{props.buildings.map(building => (
				getJSX(building.type, building.level)
			))}
		</div>
	)

}
export default ActiveBuildings