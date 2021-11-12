import React, { useEffect, useState } from "react";
import Map from "./newEntryMap"
import FormatTimestamp from "./formatTimestamp";
import { Link } from "react-router-dom";
import Noty from 'noty';
import './map.css';
import "../../node_modules/noty/lib/themes/semanticui.css";
import "../../node_modules/noty/lib/noty.css";


export default function NewEntry() {
  const [sightings, setSightings] = useState([]); 
  const [error, setError] = useState(null);
  const [newSighting, setNewSighting] = useState({timestamp: FormatTimestamp(new Date()), latitude: 41.414, longitude: 2.12533, adults: 0, piglets: 0, humanInteraction: 0, comments: " "})
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
    setNewSighting(state => ({...state, adults: 0, piglets: 0, humanInteraction: 0, comments: " "})) 
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
      new Noty({
        theme: 'semanticui',
        type: 'success',
        layout: 'topRight',
        text: 'Your sighting has been added correctly!',
        timeout: 2000
      }).show();

    } catch (err) {
      setError(err);
      new Noty({
        theme: 'semanticui',
        type: 'error',
        layout: 'topRight',
        text: 'Ouch! Something went wrong. Try again!',
        timeout: 2000
      }).show();
    }
  };

// HTML TEMPLATE
  return (
    <div>
  
      <div>
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="nav-item nav-link text-white p-2">Home</Link> |{" "}
            <Link to="/new" className="nav-item nav-link text-white p-2">Report new sighting</Link> |{" "}
            <Link to="/all" className="nav-item nav-link text-white p-2">All sightings</Link>
          </div>
        </nav>
      </div>

    <div className="container mt-4">
        <h3 className="display-4 mb-5">New sighting</h3>

        <div className="row d-flex">
    {/* USER INPUT FORM */} 
          <div className="col-sm">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label for="adults">How many adults?</label>
                <input name="adults" value={+adults} type="number" min="0" onChange={handleChange} className="form-control"/>
              </div>

              <div className="form-group mb-3">
                <label for="piglets">How many piglets?</label>
                <input name="piglets" value={+piglets} type="number" min="0" onChange={handleChange} className="form-control"/>
              </div>

              <div className="form-group mb-3">
                <label for="humanInteraction">Are they interacting with people?</label>
                  <select name="humanInteraction" value={humanInteraction}  onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">NO</option>
                    <option value="1">YES</option>
                  </select>
              </div>

              <div className="form-group mb-3">
                <label for="comments">Is there any other relevant information?</label>
                  <textarea name="comments" value={comments} onChange={handleChange} className="form-control" aria-label="textarea" placeholder="Any comments?"></textarea>
              </div>

              <button className="btn btn-dark mb-3 my-2" disabled={(latitude === 0)}>Submit</button>
            </form>
          </div>

        {/* MAP RENDER: Map only loads when latitude & longitude are available */}
          <div className="col-sm">
            <Map getMarkerCoordinates={(lat, long)=> handleCoordinates(lat, long)}/>
            <p className="text-muted">Latitude: {latitude} <br/> Longitude: {longitude}</p>
          </div>
        </div>
      </div>

      <div className="row d-flex mt-5">
      <div className="text-center mt-5">
        <img src="https://emojigraph.org/media/softbank/boar_1f417.png" width="60"/>
        <img src="https://emojigraph.org/media/softbank/boar_1f417.png" width="60"/>
        <img src="https://emojigraph.org/media/softbank/boar_1f417.png" width="60"/>
      </div>
      </div>

  </div>
  );
}