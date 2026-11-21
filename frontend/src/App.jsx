import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadastroFranquia from "./pages/CadastroFranquia";
import Franquia from "./pages/Franquia";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro-franquia" element={<CadastroFranquia />} />
        <Route path="/franquia" element={<Franquia />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
