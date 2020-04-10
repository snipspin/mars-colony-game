import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import GameSpace from './GameSpace'
import {Button} from '@material-ui/core'
const Content = (props) => {
	const [message, setMessage] = useState('')
	const [signedIn, setSignedIn] = useState(false)
	const [user, setUser] = useState('')
	const [water, setWater] = useState(100)
	const [food, setFood] = useState(100)
	const [people, setPeople] = useState(100)
	const [signup, setSignup] = useState(false)
	const [waterThreshold, setWaterThreshold] = useState(0)
  	const [foodThreshold, setFoodThreshold] = useState(0)
  	const [peopleThreshold, setPeopleThreshold] = useState(0)
  	const [data, setData] = useState({})

		// Get the initial set of buildings owned by player
	const [buildings, setBuildings] = useState([])
	const [worldSize, setWorldSize] = useState(9)
	const [useLocalStorage, setUseLocalStorage] = useState(false)
	const defaultBuildings = 
	[
		{type:"empty", level:0, lot:0, amount:0, timer:15},
		{type:"water", level:1, lot:1, amount:0, timer:15},
		{type:"food", level:1, lot:2, amount:0, timer:15},
		{type:"empty", level:0, lot:3, amount:0, timer:15},
		{type:"empty", level:0, lot:4, amount:0, timer:15},
		{type:"empty", level:0, lot:5, amount:0, timer:15},
		{type:"empty", level:0, lot:6, amount:0, timer:15},
		{type:"empty", level:0, lot:7, amount:0, timer:15},
		{type:"empty", level:0, lot:8, amount:0, timer:15}, 
	]
	useEffect(()=> {

	},[user,water,food,people,buildings])
	useEffect(()=> {
		if (useLocalStorage) {
			let resources = {water: water, food: food, people: people}
			localStorage.setItem("resources", JSON.stringify(resources) )
		}
	},[water, food, people, useLocalStorage])
	useEffect(()=> {
		if(useLocalStorage) {
			let userObj = {user: user}
			localStorage.setItem("user", JSON.stringify(userObj))
		}
	}, [user])
		// const [activeContent, setActiveContent] = useState('active')
	useEffect(() => {		
		if (typeof(Storage) !== "undefined") {
			// We have access to local storage
			let storedBuildings = JSON.parse(localStorage.getItem("buildings"))
			let storedResources = JSON.parse(localStorage.getItem("resources"))

			setUseLocalStorage(true)
			if (storedBuildings !== null && storedBuildings.length > 0) {
				setBuildings(storedBuildings)
			} else {
				setBuildings(defaultBuildings)
			}

			if (storedResources !== null) {
				setWater(storedResources.water)
				setFood(storedResources.food)
				setPeople(storedResources.people)
			} else {
				setWater(100)
				setFood(100)
				setPeople(100)
			}

		} else {
			// Set the default values
			setBuildings(defaultBuildings)
		}
		let tempWaterThres = water * 2
		let tempFoodThres = food * 2
		let tempPplThres = people * 2
		setWaterThreshold(tempWaterThres)
		setFoodThreshold(tempFoodThres)
		setPeopleThreshold(tempPplThres)
	},[])
	function loadGame(username) {
		let data = {
			user: username
		}
	    fetch(`http://localhost:8080/api/load`, {
	            method: 'POST',
	            body: JSON.stringify(data),
	            headers: {
	                'Content-Type': 'application/json'
	            }
	        })
	    .then ((response) => {
	        response.json().then(result => {
	            if(response.ok) {
	            	setData(result)
	                let resultUser = result.user
	                let resultResources = result.Resources
	                let intWater =  parseInt(resultResources.water)
	                let intFood = parseInt(resultResources.food)
	                let intPeople = parseInt(resultResources.people)
	                setWater(intWater)
	                setFood(intFood)
	                setPeople(intPeople)
	                let resultBuildings = result.Buildings
	                let intBuildings = resultBuildings.map((curr) => {
	                	curr.lot = parseInt(curr.lot)
	                	curr.level = parseInt(curr.level)
	                	curr.amount = parseInt(curr.amount)
	                	curr.timer = parseInt(curr.timer)
	                	return curr
	                })
	                setBuildings(intBuildings)
					updateUser(resultUser)
	                setSignedIn(true)
	                setMessage("User data was loaded!")
	                //props.updateUser(result.token)
	            } else {
	                setMessage(`${response.status} ${response.statusText}: ${result.message}`)
	            }
	        }).catch( (err) => console.log(err))
	    }).catch( (err) => {
	        console.log('Error', err)
	        setMessage(`Error: ${err.toString()}`)
	    })

	}
	function saveGame() {
		let success = false
		if(useLocalStorage && signedIn){
			let tempUser = user
			let tempBuildings = buildings
			let stringBuildings = tempBuildings.map((curr)=> {
				curr.lot = curr.lot.toString()
				curr.amount = curr.amount.toString()
				curr.level = curr.level.toString()
				curr.timer = curr.timer.toString()
				return curr
			})
			let tempWater = water.toString()
			let tempFood = food.toString()
			let tempPeople = people.toString()

			let tempResources = {
				water: tempWater,
				food: tempFood,
				people: tempPeople
			}

			let data = {
				user: tempUser,
				Resources: tempResources,
				Buildings: {
					building: stringBuildings
				}
			}
			let jsonData = JSON.stringify(data)
			setData(stringBuildings)
	        fetch(`http://localhost:8080/api/save`, {
	            method: 'POST',
	            body: jsonData,
	            headers: {
	                'Content-Type': 'application/json'
	            }
	        })
	        .then ((response) => {
	            response.json().then(result => {
	                if(response.ok) {
	                    setMessage("User data was saved!")
	                    success = true
	                //props.updateUser(result.token)
	                } else {
	                    setMessage(`${response.status} ${response.statusText}: ${result.message}`)
	                }
	            }).catch( (err) => console.log(err))
	        }).catch( (err) => {
	            console.log('Error', err)
	            setMessage(`Error: ${err.toString()}`)
	        })
	        let revertBuildings = buildings.map((curr) => {
				curr.lot = parseInt(curr.lot)
				curr.amount = parseInt(curr.amount)
				curr.level = parseInt(curr.level)
				curr.timer = parseInt(curr.timer)
				return curr
			})
		}
		return(success)
	}
	function handleResetButton(){
		if(useLocalStorage){
			localStorage.clear()
			setBuildings(defaultBuildings)
			setWater(100)
			setFood(100)
			setPeople(100)
		}
	}
	function updateUser(userInfo) {
		if(useLocalStorage) {
			localStorage.setItem("user", userInfo)
			let storedUser = localStorage.getItem("user")
			setUser(storedUser)
		}
	}
	function storeLocalState() {
		if (useLocalStorage) {
			localStorage.setItem("buildings", JSON.stringify(buildings) )
			let storedBuildings = localStorage.getItem("buildings")
		}
	}
	
	function addNewBuildingToLot(type,lot) {
		let currentBuildings = buildings
		let newBuilding = {type:type, level:1, lot:lot, amount:0, timer:15}
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
	function updateTimer(lot, timer) {
		let currentBuildings = buildings
		let currentBuilding = buildings[lot]
		currentBuilding.timer = timer
		currentBuildings[lot] = currentBuilding
		setBuildings(currentBuildings)
		storeLocalState()
	}

	return (
		<GameSpace
		saveGame={saveGame} loadGame={loadGame} 
		signup={signup} setSignup={setSignup} signedIn={signedIn} setSignedIn={setSignedIn}
		water={water} food={food} people={people} setUser={setUser} updateUser={updateUser}
		setWater={setWater} setFood={setFood} setPeople={setPeople} updateTimer={updateTimer}
		addNewBuildingToLot={addNewBuildingToLot} upgradeBuildingInLot={upgradeBuildingInLot} 
		updateBuildingAmount={updateBuildingAmount} buildings={buildings} reset={handleResetButton}
		setBuildings={setBuildings} worldSize={worldSize} setWorldSize={setWorldSize}
		waterThreshold={waterThreshold} foodThreshold={foodThreshold} peopleThreshold={peopleThreshold} 
		setWaterThreshold={setWaterThreshold} setFoodThreshold={setFoodThreshold} setPeopleThreshold={setPeopleThreshold} />
	)
}
export default Content