import React, {useState, useEffect, useMemo} from 'react'
import {Box, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {green, blue, red} from '@material-ui/core/colors'
const BuildingCell = (props) => {
	const [localResource, setLocalResource] = useState(props.amount)
	const [localThreshold, setLocalThreshold]= useState(props.timer)
	const [increment, setIncrement] = useState(2 * props.level)
	const [buildingLevel, setBuildingLevel] = useState(props.level)
	const [resourceType, setResourceType] = useState('')
	const [resourceTypeLevel, setResourceTypeLevel] = useState('')
	const GreenButton = withStyles(theme => ({
		root: {
    		color: theme.palette.getContrastText(green[500]),
    		borderColor: green[500],
    		'&:hover': {
      			backgroundColor: green[200],
      			borderColor: green[300],
      			boxShadow: 'none'
    		}
  		},
	}))(Button)
	const BlueButton = withStyles(theme => ({
		root: {
    		color: "black",
    		borderColor: blue[500],
    		'&:hover': {
      			backgroundColor: blue[200],
      			borderColor: blue[300],
      			boxShadow: 'none'
    		}
  		},
	}))(Button)
	const RedButton = withStyles(theme => ({
		root: {
    		color: "black",
    		borderColor: red[500],
    		'&:hover': {
      			backgroundColor: red[200],
      			borderColor: red[300],
      			boxShadow: 'none'
    		}
  		},
	}))(Button)

//https://stackoverflow.com/questions/53395147/use-react-hook-to-implement-a-self-increment-counter
	useEffect(() => {
		const timeOut = setTimeout(() => {
			let amount = localResource + increment
			setLocalResource(amount)
			props.updateBuildingAmount(props.lot, amount)
			if(localThreshold > 0){
				let tempThres = localThreshold - 1
				setLocalThreshold(tempThres)
				props.updateTimer(props.lot, tempThres)
			}
		}, 1000)
		return () => {
			clearTimeout(timeOut)
		}
	},[localResource, localThreshold])

	useEffect(() => {

	}, [buildingLevel, increment, localThreshold])


	
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
		let currLevel = buildingLevel + 1
		props.upgradeBuildingInLot(props.lot, currLevel)
		setBuildingLevel(currLevel)
		setLocalThreshold(15)
		props.updateTimer(props.lot, 15)
	}
	const GreenMemoHarvest = useMemo(() => {
		return (<GreenButton variant="outlined" onClick={(e) => clickHandler(e)}>Harvest</GreenButton>)
	},[])
	const BlueMemoHarvest = useMemo(() => {
		return (<BlueButton variant="outlined" onClick={(e) => clickHandler(e)}>Harvest</BlueButton>)
	},[])
	const RedMemoHarvest = useMemo(() => {
		return (<RedButton variant="outlined" onClick={(e) => clickHandler(e)}>Harvest</RedButton>)
	},[])
	const GreenMemoUpgrade = useMemo(() => {
		return(
			localThreshold <= 0 ?
				<GreenButton variant="outlined" onClick={(e) => clickUpgradeHandler(e)}>Upgrade</GreenButton> :
				<GreenButton disabled="true" variant="outlined">Upgrade in: {localThreshold}</GreenButton>						
		)
	},[localThreshold])
	const BlueMemoUpgrade = useMemo(() => {
		return(
			localThreshold <= 0 ?
				<BlueButton variant="outlined" onClick={(e) => clickUpgradeHandler(e)}>Upgrade</BlueButton> :
				<BlueButton disabled="true" variant="outlined">Upgrade in: {localThreshold}</BlueButton>						
		)
	},[localThreshold])
	const RedMemoUpgrade = useMemo(() => {
		return(
			localThreshold <= 0 ?
				<RedButton variant="outlined" onClick={(e) => clickUpgradeHandler(e)}>Upgrade</RedButton> :
				<RedButton disabled="true" variant="outlined">Upgrade in: {localThreshold}</RedButton>						
		)
	},[localThreshold])
	const getBuilding = () => {
		if(props.type == "Food") {
			return (
				<Box style={{"display": "flex", "flexDirection": "column", "alignItems":"center", "width": "300px"}}>
					{GreenMemoHarvest}
					<span className={resourceType}>{localResource}</span>
					{GreenMemoUpgrade}
					<span className={resourceTypeLevel}>Level: {buildingLevel}</span>
				</Box>
			)
		} else if(props.type == "Water") {
			return (
				<Box style={{"display": "flex", "flexDirection": "column", "alignItems":"center", "width": "300px"}}>
					{BlueMemoHarvest}
					<span className={resourceType}>{localResource}</span>
					{BlueMemoUpgrade}			
					<span className={resourceTypeLevel}>Level: {buildingLevel}</span>
				</Box>
			)
		} else if(props.type == "People") {
			return (
				<Box style={{"display": "flex", "flexDirection": "column", "alignItems":"center", "width": "300px"}}>
					{RedMemoHarvest}
					<span className={resourceType}>{localResource}</span>
					{RedMemoUpgrade}
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