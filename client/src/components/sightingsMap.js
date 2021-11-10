import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { stamenTerrain } from 'pigeon-maps/providers'

export function SightingsMap(pointers) {
  return (
    <div className="container">
    <Map provider={stamenTerrain} height={300} defaultCenter={[41.4118, 2.1082]} defaultZoom={13}>
    {pointers.map(pointer => (<Marker width={30} key={pointer.id} anchor={[pointer.latitude, pointer.longitude]} color="red"/>))}
    <ZoomControl />
    </Map>
    {/* <Map provider={stamenTerrain} height={300} defaultCenter={[41.4118, 2.1082]} defaultZoom={13}>
    {sightings.map(sighting => (<Marker width={30} key={sighting.id} anchor={[sighting.latitude, sighting.longitude]} color="red"/>))}
    <ZoomControl />
    </Map> */}
  </div>
  )
}

export default SightingsMap;


