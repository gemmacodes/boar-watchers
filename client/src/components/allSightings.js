import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SightingsTable from "./sightingsTable";
import SightingsMap from "./sightingsMap";
import Noty from 'noty';
import "../../node_modules/noty/lib/themes/semanticui.css";
import "../../node_modules/noty/lib/noty.css";


export default function AllSightings() {

  const [filteredSightings, setFilteredSightings] = useState("");
  const {timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = filteredSightings;
	const [timerange, setTimerange] = useState({month: "", year: ""});
	const { month, year } = timerange;

// SAVES ENTIRE DB (in filteredSightings) ON PAGE LOAD
  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        setFilteredSightings(json);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []); 
	
// GETS USER INPUTS INTO timerange OBJECT
	const handleChange = (e) => {
    const { value, name } = e.target;
    setTimerange(state => ({...state, [name]: value})) 
	}

// CALLS sortByMonthYear ON SUBMIT (Filter button)
	const submitTimerange = (e) => {
		e.preventDefault();
		sortByMonthYear(timerange);
	}

// UPDATES filteredSightings ACCORDING TO DEFINED TIMERANGE
  const sortByMonthYear = async timerange => {
		const { month, year } = timerange;
    try {
      const res = await fetch(`/sightings/timerange/${year}/${month}`, {
        method: "GET"
      });
      const data = await res.json();
      setFilteredSightings(data);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETES SIGHTING FROM DB ON delete BUTTON CLICK (AND RENDERS UPDATED DATABASE)
	const deleteEntry = async id => {
    try {
      const res = await fetch(`/sightings/${id}/`, {
        method: "DELETE"
      });
      const data = await res.json();
      setFilteredSightings(data);
      new Noty({
        theme: 'semanticui',
        type: 'success',
        layout: 'topRight',
        text: 'Sighting deleted correctly!',
        timeout: 2000
      }).show();
    } catch (err) {
      console.log(err);
      new Noty({
        theme: 'semanticui',
        type: 'error',
        layout: 'topRight',
        text: 'Ouch! Something went wrong. Try again!',
        timeout: 2000
      }).show();
    }
  };

  return (
    <div>
  {/* NAVBAR */}
      <div>
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container align-items-center">
            <Link to="/" className="nav-item nav-link text-white p-2">Home</Link> |{" "}
            <Link to="/new" className="nav-item nav-link text-white p-2">Report new sighting</Link> |{" "}
            <Link to="/all" className="nav-item nav-link text-white p-2">All sightings</Link>
          </div>
        </nav>
      </div>

  {/* USER INPUT FORM */}
      <div className="container my-4">
      <h2 className="mb-4">Control panel</h2>
      <h3>Sightings by month</h3>
      <p className="text-muted">If no month is selected, the map and table will show all time sightings.</p>
        <form className="form-inline">
          <div class="row">
            <div class="col col-sm">
              <select className="form-control" name="month" value={month}  onChange={handleChange}>
                <option value="" selected>Select month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select> 
            </div>

            <div class="col col-sm">
              <select className="form-control" name="year" value={year} onChange={handleChange}>
                <option value="" selected>Select year</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </select> 
            </div>
          
            <div className="col col-sm">
              <button className="btn btn-dark" onClick={(e)=>submitTimerange(e)}>Filter</button>
            </div>
            </div>
          </form> 
      </div>

  {/* MAP COMPONENT */}
      <div className="container mb-4">
        <SightingsMap sightings={filteredSightings} height={300} deleteEntry={deleteEntry}/> 
      </div>

  {/* TABLE COMPONENT */}
      <div className="container mb-4">
        <h3>Sighting details</h3>
        <SightingsTable sightings={filteredSightings} deleteEntry={deleteEntry}/>
      </div>

    </div>
  )
}


