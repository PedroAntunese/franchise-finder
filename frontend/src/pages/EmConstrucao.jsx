import { Link, useNavigate } from "react-router-dom";
import "../styles/EmConstrucao.css";

// Tela provisória para links que ainda não têm página.
// Antes eles caíam na Home e pareciam um logout.
function EmConstrucao(props) {
    const navigate = useNavigate();
    const titulo = props.titulo || "Página em construção";
    const texto = props.texto || "Esta parte do Franchise Finder ainda está sendo feita.";

    return (
        <div className="em-construcao">
            <div className="em-construcao-cartao">
                <h1>{titulo}</h1>
                <p>{texto}</p>
                <div className="em-construcao-acoes">
                    <button type="button" className="btn-login" onClick={() => navigate(-1)}>Voltar</button>
                    <Link to="/">Ir para o início</Link>
                </div>
            </div>
        </div>
    );
}

export default EmConstrucao;
