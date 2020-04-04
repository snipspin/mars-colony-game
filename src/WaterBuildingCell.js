import React, {useState, useEffect} from 'react'

const WaterBuildingCell = (props) => {
	const [localResource, setLocalResource] = useState(0)
	const [increment, setIncrement] = useState(1)
//https://stackoverflow.com/questions/53395147/use-react-hook-to-implement-a-self-increment-counter
	useEffect(() => {
		const timeOut = setTimeout(() => {
			let amount = localResource + increment
			setLocalResource(amount)
		}, 1000)
		return () => {
			clearTimeout(timeOut)
		}
	},[localResource])
	const clickHandler = (e) => {
		e.preventDefault()
		let amount = localResource + props.water
		props.setWater(amount)
		setLocalResource(0)
	}
	const clickUpgradeHandler = (e) => {
		e.preventDefault()
		let amount = increment + 1
		setIncrement(amount)
	}
	return (
		<div>
			<button onClick={(e) => clickHandler(e)}>Harvest</button>
			<span>{localResource}</span>
			<button onClick={(e) => clickUpgradeHandler(e)}>Upgrade</button>
			<span>Level: {increment}</span>
		</div>
	)
}
export default WaterBuildingCell