import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

// Painel azul à esquerda + área de conteúdo à direita (usado nas 3 telas)
export default function AuthLayout({ children }) {
  return (
    <div className="split">
      <aside className="painel">
        <Link className="marca" to="/">
          <img src={logo} alt="" />
          <div>
            <strong>Rumo</strong>
            <span>Rede de franquias</span>
          </div>
        </Link>
      </aside>
      <main className="conteudo">{children}</main>
    </div>
  );
}
