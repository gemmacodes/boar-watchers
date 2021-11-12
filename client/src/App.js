import React from 'react';
import { Link } from "react-router-dom";
import SightingsMap from "./components/sightingsMap";


export default function App() {
    return (
        <div >
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="mr-auto p-2 navbar-brand text-white" href="/">Boar Watchers</a>
                    <Link to="/new" className="nav-item nav-link text-white p-2">Report new sighting</Link>
                    <Link to="/all" className="nav-item nav-link text-white p-2">See all sightings</Link>
                    <span className="navbar-text p-2">Help the boars!</span>
                </div>
            </nav>
            <div className="mt-10">
                <SightingsMap /> 
            </div>
        </div>
    )
}
