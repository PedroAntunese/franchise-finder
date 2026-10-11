import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  return (
    <main className="login-page">
      <section className="login-card">
        <button
          type="button"
          className="back-button"
          aria-label="Voltar"
          onClick={() => window.history.back()}
        >
          ‹
        </button>

        <div className="login-content">
          <h1>Bem-vindo de volta!</h1>

          <form className="login-form" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Digite seu email"
              aria-label="Digite seu email"
              required
            />

            <input
              type="password"
              placeholder="Digite sua senha"
              aria-label="Digite sua senha"
              required
            />

            <div className="forgot-password">
              <Link to="/recuperar-senha">Esqueceu a senha?</Link>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="divider">
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <p className="register-text">
            Não tem uma conta?{" "}
            <Link to="/cadastro">Cadastre-se agora</Link>
          </p>
        </div>

        <div className="login-wave" aria-hidden="true">
          <svg
            viewBox="0 0 375 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,12 Q187,105 375,12 L375,100 L0,100 Z"
              fill="#244de4"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}