import React, {useState} from 'react'
import LotsCell from './LotsCell'
import {Grid, Modal, makeStyles, ButtonBase, Button} from '@material-ui/core'
import {buildings as buildingsFromDef} from './buildingsDef'
import { useHistory, Redirect } from 'react-router-dom'
/*
props :
  worldSize
  worldLots
  addNewBuildingToLot(type,lot)
*/
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
    width: 400,
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
      let tempThreshold = props.waterThreshold
      tempThreshold *= 2
      props.setWaterThreshold(tempThreshold)
    } else if(type === "food") {
      let tempThreshold = props.foodThreshold
      tempThreshold *= 2
      props.setFoodThreshold(tempThreshold)
    } else {
      let tempThreshold = props.peopleThreshold
      tempThreshold *= 2
      props.setPeopleThreshold(tempThreshold)      
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
        <Grid style={{"text-align":"center"}} item xs={12}>
          <h2>Add a new building:</h2>
        </Grid>
        <Grid style={{"text-align":"center"}} item xs={12}>
          {props.people >= props.peopleThreshold ? 
            <Button variant="outlined" onClick={()=>handleNewBuildingButton("water")}>Ice Miner</Button>
            : <Button disabled="true" variant="outlined" onClick={()=>handleNewBuildingButton("water")}>Ice Miner</Button>
          }
        </Grid>
        <Grid style={{"text-align":"center"}} item xs={12}>
          {props.water >= props.waterThreshold ?
            <Button variant="outlined" onClick={()=>handleNewBuildingButton("food")}>Farming Biosphere</Button>
            : <Button disabled="true" variant="outlined" onClick={()=>handleNewBuildingButton("food")}>Farming Biosphere</Button>
          }
        </Grid>
        <Grid style={{"text-align":"center"}} item xs={12}>
          {(props.food >= props.foodThreshold && props.water >= props.waterThreshold) ? 
            <Button variant="outlined" onClick={()=>handleNewBuildingButton("people")}>Housing Unit</Button>
            : <Button disabled="true" variant="outlined" onClick={()=>handleNewBuildingButton("food")}>Housing Unit</Button>
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
          <Grid style={{"border": "2px solid black", "height":"100%", "margin":"2px", "padding":"0", "borderRadius": "10px"}} item xs={3}>
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
            <Grid style={{"border": "2px solid blue", "margin": "2px", "padding": "0", "borderRadius": "10px"}} item xs={3}>
              <LotsCell key={i} type={lot.type} />
            </Grid>
          )
        } else if(lot.type === "food") {
          return (
            <Grid style={{"border": "2px solid green", "margin": "2px", "padding": "0", "borderRadius": "10px"}} item xs={3}>
              <LotsCell key={i} type={lot.type} />
            </Grid>
          )          
        } else {
          return (
            <Grid style={{"border": "2px solid red", "margin": "2px", "padding": "0", "borderRadius": "10px"}} item xs={3}>
              <LotsCell key={i} type={lot.type} />
            </Grid>
          ) 

        }
      }
    })
  }

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        alignContent="center"
        spacing={3}
        style={{"maxWidth": "50vw", "margin":"0 auto"}}
      >
       {renderWorld()}
        <Grid style={{"border": "2px solid grey", "height":"100%", "margin":"2px", "padding":"0", "borderRadius": "10px"}} item xs={3}>
          <ButtonBase style={{"display":"flex", "justify":"center", "width":"100%", "height":"100%", "text-align":"center"}} focusRipple onClick={()=>setRedirect(true)}>
            <span style={{"height": "100%", "fontSize": "1.5em"}}>Back To Main View</span>
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
    </div>
  )
} 

export default LotsOverview