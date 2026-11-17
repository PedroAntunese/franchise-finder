const ICONES = {
  franqueador: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4" />
    </>
  ),
  franqueado: (
    <>
      <path d="M4 9l1.5-5h13L20 9M4 9h16M4 9v11h16V9M4 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  convidado: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
};

export default function IconePerfil({ perfil }) {
  return (
    <div className="icone">
      <svg viewBox="0 0 24 24" aria-hidden="true">{ICONES[perfil]}</svg>
    </div>
  );
}
