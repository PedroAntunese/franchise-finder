import { useState } from "react";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    function handleLogin(e) {
        console.log("Email: " + email,
                    "Senha: " + senha)
    

        e.preventDefault();

        setErro("");
        setSucesso("");

        if(email.trim() === "" || senha === "") {
            setErro("Preencha todos os campos!")
            return;
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailValido.test(email.trim())) {
            setErro("Digite um email válido!")
            return;
        }

        setSucesso("Dados preenchidos corretamente!");

        console.log("Email:", email.trim());

    }
    return (

        <div className="login">

            <section className="login-form">
                <div className="login-form-interno">
                    
                    <div className="titulo">
                        <h1>Bem-vindo de volta!</h1>
                    </div>
                    
                    <input
                     className="form" 
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)} 
                     placeholder="Digite seu email" 
                     type="email"/>

                    <input 
                    className="form" 
                    value={senha} onChange={(e) => 
                    setSenha(e.target.value)} 
                    placeholder="Digite sua senha" 
                    type="password"/>


                    <a className="esqueceu-senha" href="#">Esqueceu a senha?</a>

                    <button 
                    className="btn-login" 
                    type="button"
                    onClick={handleLogin}>Login</button>

                    {erro && <p className="mensagem-erro">{erro}</p>}
                    {sucesso && <p className="mensagem-sucesso">{sucesso}</p>}

                    <p>Não tem uma conta? <a href="#">Cadastre-se agora</a></p>
                </div>
            </section>

            <aside className="painel">
                <p>Rumo</p>
            </aside>
        </div>
        
       
    )
}

export default Login;