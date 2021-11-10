import React from 'react';
import { Link } from "react-router-dom";


export default function App() {
    return (
        <div>
            <div>
                <h3>Boar Watchers</h3>
                <nav
                    style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem"
                    }}
                >
                    <Link to="/new">Report new sighting</Link> |{" "}
                    <Link to="/map">See all sightings</Link>
                </nav>
            </div>
        </div>
    )
}
