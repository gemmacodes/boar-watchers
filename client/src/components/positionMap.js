import React from "react";
import { Map, Marker, Draggable, ZoomControl } from "pigeon-maps"
import { stamenTerrain } from 'pigeon-maps/providers'

export function PositionMap(latitude, longitude) {

  // const [anchor, setAnchor] = useState([latitude, longitude]);
  

  return (
    <div>
    <Map provider={stamenTerrain} height={300} defaultCenter={[latitude, longitude]} defaultZoom={18}>
    <Marker width={30} anchor={[latitude, longitude]} color="red"/>
    {/* <Draggable offset={[60, 87]} anchor={anchor} onDragEnd={handleChange}>
        <img src="pigeon.svg" width={100} height={95} alt="Pigeon!" />
      </Draggable> */}
    <ZoomControl />
    </Map>
  </div>
  )
}

export default PositionMap;