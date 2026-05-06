// Minimalist SVG logo for Kuldeep AI Solutions
const Logo = ({ size = 40, white = false }) => {
  const color = white ? "#FFFFFF" : "#1A365D";
  const accent = white ? "#D4A843" : "#D4A843";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Kuldeep AI Solutions Logo">
      {/* Hexagon background */}
      <polygon
        points="24,2 44,13 44,35 24,46 4,35 4,13"
        fill={color}
        opacity={white ? 0.15 : 0.1}
        stroke={color}
        strokeWidth="1.5"
      />
      {/* K letter stylized */}
      <path
        d="M16 14 L16 34 M16 24 L28 14 M16 24 L28 34"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AI node dots */}
      <circle cx="32" cy="20" r="2.5" fill={accent} />
      <circle cx="36" cy="26" r="2" fill={accent} opacity="0.7" />
      <circle cx="30" cy="30" r="1.5" fill={accent} opacity="0.5" />
      {/* Connection lines */}
      <line x1="32" y1="20" x2="36" y2="26" stroke={accent} strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="26" x2="30" y2="30" stroke={accent} strokeWidth="1" opacity="0.5" />
    </svg>
  );
};

export default Logo;
