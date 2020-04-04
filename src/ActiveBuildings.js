import React, {useState} from 'react'
import WaterBuildingCell from './WaterBuildingCell'
const ActiveBuildings = (props) => {
	const [buildings, setBuildings] = useState([])
	const type = "water"
	
	return (
		<div>
			<WaterBuildingCell water={props.water} setWater={props.setWater} type={type} />
		</div>

	)
}
export default ActiveBuildings