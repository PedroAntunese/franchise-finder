import React, { useState } from "react";
import CardPerfil from "./CardPerfil";
import "./Home.css"
import { FaRegBuilding } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import logo from "../../Assets/img-ff-tela1.png";
import logoMarca from "../../Assets/logo-ff.png";
import { useNavigate } from "react-router-dom";



function Home() {

    const [mostrarAjuda, setMostrarAjuda] = useState(false);
    const navigate = useNavigate();
    return (

// alteração do componente utilizando o props, aproveitando apenas a estrutura no CardPerfil
    <div className="home">

        <section className="conteudo">
            <div className="conteudo-interno">
                    <h1>Como você quer participar?</h1>
                    <p className="subtitulo">Escolha seu perfil para entrar ou criar uma conta!</p>

    
                <CardPerfil
                    titulo="Franqueador"
                    descricao="Divulgue sua marca, encontre candidatos e acompanhe sua rede de unidades."
                    icone={<FaRegBuilding />}
                    onEntrar={() => navigate("/login?perfil=franqueador")}
                    onCriar={() => navigate("/cadastro?perfil=franqueador")}
                    />

                <CardPerfil
                    titulo="Franqueado"
                    descricao="Conecte-se à rede, acesse novidades e troque experiências com outras unidades."
                    icone={<FiHome />}
                    onEntrar={() => navigate("/login?perfil=franqueado")}
                    semCadastro
                    />

                <CardPerfil
                    titulo="Investidor"
                    descricao="Explore marcas e conteúdos da comunidade e conheça o universo das franquias"
                    icone={<FaRegUser />}
                    onEntrar={() => navigate("/login?perfil=investidor")}
                    onCriar={() => navigate("/cadastro?perfil=investidor")}
                    />

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
                    <div className="painel-frase">

                        <h1>Chegou a sua hora de crescer!</h1>

                        <p>
                            Encontre oportunidades, conecte-se a grandes marcas
                            e descubra novos caminhos para empreender.
                        </p>
                    </div>
                </div>
            </aside>

          <button
                className="btn-ajuda-global"
                onClick={() => setMostrarAjuda(true)}
            >
                ?
            </button>

            {/* POP-UP */}
            {mostrarAjuda && (
                <div
                    className="modal-fundo"
                    onClick={() => setMostrarAjuda(false)}
                >

                    <div
                        className="modal-ajuda"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            className="modal-fechar"
                            onClick={() => setMostrarAjuda(false)}
                        >
                            ×
                        </button>

                        <h2>Qual perfil escolher?</h2>

                        <p><strong>Franqueador:</strong> você é dono de uma marca e quer divulgar a franquia e encontrar novos franqueados.</p>
                        <p><strong>Franqueado:</strong> você já opera uma unidade e quer se conectar à rede da sua marca.</p>
                        <p><strong>Investidor:</strong> você está procurando uma franquia para investir e quer conhecer as marcas.</p>

                    </div>

                </div>
            )}




    </div>



    );
}

export default Home;
