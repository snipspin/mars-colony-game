import React, {useState, useEffect} from 'react'
import {Box, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {green, blue, red} from '@material-ui/core/colors'
const BuildingCell = (props) => {
	const [localResource, setLocalResource] = useState(props.amount)
	const [increment, setIncrement] = useState(props.level)
	const [buildingLevel, setBuildingLevel] = useState(props.level)
	const [resourceType, setResourceType] = useState('')
	const [resourceTypeLevel, setResourceTypeLevel] = useState('')
	const GreenButton = withStyles(theme => ({
		root: {
    		color: theme.palette.getContrastText(green[500]),
    		borderColor: green[500],
  		},
	}))(Button);
	const BlueButton = withStyles(theme => ({
		root: {
    		color: "black",
    		borderColor: blue[500],
  		},
	}))(Button);
	const RedButton = withStyles(theme => ({
		root: {
    		color: "black",
    		borderColor: red[500]
  		},
	}))(Button);

//https://stackoverflow.com/questions/53395147/use-react-hook-to-implement-a-self-increment-counter
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

	}, [buildingLevel, increment])


	
	const clickHandler = (e) => {
		e.preventDefault()
		// props.onClick(localResource)
		let amount = localResource + props.resource
		props.setResource(amount)
		setLocalResource(0)
		props.updateBuildingAmount(props.lot, 0)
	}
	const clickUpgradeHandler = (e) => {
		e.preventDefault()
		let amount = increment + 1
		setIncrement(amount)
		props.upgradeBuildingInLot(props.lot, amount)
		setBuildingLevel(amount)
	}
	const getBuilding = () => {
		if(props.type == "Food") {
			return (
				<Box style={{"display": "flex", "flexDirection": "column", "alignItems":"center", "width": "300px"}}>
					<GreenButton variant="outlined" onClick={(e) => clickHandler(e)}>Harvest</GreenButton>
					<span className={resourceType}>{localResource}</span>
					<GreenButton variant="outlined" onClick={(e) => clickUpgradeHandler(e)}>Upgrade</GreenButton>
					<span className={resourceTypeLevel}>Level: {buildingLevel}</span>
				</Box>
			)
		} else if(props.type == "Water") {
			return (
				<Box style={{"display": "flex", "flexDirection": "column", "alignItems":"center", "width": "300px"}}>
					<BlueButton variant="outlined" onClick={(e) => clickHandler(e)}>Harvest</BlueButton>
					<span className={resourceType}>{localResource}</span>
					<BlueButton variant="outlined" onClick={(e) => clickUpgradeHandler(e)}>Upgrade</BlueButton>
					<span className={resourceTypeLevel}>Level: {buildingLevel}</span>
				</Box>
			)
		} else if(props.type == "People") {
			return (
				<Box style={{"display": "flex", "flexDirection": "column", "alignItems":"center", "width": "300px"}}>
					<RedButton variant="outlined" onClick={(e) => clickHandler(e)}>Nurture</RedButton>
					<span className={resourceType}>{localResource}</span>
					<RedButton variant="outlined" onClick={(e) => clickUpgradeHandler(e)}>Upgrade</RedButton>
					<span className={resourceTypeLevel}>Level: {buildingLevel}</span>
				</Box>
			)
		}
		
	}
	
	return (
		<Box style={{"width":"300px"}}>
			{getBuilding}
		</Box>
	)
}
export default BuildingCell