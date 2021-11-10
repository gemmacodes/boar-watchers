import React, { useEffect, useState } from "react";
import Map from "./reactMapGL"
import { usePosition } from './usePosition';
import FormatTimestamp from "./formatTimestamp";
import { Link } from "react-router-dom";



export default function NewEntry() {
  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState(null);
  const {lat, long} = usePosition();
  
  const [newSighting, setNewSighting] = useState({timestamp: FormatTimestamp(new Date()), latitude: 0, longitude: 0, adults: 0, piglets: 0, humanInteraction: 0, comments: " "})
  
  const {timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = newSighting;
  
  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        // upon success, update tasks
        setSightings(json);
        // getGeolocation();
      })
      .catch(error => {
        // upon failure, show error message
        console.log(error.message);
      });
  }, []); 


// GETTING USER INPUTS INTO newSighting OBJECT
  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewSighting(state => ({...state, [name]: value})) 
  }

// COMPLETES newSighting OBJECT AND CALLS addSighting
  const handleSubmit = (e) => {
    e.preventDefault();
    addSighting(newSighting); // pushes newSighting to DB
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
      setSightings(data);
    } catch (err) {
      setError(err);
    }
  };


// TEMPLATE
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
  
  {/* MAP RENDER */}
        <div>
          {(lat && long) ? <Map /> : "Loading map..."}
        </div>

  {/* FORM */}
  <code>
      latitude: {lat}<br/>
      longitude: {long}<br/>
  </code>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div class="flex-col">
              <input className="form-control" name="latitude" value={latitude} type="number" onChange={handleChange}/>
            </div>
            <div class="flex-col">
              <input className="form-control" name="longitude" value={longitude} type="number" onChange={handleChange}/> 
            </div>
          </div>
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

          {/* Review after learning about checkboxes:
          <div className="form-check">
            <label className="form-check-label" >
              Is it interacting with people?
            <input name="humanInteraction" value={humanInteraction} onChange={handleChange} className="form-check-input" type="checkbox" id="flexCheckDefault"/>
            <label className="form-check-label" >
              Is it interacting with people?
            </label>
          </div> */}

          <div className="form-group">
            <label className="form-control" for="comments">Other relevant information
              <textarea name="comments" value={comments} onChange={handleChange} className="form-control" aria-label="textarea" placeholder="Any comments?"></textarea>
            </label>
          </div>

          <button className="btn btn-primary" disabled={(timestamp === "")}>Submit</button>
        </form>
        
        <div>{error && error}</div>

    </div>
  </div>
  </div>
  );
}