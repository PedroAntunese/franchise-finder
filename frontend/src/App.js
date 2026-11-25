import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { obterToken } from "./services/api";

// Entrada (Matheus)
import Home from "./components/Home/Tela-Inicial/Home.jsx";
import EsqueciSenha from "./components/Home/Esqueci-Senha/Esqueci.jsx";

// Entrar e Criar conta de todos os perfis (branch feature/telas-login-cadastro).
// O perfil vem na URL: /login?perfil=franqueador, /cadastro?perfil=investidor...
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";

// Pós-login (Barbara)
import Feed from "./pages/Feed.jsx";
import EmConstrucao from "./pages/EmConstrucao.jsx";

// Telas internas só abrem com sessão. Esconder a tela não protege os dados:
// a checagem de verdade acontece no servidor, que exige o token nas rotas protegidas.
function Protegida({ children }) {
    if (!obterToken()) return <Navigate to="/login" replace />;
    return children;
}

// Links que já aparecem nas telas, mas cujas páginas ainda não existem.
const INTERNAS_EM_CONSTRUCAO = ["/rede", "/franquia", "/franquias", "/mensagens", "/avisos", "/perfil"];
const PUBLICAS_EM_CONSTRUCAO = ["/sobre", "/ajuda", "/privacidade"];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                {/* Endereço antigo do login, mantido para links e favoritos que ainda apontem para ele. */}
                <Route path="/login-franqueador" element={<Navigate to="/login?perfil=franqueador" replace />} />
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
