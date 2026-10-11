import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inicio" element={<Inicio />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}