import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import GameSpace from './GameSpace'

const Content = (props) => {
	let [water, setWater] = useState(100)
	let [food, setFood] = useState(200)
	let [people, setPeople] = useState(100)

	function getWater() {
		console.log(`Water is: ${water}`)
		return water
	}
	function updateWater(amount) {
		console.log(`Updateing water to: ${water + amount}`)
		let temp = water + amount
		setWater(temp)
		console.log(water)
	}
	function getFood() {
		return food
	}
	function getPeople() {
		return people
	}

	return (
		<Switch>
			<Route exact path="/" render={() => <GameSpace water={water} food={food} people={people} setWater={setWater} setFood={setFood} setPeople={setPeople} />} />
			<Route path="/lots" render={() => <GameSpace water={water} food={food} people={people} setWater={setWater} setFood={setFood} setPeople={setPeople} />} />
		</Switch>
	)
}
export default Content