import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SightingsTable from "./sightingsTable";
import SightingsMap from "./sightingsMap";


export default function AllSightings() {

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
        <SightingsMap /> 
      </div>
      <div>
        <h3>Sighting details</h3>
        <SightingsTable />
      </div>

    </div>
  )
}


