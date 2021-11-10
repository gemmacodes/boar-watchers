import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewEntry from "./components/newEntry";
import SightingsMap from "./components/sightingsMap";
import Map from "./components/reactMapGL"
import SearchableMap from "./components/reactMapGLsearch"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/new" element={<NewEntry />}/>
        <Route path="/map" element={<SightingsMap />}/>
        <Route path="/GLmap" element={<Map />}/>
        <Route path="/searchGLmap" element={<SearchableMap />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

