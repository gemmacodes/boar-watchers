import MapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useState, useCallback } from 'react'
import './map.css';

const geolocateStyle = {
  float: 'right',
  margin: '50px',
  padding: '10px'
};

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: '10px'
};

const Map = ({getMarkerCoordinates}) => {
  // set map base canvas
  const [viewport, setViewport ] = useState({
    width: "fit",
    height: 300,
    latitude: 41.414,
    longitude: 2.12533,
    zoom: 12
  })

  const [marker, setMarker] = useState({
    latitude: 41.414,
    longitude: 2.12533
  });

  // these  const & 3 functions make the marker draggable. Taken from react-map-gl documentation examples. 
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
    // marker coordinates are sent to parent node (newEntry)
    getMarkerCoordinates(event.lngLat[1], event.lngLat[0]);
  }, []);

  // updates marker position after dragging (takes event coordinates) 
  const MarkerOnGeolocate = (event) => {
    console.log(event)
    setMarker({
      longitude: event.coords.longitude,
      latitude: event.coords.latitude
    });
    // marker coordinates are sent to parent node (newEntry)
    getMarkerCoordinates(event.coords.latitude, event.coords.longitude);
  };

  

  return (
    <div>
      <p className="text-primary">Drag the little boar to or click on the Geolocator button to set it on your location</p>

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
          className="marker"
        >
        </Marker>

        <GeolocateControl
          style = {geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          onGeolocate={MarkerOnGeolocate}
         />

        <div className="nav" style = {navStyle}>
          <NavigationControl />
        </div>

      </MapGL>
    </div>
  )
}

export default Map

