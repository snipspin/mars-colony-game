import React, {useState, useEffect} from 'react'
import {Grid, Box, Button, FormControl, Input, InputLabel} from '@material-ui/core'
import AccessibilityNewOutlinedIcon from '@material-ui/icons/AccessibilityNewOutlined'
import EcoIcon from '@material-ui/icons/Eco'
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined'
import LocalDrinkOutlinedIcon from '@material-ui/icons/LocalDrinkOutlined'
import {Link as RouterLink, Redirect} from 'react-router-dom'

import './App.css'


const ResourceBar = (props) => {
	const LinkBehaviorSignUp = React.forwardRef((props, ref) => (
		<RouterLink ref={ref} to="/signup" {...props} />
	))
	const [localUsername, setLocalUsername] = useState("")
	useEffect(() => {
	}, [localUsername])
	const handleSubmit = (e) => {
		e.preventDefault()
		props.loadGame(localUsername)
	}
	const handleSave = (e) => {
		e.preventDefault()
		props.saveGame()
	}
	const handleLogOut = (e) => {
		e.preventDefault()
		props.handleCookieLogout()
		props.logOut()
	}

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems = "center"
			spacing={1}
		>
			<Grid item xs={12}>
				<h2 style={{"fontWeight":"normal"}}>Martian Terraforming</h2>
			</Grid>
			{props.signedIn === false ? 			
				<Grid item xs={12}>
					<Button variant="outlined" component={LinkBehaviorSignUp}>
						Sign Up
					</Button>
				</Grid>
				:
				<Grid item xs={12}>
					<Button variant="outlined" onClick={(e)=> handleLogOut(e)}>
						Log Out
					</Button>
				</Grid>}
			{props.signedIn === true ? 
				<Grid item xs={12}>
					<Button variant="outlined" onClick={(e) => handleSave(e)}>
						Save Game
					</Button>
				</Grid>
				: <span></span>
			}
			<Grid item xs={12}>
				<Button variant="outlined" onClick={() => props.reset()}>
					Reset Game
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Box style={{"display":"flex", "justifyContent":"center"}}>
					<span className="resourceNumberWater"><LocalDrinkOutlinedIcon /> 
						<span style={{"position":"relative", "bottom":"6px"}}>
							{props.water}
						</span>
					</span>
					<span className="resourceNumberFood"><EcoOutlinedIcon />
						<span style={{"position":"relative", "bottom":"6px"}}>
							{props.food}
						</span>
					</span>
					<span className="resourceNumberPeople"><AccessibilityNewOutlinedIcon />
						<span style={{"position":"relative", "bottom":"6px"}}>
							{props.people}
						</span>
					</span>
				</Box>
			</Grid>
		</Grid>
	)
}
export default ResourceBar