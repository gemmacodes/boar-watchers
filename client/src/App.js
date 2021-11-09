import './App.css';
import React, { useEffect, useState } from "react";
// import MapView from './components/MapView.js'

export default function App() {
  const [sightings, setSightings] = useState([]);
  const [newSighting, setNewSighting] = useState({timestamp: "", latitude: 0, longitude: 0, adults: 0, piglets: 0, humanInteraction: 0, comments: ""})
  const {timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = newSighting;

  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        // THEN SET STATE
        // upon success, update tasks
        // console.log(json);
        setSightings(json);
      })
      .catch(error => {
        // upon failure, show error message
        console.log(error.message);
      });
  }, []); 

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewSighting(state => ({...state, [name]: value})) 
  }

  const getGeolocation = () => {
    // Get geolocation data
    console.log("Am I here?");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // turn UNIX timestamp to SQL timestamp
          const date = new Date(position.timestamp);
          const hours = date.getHours(),
              minutes = date.getMinutes(),
              seconds = date.getSeconds(),
              month = date.getMonth() + 1,
              day = date.getDate(),
              year = date.getFullYear();

          function pad(date) {return (date < 10 ? "0" : "") + date;}

          const formattedDate = 
                pad(year) + "-" 
              + pad(month) + "-" 
              + pad(day) + " " 
              + pad(hours) + ":"
              + pad(minutes) + ":"
              + pad(seconds);

            setNewSighting(state => ({...state, timestamp: formattedDate, latitude: latitude, longitude: longitude}))
        })
    } else {
      console.log("Geolocation not available. Please allow geolocation in your browser");
    }
  }

  // const getTimestamp = () => {
  //   // Get timestamp
  //   setNewSighting(state => ({...state, [timestamp]: +new Date()})) 
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    getGeolocation(); // gets latitude, longitude & timestamp (so sewSighting is a complete object)

    addSighting(newSighting); // pushes newSighting to DB

  }

  const addSighting = async (e) => {
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


  return (
    <div className="App">
      <header className="App-header">
      </header>

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

        <div className="form-check">
          <input name="humanInteraction" value={humanInteraction} onChange={handleChange} className="form-check-input" type="checkbox" id="flexCheckDefault"/>
          <label className="form-check-label" >
            Is it interacting with people?
          </label>
        </div>

        <label className="form-control">Comments</label>
        <textarea name="comments" value={comments} onChange={handleChange} className="form-control" aria-label="textarea" placeholder="Any comments?"></textarea>
        
        <button className="btn btn-primary">Submit</button>
      </form>

{/* MAP RENDER */}

      {/* <div>
        <MapView />
      </div> */}

    </div>
  );
}