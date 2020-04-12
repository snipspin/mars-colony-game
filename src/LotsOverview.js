import React, {useState} from 'react'
import LotsCell from './LotsCell'
import {Box, Grid, Modal, makeStyles, ButtonBase, Button} from '@material-ui/core'
import {buildings as buildingsFromDef} from './buildingsDef'
import { useHistory, Redirect, Link as RouterLink } from 'react-router-dom'
import ResourceBar from './ResourceBar'
import AddNewLots from './AddNewLots'
import GoHome from './GoHome'
/*
props :
  worldSize
  worldLots
  addNewBuildingToLot(type,lot)
*/

const LinkBehavior = React.forwardRef((props, ref) => (
	<RouterLink ref={ref} to="/" {...props} />
))

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LotsOverview = (props) => {
  const classes = useStyles()
  const [modalStyle]= useState(getModalStyle)
  const [open, setOpen] = React.useState(false);
  const [newBuildingIndex, setNewBuildingIndex] = useState(-1)
  const [redirect, setRedirect] = useState(false)
  const history = useHistory();

  const handleOpen = (e, index) => {
    e.preventDefault()
    console.log(index)
    setNewBuildingIndex(index)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleNewBuildingButton(type) {
    handleClose()
    if(type === "water") {
      let tempThreshold = props.peopleThreshold
      tempThreshold = (3 * tempThreshold)
      let tempPeople = props.people - props.peopleThreshold
      props.setPeople(tempPeople)
      props.setPeopleThreshold(tempThreshold)
    } else if(type === "food") {
      let tempThreshold = (3 * props.waterThreshold)
      let tempWater = props.water - props.foodThreshold
      props.setWater(tempWater)
      props.setWaterThreshold(tempThreshold)
    } else if(type === "people") {
      let tempWaterThreshold = props.waterThreshold
      let tempFoodThreshold = props.foodThreshold
      let tempWater = (props.water - props.waterThreshold)
      let tempFood = (props.food - props.foodThreshold)
      tempWaterThreshold = (1.5 * tempWaterThreshold)
      tempFoodThreshold = (3 * tempFoodThreshold)
      props.setWater(tempWater)
      props.setFood(tempFood)
      props.setWaterThreshold(tempWaterThreshold)
      props.setFoodThreshold(tempFoodThreshold)      
    }
    props.addNewBuildingToLot(type,newBuildingIndex)
    // history.push('/active')
    setRedirect(true)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid
        container
        display="column"
        spacing={1}
        justify="center"
        alignItems="center"
      >
        <Grid style={{"textAlign":"center"}} item xs={12}>
          <h2>Add a new building:</h2>
        </Grid>
        <Grid style={{"textAlign":"center"}} item xs={12}>
          {props.people >= props.peopleThreshold ? 
            <Button variant="outlined" onClick={()=>handleNewBuildingButton("water")}>Ice Miner</Button>
            : <Button disabled="true" variant="outlined">Ice Miner: uses {props.peopleThreshold} people</Button>
          }
        </Grid>
        <Grid style={{"textAlign":"center"}} item xs={12}>
          {props.water >= props.waterThreshold ?
            <Button variant="outlined" onClick={()=>handleNewBuildingButton("food")}>Farming Biosphere</Button>
            : <Button disabled="true" variant="outlined">Farming Biosphere: uses {props.waterThreshold} water</Button>
          }
        </Grid>
        <Grid style={{"textAlign":"center"}} item xs={12}>
          {(props.food >= props.foodThreshold && props.water >= props.waterThreshold) ? 
            <Button variant="outlined" onClick={()=>handleNewBuildingButton("people")}>Housing Unit</Button>
            : <Button disabled="true" variant="outlined">Housing Unit: uses {props.foodThreshold} Food, {props.waterThreshold} Water</Button>
          }
        </Grid>
      </Grid>
    </div>
  );

  const renderWorld = () => {
    return props.worldLots.map((lot, i) => {
      if (lot.type === 'empty') {
        // it's an emptyCell
        return (
          <Grid style={{"border": "2px solid black", "height":"100px","margin":"2px", "padding":"0", "borderRadius": "10px"}} item xs={3}>
            <ButtonBase key={i} style={{"display":"flex", "justify":"center", "width":"100%", "height":"100%", "text-align":"center"}} focusRipple onClick={(e) => handleOpen(e,i)}>
              <LotsCell key={i} type="empty" />
            </ButtonBase>
          </Grid>
         )
      }
      else {
        // it's some sort of building
        if(lot.type === "water") {
          return (
            <Grid key={i} style={{"display":"flex", "justifyContent":"center","alignItems":"center", "border": "2px solid blue", "width":"100px", "height":"100px", "margin": "2px", "padding": "0", "borderRadius": "10px"}} item xs={3}>
              <LotsCell key={i} type={lot.type} />
            </Grid>
          )
        } else if(lot.type === "food") {
          return (
            <Grid key={i} style={{"display":"flex", "justifyContent":"center","alignItems":"center", "height": "100px", "width":"100px", "border":"2px solid green", "margin": "2px", "padding": "0", "borderRadius": "10px"}} item xs={3}>
              <LotsCell key={i} type={lot.type} />
            </Grid>
          )          
        } else {
          return (
            <Grid key={i} style={{"display":"flex", "justifyContent":"center","alignItems":"center", "height": "100px", "width":"100px", "border": "2px solid red", "margin": "2px", "padding": "0", "borderRadius": "10px"}} item xs={3}>
              <LotsCell key={i} type={lot.type} />
            </Grid>
          ) 

        }
      }
    })
  }
  // "width":"100%", "height":"100%", 
  return (
    <Box style={{"display":"flex","justifyContent":"center","alignItems":"center"}}>
      <Box style={{"backgroundColor":"rgba(255,255,255,.75)", "maxWidth":"100%", "marginBottom":"25px", "marginTop":"25px", "border":"2px black solid", "borderRadius":"10px", "minWidth":"450px", "width":"50%", "height":"85%"}}>
      <ResourceBar handleCookieLogout={props.handleCookieLogout} logOut={props.logOut} loadGame={props.loadGame} saveGame={props.saveGame} signedIn={props.signedIn} gameSaved={props.gameSaved} setGameSaved={props.setGameSaved} water={props.water} food={props.food} people={props.people} reset={props.reset} />
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={3}
          style={{"maxWidth": "90vw", "margin":"0 auto", "minWidth":"50px"}}
        > 
          <Grid item xs={12} style={{"border": "2px solid grey","margin":"2px","height":"50px", "maxWidth":"400px", "padding":"0", "borderRadius": "10px"}}>
            <ButtonBase  style={{"display":"flex", "justify":"center", "width":"100%", "height":"100%", "textAlign":"center"}} focusRipple component={LinkBehavior}> 
              <GoHome />
            </ButtonBase>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={3}
          style={{"maxWidth": "90vw", "margin":"0 auto", "minWidth":"50px", "marginBottom":"100px"}}
        > 
          {renderWorld()}
          <Grid item xs={12} style={{"border": "2px dashed grey", "margin": "5px 0", "padding":"0", "borderRadius": "10px", "maxWidth":"400px"}}>
            <ButtonBase  style={{"display":"flex", "justify":"center", "width":"100%", "height":"100%", "textAlign":"center"}} focusRipple onClick={()=>props.addLots()}> 
            	<AddNewLots />
            </ButtonBase>
		  	  </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        {redirect?<Redirect to='/active' />:''}
      </Box>
    </Box>
  )
} 

export default LotsOverview