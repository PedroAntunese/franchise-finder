import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import IconePerfil from "../components/IconePerfil";
import { PERFIS } from "../utils/perfis";
import "../styles/Inicio.css";

export default function Inicio() {
  return (
    <AuthLayout>
      <h1>Como você quer participar?</h1>
      <p className="sub">Escolha o seu perfil para entrar ou criar uma conta.</p>

      {Object.entries(PERFIS).map(([id, p]) => (
        <section className="perfil" key={id}>
          <IconePerfil perfil={id} />
          <div className="texto">
            <h2>{p.nome}</h2>
            <p>{p.descricao}</p>
          </div>
          <div className="acoes">
            <Link className="btn btn-primario" to={`/login?perfil=${id}`}>Entrar</Link>
            <Link className="btn btn-contorno" to={`/cadastro?perfil=${id}`}>Criar conta</Link>
            {id === "franqueador" && (
              <Link className="btn btn-contorno" to="/cadastro-franquia">Cadastrar franquia</Link>
            )}
          </div>
        </section>
      ))}
    </AuthLayout>
  );
}