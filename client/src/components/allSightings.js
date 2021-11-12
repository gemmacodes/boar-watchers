import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SightingsTable from "./sightingsTable";
import SightingsMap from "./sightingsMap";


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
        console.log("working?", json);
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

  {/* USER INPUT FORM */}
      <div>
        <form>
          <label className="form-control">Select month
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
          </label>
          <label className="form-control">Select year
            <select className="form-control" name="year" value={year} onChange={handleChange}>
              <option value="" selected>Select year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select> 
          </label>
          <button className="btn btn-primary" onClick={(e)=>submitTimerange(e)}>Filter</button>
        </form> 
      </div>

  {/* MAP COMPONENT */}
      <div style={{ margin: '0 auto'}}>
        <h3>All sightings</h3>
        <SightingsMap test={filteredSightings}/> 
      </div>

  {/* TABLE COMPONENT */}
      <div>
        <h3>Sighting details</h3>
        <SightingsTable test={filteredSightings}/>
      </div>

    </div>
  )
}


