import React from 'react';
import { Link } from "react-router-dom";
import SightingsMap from "./components/sightingsMap";


export default function App() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a class="navbar-brand text-white" href="/">Boar Watchers</a>
                    <Link to="/new" className="nav-item nav-link text-white">Report new sighting</Link>
                    <Link to="/all" className="nav-item nav-link text-white">See all sightings</Link>
                    <span class="navbar-text">Help the boars!</span>
                </div>
            </nav>
            <div className="mt-10">
                <SightingsMap /> 
            </div>
        </div>
    )
}
