// Ícones SVG simples usados nas telas internas (feed, franquia...)
export default function Icone({ nome, tamanho = 20 }) {
  const props = {
    width: tamanho,
    height: tamanho,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (nome) {
    case "inicio":
      return (
        <svg {...props}>
          <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "rede":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.1.7 3.5 2.8 3.5 5.7" />
        </svg>
      );
    case "franquias":
      return (
        <svg {...props}>
          <path d="M4 9l1.5-5h13L20 9" />
          <path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9" />
          <path d="M5 12v8h14v-8M10 20v-5h4v5" />
        </svg>
      );
    case "mensagens":
      return (
        <svg {...props}>
          <path d="M4 4h16v12H8l-4 4z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    case "avisos":
      return (
        <svg {...props}>
          <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
          <path d="M10 21h4" />
        </svg>
      );
    case "busca":
      return (
        <svg {...props} strokeWidth={2.5}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
      );
    case "salvar":
      return (
        <svg {...props}>
          <path d="M6 3h12v18l-6-4-6 4z" />
        </svg>
      );
    case "curtir":
      return (
        <svg {...props}>
          <path d="M12 20s-7.5-4.6-9-9.3C2 7.4 4.2 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.8 1.1-1.7 2.7-2.8 4.7-2.8 3.1 0 5.3 2.9 4.3 6.2-1.5 4.7-9 9.3-9 9.3z" />
        </svg>
      );
    case "comentar":
      return (
        <svg {...props}>
          <path d="M4 4h16v12H8l-4 4z" />
          <path d="M8 9h8M8 12h6" />
        </svg>
      );
    case "mais":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" />
        </svg>
      );
    case "alimentacao":
      return (
        <svg {...props}>
          <path d="M5 8h12l-1.5 12h-9z" />
          <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H16.5M8 4c0 1 1 1 1 2M12 3c0 1 1 1.5 1 2.5" />
        </svg>
      );
    case "beleza":
      return (
        <svg {...props}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M8.2 8.2L20 20M8.2 15.8L20 4" />
        </svg>
      );
    case "pets":
      return (
        <svg {...props}>
          <circle cx="5.5" cy="10" r="2" />
          <circle cx="9.5" cy="5.5" r="2" />
          <circle cx="14.5" cy="5.5" r="2" />
          <circle cx="18.5" cy="10" r="2" />
          <path d="M12 12c-3 0-6 4.5-6 6.5 0 1.5 1.2 2 2.5 2 1.4 0 2.2-.8 3.5-.8s2.1.8 3.5.8c1.3 0 2.5-.5 2.5-2 0-2-3-6.5-6-6.5z" />
        </svg>
      );
    default:
      return null;
  }
}
