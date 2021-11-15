import MapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useState, useCallback, useEffect } from 'react'
import './map.css';

const MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN;

const geolocateStyle = {
  float: 'left',
  left: 10,
  top: 10,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  left: 10,
  top: 50,
  padding: '10px'
};

export default function Map ({getMarkerCoordinates}) {
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

  useEffect(() => {
    
      console.log(MAP_TOKEN);
    
  }, [])

  return (
    <div>
      <div className="mb-3"><h5><b>Drag the little boar</b> or click the <b>Geolocator button</b> to set a location</h5></div>

      <div className="shadow">
      <MapGL
        {...viewport}
        mapboxApiAccessToken={MAP_TOKEN}
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
    </div>
  )
}

