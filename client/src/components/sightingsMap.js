import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
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

  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        setAllSightings(json);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []); 


  return (
    <div className="container">
  {/* NAVBAR */}
    <div className="container mt-4">
        <nav
            style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
            textAlign: "right"
            }}
        >
            <Link to="/">Home</Link> |{" "}
            <Link to="/new">Add new sightings</Link>
        </nav>
      </div>

      <div style={{ margin: '0 auto'}}>
      <h3>All sightings</h3>

      <MapGL
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoic3dpdGNoZXJldHRlIiwiYSI6ImNrdnRibXZocDNib3Eyb3RrN3IweDJ5N2cifQ.WDHMD5bo0qcahirCdlT0-A"}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange = {nextViewport => setViewport(nextViewport)} // updates map render
       >
        {allSightings.map(sighting => (
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

      <div>
        <h3>Sighting details</h3>
        <Table className="table">
              <Thead>
                <Tr>
                  <Th scope="col">Date</Th>
                  <Th scope="col">Location</Th>
                  <Th scope="col">Adults</Th>
                  <Th scope="col">Piglets</Th>
                  <Th scope="col">Interacting</Th>
                  <Th scope="col">Comments</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allSightings.map(sighting => {
                  return (
                    <Tr>
                      <Td>{(sighting.timestamp).slice(0, 10)}</Td>
                      <Td><a href={`https://www.openstreetmap.org/#map=19/${sighting.latitude}/${sighting.longitude}`}>{`${sighting.latitude}, ${sighting.longitude}`}</a></Td>
                      <Td>{sighting.adults}</Td>
                      <Td>{sighting.piglets}</Td>
                      <Td>{sighting.humanInteraction}</Td>
                      <Td>{sighting.comments}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
      </div>

    </div>
  )
}


