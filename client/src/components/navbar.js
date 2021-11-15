import React from 'react';
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		// <div>
		// 	<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
		// 		<div className="container justify-content-start"> 
		// 			<a className="mr-auto p-2 navbar-brand text-white" href="/">Boar Watchers</a>
		// 			<NavLink to="/new" className="nav-item nav-link text-white p-2">Report new sighting</NavLink> |{" "}
		// 			<NavLink to="/all" className="nav-item nav-link text-white p-2">All sightings</NavLink>
		// 			<a className="nav-item nav-link p-2 text-white" href="https://github.com/switcherette/boar-watchers">Project documentation</a>
		// 		</div>
		// 	</nav>
		// </div>
	<div>
	
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow justify-content-between">
			<div className="container">
				<a className="navbar-brand" href="/"><b>Boar Watchers</b></a>
				<NavLink to="/new" className="nav-item nav-link text-white p-2">New sighting</NavLink>
				<NavLink to="/all" className="nav-item nav-link text-white p-2">All sightings</NavLink>
			<div>
				<a className="nav-item nav-link p-2 text-white" href="https://github.com/switcherette/boar-watchers" target="_blank" rel="noreferrer"><img src="https://cdn-icons.flaticon.com/png/512/3488/premium/3488435.png?token=exp=1636986814~hmac=e93595cbfb46a15218cf790f31bdd332" width="40" alt="github icon"/></a>
				
  		</div>
			</div>
		</nav>

	</div>
	
	)
}
