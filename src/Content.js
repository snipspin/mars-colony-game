import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import GameSpace from './GameSpace'
import {Button, ClickAwayListener} from '@material-ui/core'
import Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}
const Content = (props) => {
	const [message, setMessage] = useState('')
	const [signedIn, setSignedIn] = useState(false)
	const [user, setUser] = useState('')
	const [water, setWater] = useState(100)
	const [food, setFood] = useState(100)
	const [people, setPeople] = useState(100)
	const [signup, setSignup] = useState(false)
	const [gameSaved, setGameSaved] = useState(false)
	const [gameLoaded, setGameLoaded] = useState(false)
	const [waterThreshold, setWaterThreshold] = useState(0)
  	const [foodThreshold, setFoodThreshold] = useState(0)
  	const [peopleThreshold, setPeopleThreshold] = useState(0)
  	const [data, setData] = useState({})
  	const [open, setOpen] = useState(false)
  	const [openError, setOpenError] = useState(false)
  	const [allowManager, setAllowManager] = useState(false)
  	const [waterManager, setWaterManager] = useState(false)
  	const [foodManager, setFoodManager] = useState(false)
  	const [peopleManager, setPeopleManager] = useState(false)

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
    const position = {
        vertical: 'top',
        horizontal: 'center'
    }
	useEffect(()=> {

	},[user,water,food,people,buildings])
	useEffect(()=> {
		if (useLocalStorage) {
			let resources = {water: water, food: food, people: people}
			localStorage.setItem("resources", JSON.stringify(resources) )
		}
		if((water >= 100000 || food >=100000) || people >= 100000){
			setAllowManager(true)
		}
	},[water, food, people, useLocalStorage])
	useEffect(()=> {
		if(useLocalStorage){
			let managers = {waterManager: waterManager, foodManager: foodManager, peopleManager: peopleManager}
			localStorage.setItem("managers", JSON.stringify(managers))
		}
	},[waterManager,foodManager,peopleManager])
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
			let storedUser = JSON.parse(localStorage.getItem("user"))
			let storedManagers = JSON.parse(localStorage.getItem("managers"))
			setUseLocalStorage(true)
			if (storedBuildings !== null && storedBuildings.length > 0) {
				setBuildings(storedBuildings)
			} else {
				setBuildings(defaultBuildings)
			}
			if(storedManagers !== null){
				setWaterManager(storedManagers.waterManager)
				setFoodManager(storedManagers.foodManager)
				setPeopleManager(storedManagers.peopleManager)
			}
			if(storedUser !== null && storedUser !== ""){
				updateUser(storedUser)
				setSignedIn(true)
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
	const logOut = () => {
		localStorage.clear()
		setUser("")
		setSignedIn(false)
		setBuildings(defaultBuildings)
		setWater(100)
		setFood(100)
		setPeople(100)
	}
    const handleOpen = ()=> {
        setOpen(true)
    }
    const handleOpenError = ()=> {
    	setOpenError(true)
    }
    const handleCloseError = (event, reason) => {
    	if(reason === 'clickaway') {
    		return
    	}
    	setOpenError(false)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        setOpen(false);
    }
    function setManagerWater() {
    	setWaterManager(true)
    	if(useLocalStorage){
			let managers = {waterManager: waterManager, foodManager: foodManager, peopleManager: peopleManager}
			localStorage.setItem("managers", JSON.stringify(managers))
		}
    }
    function setManagerFood() {
    	setFoodManager(true)
    	if(useLocalStorage){
			let managers = {waterManager: waterManager, foodManager: foodManager, peopleManager: peopleManager}
			localStorage.setItem("managers", JSON.stringify(managers))
		}
    }
    function setManagerPeople() {
    	setPeopleManager(true)
    	if(useLocalStorage){
			let managers = {waterManager: waterManager, foodManager: foodManager, peopleManager: peopleManager}
			localStorage.setItem("managers", JSON.stringify(managers))
		}
    }
	function loadGame(username) {
		let data = {
			user: username
		}
	    fetch(`/api/load`, {
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
	                handleOpen()
	                setBuildings(intBuildings)
					updateUser(resultUser)
	                setSignedIn(true)
	                setMessage("Game Loaded!")
	                //props.updateUser(result.token)
	            } else {
	                setMessage(`${response.status} ${response.statusText}: ${result.error}`)
	                handleOpenError()
	            }
	        }).catch( (err) => {
	        	console.log(err)
	        	setMessage(`Error: ${err.toString()}`)
	        	handleOpenError()
	        })
	    }).catch( (err) => {
	        console.log('Error', err)
	        setMessage(`Error: ${err.toString()}`)
	        handleOpenError()
	    })

	}
	function loadUserData(result) {
		
	    setData(result)
	    let resultUser = result.user
	    let resultResources = result.Resources
	    let intWater =  parseInt(resultResources.water)
	    let intFood = parseInt(resultResources.food)
	    let intPeople = parseInt(resultResources.people)
	    setWater(intWater)
	    setFood(intFood)
		setPeople(intPeople)
		setWaterManager(result.Managers.waterManager)
		setFoodManager(result.Managers.foodManager)
		setPeopleManager(result.Managers.peopleManager)
	    let resultBuildings = result.Buildings
	    let intBuildings = resultBuildings.map((curr) => {
			curr.lot = parseInt(curr.lot)
	        curr.level = parseInt(curr.level)
	        curr.amount = parseInt(curr.amount)
	        curr.timer = parseInt(curr.timer)
	        return curr
	    })
	    handleOpen()
	    setBuildings(intBuildings)
		updateUser(resultUser)
	    setMessage("Game Loaded!")
	    setSignedIn(true)
	}

	function saveGame() {
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
			let tempWaterMan = waterManager
			let tempFoodMan = foodManager
			let tempPeopleMan = peopleManager
			let tempManagers = {
				WaterManager: tempWaterMan,
				FoodManager: tempFoodMan,
				PeopleManager: tempPeopleMan
			}
			let data = {
				user: tempUser,
				Resources: tempResources,
				Buildings: {
					building: stringBuildings
				},
				ManagersExtern: tempManagers
			}
			let jsonData = JSON.stringify(data)
			setData(stringBuildings)
	        fetch(`/api/save`, {
	            method: 'POST',
	            body: jsonData,
	            headers: {
	                'Content-Type': 'application/json'
	            }
	        })
	        .then ((response) => {
	            response.json().then(result => {
	                if(response.ok) {
	                	handleOpen()
	                    setMessage(`Game Saved!`)
	             		setGameSaved(true)
	                //props.updateUser(result.token)
	                } else {
	                    setMessage(`${response.status} ${response.statusText}: ${result.error}`)
	                    handleOpenError()
	                }
	            }).catch( (err) => {
	            	setMessage(`Error: ${err.toString()}`)
	            	handleOpenError()
	        	})
	        }).catch( (err) => {
	            console.log('Error', err)
	            setMessage(`Error: ${err.toString()}`)
	            handleOpenError()
	        })
	        let revertBuildings = buildings.map((curr) => {
				curr.lot = parseInt(curr.lot)
				curr.amount = parseInt(curr.amount)
				curr.level = parseInt(curr.level)
				curr.timer = parseInt(curr.timer)
				return curr
			})
		}
	}
	function handleResetButton(){
		if(useLocalStorage){
			localStorage.clear()
			setBuildings(defaultBuildings)
			setWaterManager(false)
			setFoodManager(false)
			setPeopleManager(false)
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

	function AddThreeEmptyLots() {
		let result = createEmptyBuildingsFromLot(3,buildings.length-1)
		let newBldgs = [...buildings, ...result]
		setBuildings(newBldgs)
		console.log(newBldgs)
	}

	return (
		<div>
		<GameSpace
		allowManager={allowManager} setAllowManager={setAllowManager} 
		waterManager={waterManager} setManagerWater={setManagerWater} foodManager={foodManager} 
		setManagerFood={setManagerFood} peopleManager={peopleManager} setManagerPeople={setManagerPeople} 
		loadGame={loadGame} saveGame={saveGame} loadUserData={loadUserData} userOnChange={props.userOnChange}
		signup={signup} setSignup={setSignup} signedIn={signedIn} setSignedIn={setSignedIn} sessionOnChange={props.sessionOnChange}
		water={water} food={food} people={people} setUser={setUser} updateUser={updateUser}	handleCookieLogout={props.handleCookieLogout}
		setWater={setWater} setFood={setFood} setPeople={setPeople} updateTimer={updateTimer}
		addNewBuildingToLot={addNewBuildingToLot} upgradeBuildingInLot={upgradeBuildingInLot} 
		updateBuildingAmount={updateBuildingAmount} buildings={buildings} reset={handleResetButton}
		setBuildings={setBuildings} worldSize={worldSize} setWorldSize={setWorldSize} logOut={logOut}
		waterThreshold={waterThreshold} foodThreshold={foodThreshold} peopleThreshold={peopleThreshold} 
		setWaterThreshold={setWaterThreshold} setFoodThreshold={setFoodThreshold} setPeopleThreshold={setPeopleThreshold}
		addLots={AddThreeEmptyLots} />
		<Snackbar anchorOrigin={position} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {message}
            </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={position} open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {message}
        </Alert>
      </Snackbar>
        </div>
	)
}
export default Content

// creates num * buildings starting with lot
// createEmptyBuildingsFromLot(3, 9) 
// returns 3 empty buildings starting from lot 9
function createEmptyBuildingsFromLot(num, startLot) {
	let bldgs = []
	for(let index = 0; index < num; index++, startLot++) {
		bldgs[index] = createEmptyBuildingAtLot(startLot)
	}
	return bldgs
}

function createEmptyBuildingAtLot(lot) {
	return {type:"empty", level:0, lot:lot, amount:0, timer:0}
}