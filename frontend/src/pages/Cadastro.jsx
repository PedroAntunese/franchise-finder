import React from "react";
import { Link } from "react-router-dom";
import "../styles/Cadastro.css";

export default function Cadastro() {
  return (
    <main className="cadastro-page">
      <section className="cadastro-card">
        <button
          type="button"
          className="back-button"
          aria-label="Voltar"
          onClick={() => window.history.back()}
        >
          ‹
        </button>

        <div className="cadastro-content">
          <h1>Olá! Crie sua conta</h1>

          <form className="cadastro-form" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Usuário"
              aria-label="Usuário"
              required
            />

            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              required
            />

            <input
            type="password"
            placeholder="Senha"
            aria-label="Senha"
            required
          />
          
          <input
          type="password"
          placeholder="Confirme sua senha"
          aria-label="Confirmar Senha"
          required
        />

            <button type="submit" className="cadastro-button">
              Cadastro
            </button>
          </form>

          <div className="divider">
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <p className="register-text">
            Já tem uma conta?{" "}
            <Link to="/login">Faça login agora</Link>
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