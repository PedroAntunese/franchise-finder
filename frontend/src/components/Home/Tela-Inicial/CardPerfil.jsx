import React from "react";
import "./CardPerfil.css";



// Props-> como se exportasse a estrutura e os dados fosse alterados no outro componente

function CardPerfil(props) {
    return(
       

            <div className="card">
                <div className="card-icone">{props.icone}</div>
                <div className="card-texto">
                    <h2>{props.titulo}</h2>
                    <p>{props.descricao}</p>
                </div>
                
                <div className="card-botao">
                    <button className="card-botao-entrar" onClick={props.onEntrar}>Entrar</button>
                    {!props.semCadastro && (
                        <button className="card-botao-criar" onClick={props.onCriar}>Criar conta</button>
                    )}
                </div>

            </div>

  


    );
}


export default CardPerfil;