import React, {useState} from 'react'
import LotsCell from './LotsCell'
import {Modal, makeStyles} from '@material-ui/core'
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
  const handleOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  const button = (
    <button type="button" onClick={handleOpen}>
        Open Modal
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
        return <LotsCell key={i} type="empty" extra={buildOnLot(lot.lot)} />
      }
      else {
        // it's some sort of building
        return <LotsCell key={i} type={lot.type} extra="" />
      }
    })
  }
  return (
    <div>
      {
       renderWorld()
      }
      {button}
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