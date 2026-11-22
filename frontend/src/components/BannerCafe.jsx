// Ilustração da cafeteria usada como capa (placeholder até termos fotos reais)
export default function BannerCafe({ className = "", altura = 158 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 486 158"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block", width: "100%", height: altura }}
      aria-hidden="true"
    >
      <rect width="486" height="158" fill="#4a3426" />
      <rect y="0" width="486" height="55" fill="#3d2a1e" />
      <rect y="108" width="486" height="50" fill="#7a5236" />
      <rect x="22" y="12" width="72" height="68" fill="#e2d2b3" />
      <rect x="376" y="12" width="72" height="68" fill="#e2d2b3" />
      <circle cx="182" cy="31" r="11" fill="#f2c96b" />
      <circle cx="242" cy="34" r="11" fill="#f2c96b" />
      <circle cx="303" cy="27" r="11" fill="#f2c96b" />
      <rect x="268" y="78" width="196" height="30" fill="#8e5e3e" />
      <circle cx="352" cy="56" r="14" fill="#f1cda8" />
      <rect x="340" y="71" width="26" height="36" rx="3" fill="#f4f4f4" />
      <circle cx="109" cy="92" r="13" fill="#e8b98e" />
      <rect x="96" y="106" width="27" height="28" rx="3" fill="#c0603c" />
      <circle cx="170" cy="96" r="13" fill="#c98b62" />
      <rect x="157" y="109" width="27" height="29" rx="3" fill="#4a7095" />
    </svg>
  );
}
