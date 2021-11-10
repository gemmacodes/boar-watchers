import React, { useState, useEffect } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { stamenTerrain } from 'pigeon-maps/providers'
import { Link } from "react-router-dom";

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

      <div className="d-flex flex-column justify-content-between mt-4">
        <h3>All sightings</h3>
        <Map provider={stamenTerrain} height={500} defaultCenter={[41.4118, 2.1082]} defaultZoom={13}>
        {sightings.map(sighting => (<Marker width={30} key={sighting.id} anchor={[sighting.latitude, sighting.longitude]} color="red"/>))}
        <ZoomControl />
        </Map>
      </div>

      <div>
        <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Location</th>
                  <th scope="col">Adults</th>
                  <th scope="col">Piglets</th>
                  <th scope="col">Interacting</th>
                </tr>
              </thead>
              <tbody>
                {sightings.map(sighting => {
                  return (
                    <tr>
                      <td>{(sighting.timestamp).slice(0, 10)}</td>
                      <td><a href={`https://www.openstreetmap.org/#map=19/${sighting.latitude}/${sighting.longitude}`}>{`${sighting.latitude}, ${sighting.longitude}`}</a></td>
                      <td>{sighting.adults}</td>
                      <td>{sighting.piglets}</td>
                      <td>{sighting.humanInteraction}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
      </div>
    </div>
  )
}

export default SightingsMap;


