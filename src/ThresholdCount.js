import React, {useState, useEffect} from 'react'

const ThresholdCount = (props) => {
	const [localThreshold, setLocalThreshold] = useState(props.timer)
	const [upgradeTrigger, setUpgradeTrigger] = useState(props.upgrade)
	useEffect(() => {
		setUpgradeTrigger(props.upgrade)
	},[props.upgrade])
	useEffect(() => {
		const timeOut = setTimeout(() => {
			if(localThreshold > 0){
				let tempThres = localThreshold - 1
				setLocalThreshold(tempThres)
				props.updateTimer(props.lot, tempThres)
			} else {
				props.setAllowUpgrade(true)
			}
		}, 1000)
		return () => {
			clearTimeout(timeOut)
		}
	},[localThreshold])
	useEffect(() => {
				// props.onClick(localResource)
		props.updateTimer(props.lot, 15)
		props.setUpgrade(false)
		setLocalThreshold(15)
		setUpgradeTrigger(false)
	},[upgradeTrigger])
	return (
		<span>{localThreshold}</span>
	)
}
export default ThresholdCount