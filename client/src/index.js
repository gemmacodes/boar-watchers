import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewEntry from "./components/newEntry";
import SightingsMap from "./components/sightingsMap";
import SightingsTable from "./components/sightingsTable"
import AllSightings from './components/allSightings';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/new" element={<NewEntry />}/>
        <Route path="/all" element={<AllSightings />}/>
        <Route path="/map" element={<SightingsMap />}/>
        <Route path="/table" element={<SightingsTable />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

