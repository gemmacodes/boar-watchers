import React, { useState, useEffect } from "react";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import MapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './map.css';


export default function SightingsMap() {

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

  const [allSightings, setAllSightings] = useState([]);
  const [filteredSightings, setFilteredSightings] = useState([]);

  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        setAllSightings(json);
        setFilteredSightings(json);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []); 

  return (
    <div className="container">
      <div style={{ margin: '0 auto'}}>

      <MapGL
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoic3dpdGNoZXJldHRlIiwiYSI6ImNrdnRibXZocDNib3Eyb3RrN3IweDJ5N2cifQ.WDHMD5bo0qcahirCdlT0-A"}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange = {nextViewport => setViewport(nextViewport)} // updates map render
       >
        {filteredSightings.map(sighting => (
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

        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
         />

        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>

      </MapGL>
      </div>

    </div>
  )
}


