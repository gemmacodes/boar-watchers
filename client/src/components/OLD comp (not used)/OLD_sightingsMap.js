import React, { useState, useEffect } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { stamenTerrain } from 'pigeon-maps/providers'
import { Link } from "react-router-dom";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export function SightingsMap() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        // upon success, update tasks
        setSightings(json);
      })
      .catch(error => {
        // upon failure, show error message
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

      <div className="d-flex flex-column justify-content-between my-4">
        <h3>All sightings</h3>
        <Map provider={stamenTerrain} height={500} defaultCenter={[41.4118, 2.1082]} defaultZoom={13}>
        {sightings.map(sighting => (<Marker width={30} key={sighting.id} anchor={[sighting.latitude, sighting.longitude]} color="red"/>))}
        <ZoomControl />
        </Map>
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
                {sightings.map(sighting => {
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

export default SightingsMap;


