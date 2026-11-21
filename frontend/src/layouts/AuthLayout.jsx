import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

// Área de conteúdo à esquerda + painel azul à direita (usado nas 3 telas)
export default function AuthLayout({ children }) {
  return (
    <div className="split">
      <main className="conteudo">{children}</main>
      <aside className="painel">
        <Link className="marca" to="/">
          <img src={logo} alt="" />
          <div>
            <strong>Rumo</strong>
            <span>Rede de franquias</span>
          </div>
        </Link>
      </aside>
    </div>
  );
}
