import "./Esqueci.css";
import logo from "../../Assets/img-ff-tela1.png";
import logoMarca from "../../Assets/logo-ff.png";
import { useState } from "react";
import { Link } from "react-router-dom";


function EsqueciSenha() {
    const [email, setEmail] = useState("");
    const [erro, setErro] = useState("");
    const [enviado, setEnviado] = useState(false);

    function handleEnviar(e) {
        e.preventDefault();

        setErro("");

        if(email.trim() === "") {
            setErro("Digite seu email!")
            return;
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailValido.test(email.trim())) {
            setErro("Digite um email válido!")
            return;
        }

        // TODO: o back-end ainda não tem rota de recuperação de senha nem envio de e-mail.
        setEnviado(true);
    }
    return(
        

        <div className="esqueci">
            <section className="esqueci-form">
                <div className="esqueci-form-interno">

                    <h1>Esqueceu a senha?</h1>
                    <p>Digite seu email e enviaremos um link para criar uma nova senha.</p>


                    <input
                     className="form" 
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)} 
                     placeholder="Digite seu email" 
                     type="email"/>


                    <button className="btn-login" type="button" onClick={handleEnviar}>Enviar link</button>

                    {/* Mensagens de erro: */}

                <div className="mensagem">
                    {erro && <p className="mensagem-erro">{erro}</p>}
                    {enviado && <p className="mensagem-sucesso">Enviamos um link para seu email. Confira sua caixa de entrada.</p>}
                </div>

                <p>Lembrou a senha? <Link className="cadastre-se" to="/login-franqueador">Voltar para o login</Link></p>

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

    );


}

export default EsqueciSenha;