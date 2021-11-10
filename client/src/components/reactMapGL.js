import MapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useState, useCallback } from 'react'
import Pin from './pin';

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const Map = () => {
  // set map base canvas
  const [viewport, setViewport ] = useState({
    width: "100%",
    height: 300,
    latitude: 41.414,
    longitude: 2.12533,
    zoom: 12
  })

  const [marker, setMarker] = useState({
    latitude: 41.414,
    longitude: 2.12533
  });

  // these 3 functions make the marker draggable. Taken from react-map-gl documentation examples. 
  const [events, logEvents] = useState({});
  
  const onMarkerDragStart = useCallback(event => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback(event => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));
  }, []);

  const onMarkerDragEnd = useCallback(event => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });
  }, []);

  // updates marker position after dragging (takes event coordinates)
  const updateMarker = (event) => {
    console.log(event)
    setMarker({
      longitude: event.coords.longitude,
      latitude: event.coords.latitude
    });
    
  };


  return (
    <div style={{ margin: '0 auto'}}>
      <p className="text-primary">Drag the red marker or click the Geolocator button to find your location</p>

      <MapGL
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoic3dpdGNoZXJldHRlIiwiYSI6ImNrdnRibXZocDNib3Eyb3RrN3IweDJ5N2cifQ.WDHMD5bo0qcahirCdlT0-A"}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange = {nextViewport => setViewport(nextViewport)} // updates map render
       >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          onGeolocate={updateMarker}
         />

        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>

      </MapGL>
    </div>
  )
}

export default Map

