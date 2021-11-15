import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
				<div className="container">
					<Link to="/" className="nav-item nav-link text-white p-2">Home</Link> |{" "}
					<Link to="/new" className="nav-item nav-link text-white p-2">Report new sighting</Link> |{" "}
					<Link to="/all" className="nav-item nav-link text-white p-2">All sightings</Link>
				</div>
			</nav>
		</div>
	)
}
