import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewEntry from "./components/newEntry";
import SightingsMap from "./components/sightingsMap";


export default function App() {
    return (
        <div>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<index />}/>
            <Route path="/new" element={<NewEntry />}/>
            <Route path="/map" element={<SightingsMap />}/>
            </Routes>
        </BrowserRouter>
        </div>
    )
}
