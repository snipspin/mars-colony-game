import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import GameSpace from './GameSpace'

const Content = (props) => {
	let [water, setWater] = useState(100)
	let [food, setFood] = useState(100)
	let [people, setPeople] = useState(100)
	return (
		<Switch>
			<Route exact path="/" render={() => <GameSpace water={water} food={food} people={people} setWater={setWater} setFood={setFood} setPeople={setPeople} />} />
		</Switch>
	)
}
export default Content