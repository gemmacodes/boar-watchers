import React, { useState } from "react";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import MapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './map.css'; // custom marker (boar)


export default function SightingsMap({props}) {

  const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px'
  };
  
  const navStyle = {
    position: 'absolute',
    left: 10,
    top: 10,
    padding: '10px'
  };

  // set map base canvas
  const [viewport, setViewport ] = useState({
    width: "100%",
    height: 300,
    latitude: 41.414,
    longitude: 2.12533,
    zoom: 12
  })

  return (
    <div>

      {/* map component */}
      <MapGL
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoic3dpdGNoZXJldHRlIiwiYSI6ImNrdnRibXZocDNib3Eyb3RrN3IweDJ5N2cifQ.WDHMD5bo0qcahirCdlT0-A"}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange = {nextViewport => setViewport(nextViewport)} // updates map render
       >
        {/* map is populated with markers based on DB's stored coordinates */}
        {props && props.map(sighting => (
          <Marker
            longitude={sighting.longitude}
            latitude={sighting.latitude}
            offsetTop={-20}
            offsetLeft={-10}
            key={sighting.id}
            className="marker"
          >
          </Marker>
        ))}

        {/* react-map-gl component: gets geolocation data */}
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
         />

        {/* react-map-gl component: adds navigation controls to the map */}
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>

      </MapGL>

    </div>
  )
}


