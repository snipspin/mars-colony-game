import React, {useState} from 'react'
import LotsCell from './LotsCell'
import {Grid, Modal, makeStyles, ButtonBase, Button} from '@material-ui/core'
import {buildings as buildingsFromDef} from './buildingsDef'
/*
props :
  worldSize
  worldLots
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
  const handleOpen = (e, index) => {
    e.preventDefault()
    console.log(index)
    setNewBuildingIndex(index)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Button variant="outlined">Ice Miner</Button>
        </Grid>
        <Grid style={{"text-align":"center"}} item xs={12}>
          <Button variant="outlined">Farming Biosphere</Button>
        </Grid>
        <Grid style={{"text-align":"center"}} item xs={12}>
          <Button variant="outlined">Housing Unit</Button>
        </Grid>
      </Grid>
    </div>
  );

  const button = (
    <button type="button" onClick={handleOpen}>
    </button>
  )

  // const listOfBuildings = (
  //   buildingsFromDef.forEach(element => {
  //     return element.type
  //   })
  // )

  const buildOnLot = (lotID) => {
    // Show a list of buildings a player can build
    // let listOfBuildings
    // buildingsFromDef.forEach(element => {
    //   listOfBuildings += element.type + " " + lotID
    // });
    // return listOfBuildings + button
    // on cancel close Modal
    //return listOfBuildings
    return button
  }

  const renderWorld = () => {
    return props.worldLots.map((lot, i) => {
      if (lot.type === 'empty') {
        // it's an emptyCell
        return (
          <Grid style={{"border": "2px solid black", "height":"100%", "margin":"2px", "padding":"0", "borderRadius": "10px"}} item xs={3}>
            <ButtonBase key={i} style={{"display":"flex", "justify":"center", "width":"100%", "height":"100%", "text-align":"center"}} focusRipple onClick={(e) => handleOpen(e,i)}>
              <LotsCell key={i} type="empty" extra={buildOnLot(lot.lot)} />
            </ButtonBase>
          </Grid>
         )
      }
      else {
        // it's some sort of building
        return (
          <Grid style={{"border": "2px solid black", "margin": "2px", "padding": "0", "borderRadius": "10px"}} item xs={3}>
            <LotsCell key={i} type={lot.type} extra="" />
          </Grid>
        )
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
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
} 

export default LotsOverview