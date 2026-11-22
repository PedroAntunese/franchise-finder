import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Entrada / autenticação (Matheus)
import Home from "./components/Home/Tela-Inicial/Home.jsx";
import Login from "./components/Home/Login/Login.jsx";
import EsqueciSenha from "./components/Home/Esqueci-Senha/Esqueci.jsx";

// Pós-login (Barbara)
import Feed from "./pages/Feed.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login-franqueador" element={<Login />} />
                <Route path="/esqueci-senha" element={<EsqueciSenha />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;