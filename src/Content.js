import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import GameSpace from './GameSpace'

const Content = (props) => {
	let [water, setWater] = useState(100)
	let [food, setFood] = useState(200)
	let [people, setPeople] = useState(100)

		// Get the initial set of buildings owned by player
	const [buildings, setBuildings] = useState([])
	const [worldSize, setWorldSize] = useState(9)
	const [useLocalStorage, setUseLocalStorage] = useState(false)

	const defaultBuildings = 
	[
		{type:"empty", level:0, lot:0, amount:0},
		{type:"water", level:1, lot:1, amount:0},
		{type:"food", level:1, lot:2, amount:0},
		{type:"empty", level:0, lot:3, amount:0},
		{type:"empty", level:0, lot:4, amount:0},
		{type:"empty", level:0, lot:5, amount:0},
		{type:"empty", level:0, lot:6, amount:0},
		{type:"empty", level:0, lot:7, amount:0},
		{type:"empty", level:0, lot:8, amount:0}, 
	]
		// const [activeContent, setActiveContent] = useState('active')
	useEffect(() => {		
		if (typeof(Storage) !== "undefined") {
			// We have access to local storage
			let storedBuildings = JSON.parse(localStorage.getItem("buildings"))
			setUseLocalStorage(true)
			if (storedBuildings !== null && storedBuildings.length > 0) {
				setBuildings(storedBuildings)
			} else {
				setBuildings(defaultBuildings)
			}
		} else {
			// Set the default values
			setBuildings(defaultBuildings)
		}
	},[])

	function storeLocalState() {
		if (useLocalStorage) {
			localStorage.setItem("buildings", JSON.stringify(buildings) )
			let storedBuildings = localStorage.getItem("buildings")
		}
	}
	
	function addNewBuildingToLot(type,lot) {
		let currentBuildings = buildings
		let newBuilding = {type:type, level:1, lot:lot, amount:0}
		currentBuildings[lot] = newBuilding
		setBuildings(currentBuildings)
		storeLocalState()
	}

	function upgradeBuildingInLot(lot, level) {
		let currentBuildings = buildings
		let currentBuilding = buildings[lot]
		currentBuilding.level = level
		currentBuildings[lot] = currentBuilding
		setBuildings(currentBuildings)
		storeLocalState()
	}
	function updateBuildingAmount(lot, amount) {
		let currentBuildings = buildings
		let currentBuilding = buildings[lot]
		currentBuilding.amount = amount
		currentBuildings[lot] = currentBuilding
		setBuildings(currentBuildings)
		storeLocalState()
	}

	return (
		<GameSpace water={water} food={food} people={people} setWater={setWater} setFood={setFood} setPeople={setPeople} addNewBuildingToLot={addNewBuildingToLot} upgradeBuildingInLot={upgradeBuildingInLot} updateBuildingAmount={updateBuildingAmount} buildings={buildings} setBuildings={setBuildings} worldSize={worldSize} setWorldSize={setWorldSize} />
	)
}
export default Content