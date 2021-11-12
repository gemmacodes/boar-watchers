import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SightingsMap from "./components/sightingsMap";


export default function App() {

  const [allSightings, setAllSightings] = useState("");

	// SAVES ENTIRE DB (in allSightings) ON PAGE LOAD
	useEffect(() => {
		fetch("/sightings")
			.then(res => res.json())
			.then(json => {
				setAllSightings(json);
			})
			.catch(error => {
				console.log(error.message);
			});
	}, []); 


    return (
			<div className="App">
				<header className="App-header"></header>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="container">
							<a className="mr-auto p-2 navbar-brand text-white" href="/">Boar Watchers</a>
							<span className="navbar-text p-2">Help the boars!</span>
					</div>
				</nav>
				<div>
					<h2 className="display-3 text-center p-3">Boar Watchers</h2>
					<div className="d-flex flex-row justify-content-center">
						<div className="d-flex justify-content-center flex-wrap">
						<button type="button" class="btn btn-dark btn-lg btn-block m-4"><Link to="/new" className="nav-item nav-link text-white p-2">Report new sighting</Link></button>
						</div>
						<div className="d-flex justify-content-center flex-wrap">
							<button type="button" class="btn btn-dark btn-lg btn-block m-4">	<Link to="/all" className="nav-item nav-link text-white p-2">All sightings</Link></button>
						</div>	
					</div>
				</div>
				<div>
						<SightingsMap props={allSightings}/> 
				</div>
				
			</div>
    )
}
