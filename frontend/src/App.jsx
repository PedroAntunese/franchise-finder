import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/inicio" element={<Inicio />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

//https://localhost:3000/login     --  TELA DE LOGIN
//https://localhost:3000/cadastro  --  TELA DE CADASTRO