import React, { useEffect, useState } from "react";
import Map from "./newEntryMap"
import FormatTimestamp from "./formatTimestamp";
import { Link } from "react-router-dom";


export default function NewEntry() {
  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState(null);
  
  const [newSighting, setNewSighting] = useState({timestamp: FormatTimestamp(new Date()), latitude: 0, longitude: 0, adults: 0, piglets: 0, humanInteraction: 0, comments: " "})
  const {timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = newSighting;
  
// LOADS DB INFO INTO sightings ARRAY
  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        setSightings(json);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []); 


// GETS USER INPUTS INTO newSighting OBJECT
  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewSighting(state => ({...state, [name]: value})) 
  }

// GETS GEOLOC INPUTS INTO newSighting OBJECT
  const handleCoordinates = (lat, long) => {
    setNewSighting(state => ({...state, latitude: lat, longitude: long})) 
  }

// COMPLETES newSighting OBJECT AND CALLS addSighting
  const handleSubmit = (e) => {
    e.preventDefault();
    addSighting(newSighting); // function that 'pushes' newSighting to DB
  }

// ADDS SIGHTING INFO TO DB
  const addSighting = async () => {
    try {
      const res = await fetch("/sightings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSighting),
      });
      const data = await res.json();
      setSightings(data); // sightings array gets updated as well (so I do not need to reload page)
    } catch (err) {
      setError(err);
    }
  };

// HTML TEMPLATE
  return (
    <div className="App">
      <header className="App-header">
      </header>

{/* NAVBAR */}
    <div className="container">
      <div className="container mt-4">
          <nav
              style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
              textAlign: "right"
              }}
          >
              <Link to="/">Home</Link> |{" "}
              <Link to="/map">See all sightings</Link>
          </nav>
      </div>
  
      <div className="d-flex flex-column justify-content-between mt-4">

        <h3>New sighting</h3>
  
  {/* MAP RENDER: Map only loads when latitude & longitude are available */}
        <div>
          <Map getMarkerCoordinates={(lat, long)=> handleCoordinates(lat, long)}/>
        </div>

  {/* USER INPUT FORM */}
  <p className="text-muted">
      Latitude: {latitude} | Longitude: {longitude}<br/>
  </p>
        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <div className="flex-col">
              <input className="form-control" name="latitude" value={latitude} type="number" onChange={handleChange}/>
            </div>
            <div className="flex-col">
              <input className="form-control" name="longitude" value={longitude} type="number" onChange={handleChange}/> 
            </div>
          </div> */}
          <div className="form-group">
            <label className="form-control" for="adults">How many adults?
              <input name="adults" value={+adults} type="number" onChange={handleChange} className="form-control"/>
            </label>
          </div>

          <div className="form-group">
            <label className="form-control" for="piglets">How many piglets?
              <input name="piglets" value={+piglets} type="number" onChange={handleChange} className="form-control"/>
            </label>
          </div>

          <div className="form-group">
            <label className="form-control" for="humanInteraction">Are they interacting with people?
              <select name="humanInteraction" value={humanInteraction}  onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                <option value="0">NO</option>
                <option value="1">YES</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label className="form-control" for="comments">Other relevant information
              <textarea name="comments" value={comments} onChange={handleChange} className="form-control" aria-label="textarea" placeholder="Any comments?"></textarea>
            </label>
          </div>

          <button className="btn btn-primary" disabled={(timestamp === "")}>Submit</button>
        </form>

        {/* if there is an error, show it here*/}
        <div>{error && error}</div>

    </div>
  </div>
  </div>
  );
}