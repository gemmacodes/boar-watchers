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
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
					<div className="container">
						<a className="mr-auto p-2 navbar-brand text-white" href="/">Boar Watchers</a>
						<span className="navbar-text p-2">Help the boars!</span>
					</div>
				</nav>

				<div>
					<h2 className="display-3 text-center mt-4 p-3">    
						Boar Watchers  
					</h2>
					
					<h5 className="text-center p-3"> Did you spot boars in an unusual place? Share it!</h5>
					 
					<div className="row justify-content-sm-center">
						<div className="col-sm text-center">
							<button type="button" className="btn btn-dark btn-lg btn-block shadow m-4"><Link to="/new" className="nav-item nav-link text-white p-2">New sighting</Link></button>
							<button type="button" className="btn btn-dark btn-lg btn-block shadow m-4"><Link to="/all" className="nav-item nav-link text-white p-2">All sightings</Link></button>
						</div>	
					</div>
					<div className="text-center mb-5"><img src="https://emojigraph.org/media/softbank/boar_1f417.png" width="60" alt="boar emoji"/></div>
				</div>
				<div>
						<SightingsMap sightings={allSightings} height={500}/> 
				</div>
				

			</div>
    )
}
