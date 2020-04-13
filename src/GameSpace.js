import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ActiveBuildings from './ActiveBuildings'
import LotsOverview from './LotsOverview'
import SignUpComp from './SignUpComp'
import SignInComp from './SignInComp'

const GameSpace = (props) => {

	return (
		//top bar resource info
		<div>
			<Switch>
				<Route path='/signup' component={()=> <SignUpComp userOnChange={props.userOnChange} sessionOnChange={props.sessionOnChange} updateUser={props.updateUser} setUser={props.setUser} signup={props.signup} signedIn={props.signedIn} setSignedIn={props.setSignedIn}/>} />
				<Route path='/signin' component={()=> <SignInComp userOnChange={props.userOnChange} sessionOnChange={props.sessionOnChange} loadUserData={props.loadUserData} signedIn={props.signedIn} setSignedIn={props.setSignedIn}/>} />
				<Route path='/lots' component={() => 
					<LotsOverview logOut={props.logOut} handleCookieLogout={props.handleCookieLogout} loadGame={props.loadGame} saveGame={props.saveGame} water={props.water} food={props.food} people={props.people} signedIn={props.signedIn}
						setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} 
						worldSize={props.worldSize} worldLots={props.buildings} addNewBuildingToLot={props.addNewBuildingToLot} 
						waterThreshold={props.waterThreshold} foodThreshold={props.foodThreshold} peopleThreshold={props.peopleThreshold}
						setWaterThreshold={props.setWaterThreshold} setFoodThreshold={props.setFoodThreshold} setPeopleThreshold={props.setPeopleThreshold}
						addLots={props.addLots}
					/>} 
				/>
				<Route path='/' component={() => <ActiveBuildings waterManager={props.waterManager} setManagerWater={props.setManagerWater}
					allowManager={props.allowManager} handleCookieLogout={props.handleCookieLogout} foodManager={props.foodManager} setManagerFood={props.setManagerFood}
					logOut={props.logOut} reset={props.reset} signedIn={props.signedIn} loadGame={props.loadGame} peopleManager={props.peopleManager} setManagerPeople={props.setManagerPeople}
					saveGame={props.saveGame} updateTimer={props.updateTimer} updateBuildingAmount={props.updateBuildingAmount} 
					upgradeBuildingInLot={props.upgradeBuildingInLot} buildings={props.buildings} water={props.water} food={props.food} 
					people={props.people} setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} />} />
				
				<Route path='/active' component={() => <ActiveBuildings waterManager={props.waterManager} setWaterManager={props.setWaterManager} 
					foodManager={props.foodManager} setFoodManager={props.setFoodManager} peopleManager={props.peopleManager} setPeopleManager={props.setPeopleManager}
					allowManager={props.allowManager} handleCookieLogout={props.handleCookieLogout} logOut={props.logOut} 
					reset={props.reset} signedIn={props.signedIn} loadGame={props.loadGame} saveGame={props.saveGame} updateTimer={props.updateTimer} 
					updateBuildingAmount={props.updateBuildingAmount} upgradeBuildingInLot={props.upgradeBuildingInLot} buildings={props.buildings} water={props.water} 
					food={props.food} people={props.people} setWater={props.setWater} setFood={props.setFood} setPeople={props.setPeople} />} />
			</Switch>
			
			
		</div>
		//routing to the main column based viewport
		//routing to the add a new cell
		//routing to form to select a building
	)
}
export default GameSpace