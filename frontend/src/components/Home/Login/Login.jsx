import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/img-ff-tela1.png";
import logoMarca from "../../Assets/logo-ff.png";
import { requisicao, salvarSessao } from "../../../services/api";




function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault(); // impede o envio tradicional e o recarregamento da página

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

        if (senha.length < 8) {
        setErro("A senha deve ter pelo menos 8 caracteres!");
        return;
        }

        const caractere = /[^A-Za-z0-9]/;
        if(!caractere.test (senha)) {
            setErro("A senha deve conter pelo menos um caractere especial.")
            return;
        }
        

        try {
            const dados = { email: email.trim(), senha: senha };
            const resposta = await requisicao("/auth/login", "POST", dados);
            // O servidor entrega um JWT somente depois de verificar o hash da senha.
            salvarSessao(resposta.token, resposta.usuario);
            navigate("/feed");
        } catch (erro) {
            // A mensagem vem do back-end, por exemplo "Email ou senha inválidos".
            setErro(erro.message);
        }
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


                    <Link className="esqueceu-senha" to="/esqueci-senha">Esqueceu a senha?</Link>

                    <button 
                    className="btn-login" 
                    type="button"
                    onClick={handleLogin}>Login</button>

                    <div className="mensagem">
                        {erro && <p className="mensagem-erro">{erro}</p>}
                        {sucesso && <p className="mensagem-sucesso">{sucesso}</p>}
                    </div>

                    <p>Não tem uma conta? <Link className="cadastre-se" to="/cadastro">Cadastre-se agora</Link></p>
                    <p><Link className="cadastre-se" to="/">Voltar para a escolha de perfil</Link></p>
                </div>
            </section>

           <aside className="painel">
          
                    <img
                        className="painel-imagem"
                        src={logo}
                        alt="Imagem do Franchise Finder"
                    />
                         
                    <div className="painel-conteudo">
                        <div className="painel-topo">
          
                            <div className="painel-marca">
                                <img
                                    className="logo-marca"
                                    src={logoMarca}
                                    alt="Logo Franchise Finder"
                                />
                                <div className="painel-textos">
                                    <h2>Franchise Finder</h2>
                                    <p>Rede de oportunidades</p>
                                </div>
                            </div>

                        </div>
                    </div>

            </aside>
        </div>
        
       
    )
}



export default Login;