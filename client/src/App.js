import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

export default function App() {
    return (
        <div>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
        </div>
    )
}
