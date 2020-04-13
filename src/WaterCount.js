import React, {useState, useEffect} from 'react'

const WaterCount = (props) => {
	const [localResource, setLocalResource] = useState(props.parentResource)
	const [increment, setIncrement] = useState(props.increment)
	useEffect(() => {
		setLocalResource(props.parentResource)
	},[props.parentResource])
	useEffect(()=> {
		
		if(props.harvestAll === true){
			props.setHarvestAll(false)
			props.handleHarvestAll()
/*			let amount = localResource + props.resource
			props.setResource(amount)
			props.setHarvestAll(false)
			props.updateBuildingAmount(props.lot, 0)
			setLocalResource(0)
			props.setParentResource(0)
*/
		}
	}, [props.harvestAll])
	return (
		<span className={props.resourceType}>{localResource}</span>
	)
}
export default WaterCount