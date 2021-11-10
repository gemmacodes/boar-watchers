import React, { useState } from "react";
import { Map, Marker, Draggable, ZoomControl } from "pigeon-maps"
import { stamenTerrain } from 'pigeon-maps/providers'

export function PositionMap(latitude, longitude) {

  // const [anchor, setAnchor] = useState([50.879, 4.6997]);
  // const [currentPosition, setCurrentPosition] = useState([latitude, longitude]);
  

  return (
    <div>
    <Map provider={stamenTerrain} height={300} defaultCenter={[latitude, longitude]} defaultZoom={18}>
    <Marker width={30} anchor={[latitude, longitude]} color="red"/>
    <ZoomControl />
    </Map>
  </div>
  )
}

export default PositionMap;