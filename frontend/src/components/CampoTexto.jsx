import { useState } from "react";

export default function CampoTexto({ id, label, erro, senha = false, type = "text", ...resto }) {
  const [visivel, setVisivel] = useState(false);
  const input = (
    <input
      id={id}
      name={id}
      type={senha && !visivel ? "password" : type}
      aria-invalid={!!erro}
      {...resto}
    />
  );

  return (
    <div className={`campo${erro ? " invalido" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {senha ? (
        <div className="senha">
          {input}
          <button type="button" onClick={() => setVisivel((v) => !v)}>
            {visivel ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      ) : (
        input
      )}
      {erro && <div className="erro">{erro}</div>}
    </div>
  );
}
