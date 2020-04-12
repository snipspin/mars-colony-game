import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {Box, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {green, blue, red} from '@material-ui/core/colors'


const BuildingCell = (props) => {
	const [localResource, setLocalResource] = useState(props.amount)
	const [localThreshold, setLocalThreshold]= useState(props.timer)
	const [harvest, setHarvest] = useState(0)
	const [increment, setIncrement] = useState(2 * props.level)
	const [buildingLevel, setBuildingLevel] = useState(props.level)
	const [resourceType, setResourceType] = useState('')
	const [resourceTypeLevel, setResourceTypeLevel] = useState('')
	const GreenButton = withStyles(theme => ({
		root: {
    		color: theme.palette.getContrastText(green[500]),
    		borderColor: green[500],
    		minHeight: "50px",
    		minWidth: "200px",
    		'&:hover': {
      			backgroundColor: green[200],
      			borderColor: green[300],
      			boxShadow: 'none'
    		},
    		'&:active': {
    			backgroundColor: green[200],
    			borderColor: 'green',
    			boxShadow: '0 0 0.2rem 0.1rem rgba(50, 125, 50, .7)'
    		}
  		},
	}))(Button)
	const BlueButton = withStyles(theme => ({
		root: {
    		color: "black",
    		borderColor: blue[500],
    		minHeight: "50px",
    		minWidth: "200px",
    		'&:hover': {
      			backgroundColor: blue[200],
      			borderColor: blue[300],
      			boxShadow: 'none'
    		},
    		'&:active': {
    			backgroundColor: blue[200],
    			borderColor: 'rgba(0,0,255,1)',
    			boxShadow: '0 0 0.2rem 0.1rem rgba(50, 50, 125, .7)'
    		}
  		},
	}))(Button)
	const RedButton = withStyles(theme => ({
		root: {
    		color: "black",
    		borderColor: red[500],
    		minHeight: "50px",
    		minWidth: "200px",
    		'&:hover': {
      			backgroundColor: red[200],
      			borderColor: red[300],
      			boxShadow: 'none'
    		},
    		'&:active': {
    			backgroundColor: red[200],
    			borderColor: 'rgba(255,0,0,1)',
    			boxShadow: '0 0 0.2rem 0.1rem rgba(125, 50, 50, .7)'
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
	},[localResource, localThreshold, props, increment])

	const clickCallBack = useCallback(() => {
		const clickHandler = () => {
			let amount = localResource + props.resource
			props.setResource(amount)
			setLocalResource(0)
			props.updateBuildingAmount(props.lot, 0)
			let harv = harvest + 1
			setHarvest(harv)
		}
		clickHandler()
	},[localResource, harvest, props])
	const clickUpgradeCallBack = useCallback(() => {
		const clickUpgradeHandler = () => {
			let currLevel = buildingLevel + 1
			props.upgradeBuildingInLot(props.lot, currLevel)
			setBuildingLevel(currLevel)
			setLocalThreshold(15)
			props.updateTimer(props.lot, 15)
		}
		clickUpgradeHandler()
	},[props, buildingLevel])

	const GreenMemoHarvest = useMemo(() => {
		return (<GreenButton variant="outlined" onClick={() => clickCallBack()}>Harvest</GreenButton>)
	},[clickCallBack])
	const BlueMemoHarvest = useMemo(() => {
		return (<BlueButton variant="outlined" onClick={() => clickCallBack()}>Harvest</BlueButton>)
	},[clickCallBack])
	const RedMemoHarvest = useMemo(() => {
		return (<RedButton variant="outlined" onClick={() => clickCallBack()}>Nurture</RedButton>)
	},[clickCallBack])

	const GreenMemoUpgrade = useMemo(() => {
		return(
			localThreshold <= 0 ?
				<GreenButton variant="outlined" onClick={() => clickUpgradeCallBack()}>Upgrade</GreenButton> :
				<GreenButton disabled={true} variant="outlined">Upgrade in: {localThreshold}</GreenButton>						
		)
	},[clickUpgradeCallBack, localThreshold])

	const BlueMemoUpgrade = useMemo(() => {
		return(
			localThreshold <= 0 ?
				<BlueButton variant="outlined" onClick={() => clickUpgradeCallBack()}>Upgrade</BlueButton> :
				<BlueButton disabled={true} variant="outlined">Upgrade in: {localThreshold}</BlueButton>						
		)
	},[clickUpgradeCallBack, localThreshold])
	const RedMemoUpgrade = useMemo(() => {
		return(
			localThreshold <= 0 ?
				<RedButton variant="outlined" onClick={() => clickUpgradeCallBack()}>Upgrade</RedButton> :
				<RedButton disabled={true} variant="outlined">Upgrade in: {localThreshold}</RedButton>						
		)
	},[clickUpgradeCallBack, localThreshold])
	const getBuilding = () => {
		if(props.type === "Food") {
			return (
				<Box style={{"display": "flex", "flexDirection": "column", "alignItems":"center", "width": "100%"}}>
					{GreenMemoHarvest}
					<span className={resourceType}>{localResource}</span>
					{GreenMemoUpgrade}
					<span className={resourceTypeLevel}>Level: {buildingLevel}</span>
				</Box>
			)
		} else if(props.type === "Water") {
			return (
				<Box style={{"display": "flex", "flexDirection": "column", "alignItems":"center", "width": "100%"}}>
					{BlueMemoHarvest}
					<span className={resourceType}>{localResource}</span>
					{BlueMemoUpgrade}			
					<span className={resourceTypeLevel}>Level: {buildingLevel}</span>
				</Box>
			)
		} else if(props.type === "People") {
			return (
				<Box style={{"display": "flex", "flexDirection": "column", "alignItems":"center", "width": "100%"}}>
					{RedMemoHarvest}
					<span className={resourceType}>{localResource}</span>
					{RedMemoUpgrade}
					<span className={resourceTypeLevel}>Level: {buildingLevel}</span>
				</Box>
			)
		}
		
	}
	
	return (
		<Box style={{"width":"100%"}}>
			{getBuilding}
		</Box>
	)
}
export default BuildingCell