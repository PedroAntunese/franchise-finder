import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login/Login.jsx";
import Home from "./Components/Home/Home.jsx";

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