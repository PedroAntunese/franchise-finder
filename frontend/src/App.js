import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Home/Login/Login.jsx";
import Home from "./components/Home/Tela-Inicial/Home.jsx";
import EsqueciSenha from "./components/Home/Esqueci-Senha/Esqueci.jsx";
import Feed from "./components/Feed/Feed.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login-franqueador" element={<Login />}/>
                <Route path="/esqueci-senha" element={<EsqueciSenha />} />
                <Route path="/feed" element={<Feed />} />

            </Routes>
        </BrowserRouter>


    );
}

export default App;