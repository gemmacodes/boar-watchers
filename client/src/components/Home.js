import './Home.css';
import React, { useEffect, useState } from "react";
// import MapView from './MapView.js'
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { stamenTerrain } from 'pigeon-maps/providers'


export default function Home() {
  const [sightings, setSightings] = useState([]);
  const [newSighting, setNewSighting] = useState({timestamp: "", latitude: 0, longitude: 0, adults: 0, piglets: 0, humanInteraction: 0, comments: ""})
  const [error, setError] = useState(null);
  const {timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = newSighting;

  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        // upon success, update tasks
        // console.log(json);
        setSightings(json);
        getGeolocation();
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


// GETTING GEOLOCATION DATA
  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successGettingLocation, errorGettingLocation, {timeout: 5000});
    } else {
      console.log("Geolocation not available.");
    }
  }

  function successGettingLocation(position) {
    // convert UNIX timestamp to SQL timestamp
    const date = new Date(position.timestamp);
          const hours = date.getHours(),
              minutes = date.getMinutes(),
              seconds = date.getSeconds(),
              month = date.getMonth() + 1,
              day = date.getDate(),
              year = date.getFullYear();

    function pad(date) {return (date < 10 ? "0" : "") + date;}
    const formattedDate = pad(year) + "-" + pad(month) + "-" + pad(day) + " " + pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

    setNewSighting(state => ({...state, timestamp: formattedDate, latitude: position.coords.latitude, longitude: position.coords.longitude}))
  }

  function errorGettingLocation(error) {
    switch (error.code) {
      case 1: setError("You've decided not to share your position, but it's OK. We won't ask you again.");
      break;
      case 2: setError("The network is down or the positioning service can't be reached.");
      break;
      case 3: setError("The attempt timed out before it could get the location data.");
      break;
      default: setError("Geolocation failed due to unknown error.");
      break;
    }
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
      console.log(err);
    }
  };


// TEMPLATE
  return (
    <div className="App">
      <header className="App-header">
      </header>

    <div className="container">
  {/* FORM */}
      <form className="form-control" onSubmit={handleSubmit}>

        <label className="form-control">Adults</label>
        <select name="adults" value={+adults} onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">More than 3</option>
        </select>

        <label className="form-control">Piglets</label>
        <select name="piglets" value={+piglets}  onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">More than 3</option>
        </select>

        <label className="form-control">Is there interaction with people?</label>
        <select name="piglets" value={humanInteraction}  onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
          <option value="0">NO</option>
          <option value="1">YES</option>
        </select>

        {/* Review after learning about checkboxes:
        <div className="form-check">
          <input name="humanInteraction" value={humanInteraction} onChange={handleChange} className="form-check-input" type="checkbox" id="flexCheckDefault"/>
          <label className="form-check-label" >
            Is it interacting with people?
          </label>
        </div> */}

        <label className="form-control">Other relevant information</label>
        <textarea name="comments" value={comments} onChange={handleChange} className="form-control" aria-label="textarea" placeholder="Any comments?"></textarea>
        
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>

{/* MAP RENDER */}

    <div className="container">
      <Map provider={stamenTerrain} height={300} defaultCenter={[41.4118, 2.1082]} defaultZoom={13}>
      {sightings.map(sighting => (<Marker width={30} key={sighting.id} anchor={[sighting.latitude, sighting.longitude]} color="red"/>))}
      <ZoomControl />
      </Map>
    </div>

    </div>
  );
}