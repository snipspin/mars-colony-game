import React, {useState, useEffect} from 'react'

const ResourceCount = (props) => {
	const [localResource, setLocalResource] = useState(0)
	const [increment, setIncrement] = useState(props.increment)
	const [haverstTrigger, setHarvestTrigger] = useState(false)
	useEffect(()=> {
		setHarvestTrigger(props.harvest)
	}, [props.harvest])
	useEffect(() => {
		const timeOut = setTimeout(() => {
			let amount = localResource + increment
			setLocalResource(amount)
			props.updateBuildingAmount(props.lot, amount)
		}, 1000)
		return () => {
			clearTimeout(timeOut)
		}
	},[localResource])
	useEffect(() => {
				// props.onClick(localResource)
		let amount = localResource + props.resource
		props.setResource(amount)
		setHarvestTrigger(false)
	},[haverstTrigger])
	return (
		<span className={props.resourceType}>{localResource}</span>
	)
}
export default ResourceCount