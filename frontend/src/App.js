import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login-franqueador"
                    element={<Login />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;