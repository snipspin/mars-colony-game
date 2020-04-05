import React from 'react'
import LotsCell from './LotsCell'
/*
props :
  worldSize
  worldLots
*/
const LotsOverview = (props) => {
  let world
  const renderWorld = () => {
    return props.worldLots.map((lot, i) => {
      if (lot == {}) {
        // it's an emptyCell
        return <LotsCell key={i} type="empty" />
      }
      else {
        // it's some sort of building
        return <LotsCell key={i} type={lot.type} />
      }
    })
  }
  return (
    <div>
      {
       renderWorld()
      }
    </div>
  )
} 

export default LotsOverview