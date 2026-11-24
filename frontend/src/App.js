import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { obterToken } from "./services/api";

// Entrada / autenticação (Matheus)
import Home from "./components/Home/Tela-Inicial/Home.jsx";
import Login from "./components/Home/Login/Login.jsx";
import EsqueciSenha from "./components/Home/Esqueci-Senha/Esqueci.jsx";

// Pós-login (Barbara)
import Feed from "./pages/Feed.jsx";
import EmConstrucao from "./pages/EmConstrucao.jsx";

// Telas internas só abrem com sessão. Esconder a tela não protege os dados:
// a checagem de verdade acontece no servidor, que exige o token nas rotas protegidas.
function Protegida({ children }) {
    if (!obterToken()) return <Navigate to="/login-franqueador" replace />;
    return children;
}

// Links que já aparecem nas telas, mas cujas páginas ainda não existem.
const INTERNAS_EM_CONSTRUCAO = ["/rede", "/franquia", "/franquias", "/mensagens", "/avisos", "/perfil"];
const PUBLICAS_EM_CONSTRUCAO = ["/cadastro", "/sobre", "/ajuda", "/privacidade"];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login-franqueador" element={<Login />} />
                <Route path="/esqueci-senha" element={<EsqueciSenha />} />
                <Route path="/feed" element={<Protegida><Feed /></Protegida>} />

                {INTERNAS_EM_CONSTRUCAO.map(rota => (
                    <Route key={rota} path={rota} element={<Protegida><EmConstrucao /></Protegida>} />
                ))}
                {PUBLICAS_EM_CONSTRUCAO.map(rota => (
                    <Route key={rota} path={rota} element={<EmConstrucao />} />
                ))}

                <Route path="*" element={
                    <EmConstrucao titulo="Página não encontrada" texto="O endereço digitado não existe." />
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
