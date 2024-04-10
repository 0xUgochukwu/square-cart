/* eslint-disable no-unused-vars */
import * as React from "react";
import "./App.css";

import Extention from "./pages/Extention";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/social/:type/:id" element={<Extention />} />
        </Routes>
    );
}

export default App;
