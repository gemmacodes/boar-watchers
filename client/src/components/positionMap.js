import React, { useState } from "react";
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps"
import { stamenTerrain } from 'pigeon-maps/providers'

export function PositionMap(latitude, longitude) {

  return (
    <div>
    <Map provider={stamenTerrain} height={300} defaultCenter={[latitude, longitude]} defaultZoom={18}>
    <Marker width={30} anchor={[latitude, longitude]} color="red"/>
    <Overlay anchor={[latitude, longitude]} offset={[120, 79]}>
        <img src='https://emojigraph.org/media/softbank/boar_1f417.png' width={100} alt='' />
      </Overlay>
    <ZoomControl />
    </Map>
  </div>
  )
}

export default PositionMap;