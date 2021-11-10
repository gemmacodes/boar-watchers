
// import ReactMapGL from 'react-map-gl';
import React, { useState } from 'react'
import MapGL, {GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const Map = () => {

  const [viewport, setViewport ] = useState({
    width: "100%",
    height: 300,
    latitude: 0,
    longitude: 0,
    zoom: 10
  })

  return (
    <div style={{ margin: '0 auto'}}>
      <h3 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>GeoLocator: Click the Geolocator to Find Your Location</h3>

      <MapGL
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoic3dpdGNoZXJldHRlIiwiYSI6ImNrdnRibXZocDNib3Eyb3RrN3IweDJ5N2cifQ.WDHMD5bo0qcahirCdlT0-A"}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange = {nextViewport => setViewport(nextViewport)}
       >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
         />
      </MapGL>

      {MapGL.latitude}
    </div>
  )
}

export default Map


// function Map() {
//   const [viewport, setViewport] = useState({
//     width: 400,
//     height: 400,
//     latitude: 37.7577,
//     longitude: -122.4376,
//     zoom: 8
//   });

//   return (
//     <ReactMapGL
//       {...viewport}
//       onViewportChange={nextViewport => setViewport(nextViewport)}
//     />
//   );
// }