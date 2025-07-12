// Generate data URLs for PWA icons using the star logo
export const starIconSvg = `
<svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" rx="32" fill="url(#bg)"/>
  <path d="M96 38L122.4 90.6L182.4 96L139.2 138L149.4 198L96 171.6L42.6 198L52.8 138L9.6 96L69.6 90.6L96 38Z" fill="url(#starGradient)" stroke="#FFF" stroke-width="2"/>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD700"/>
      <stop offset="25%" stop-color="#FF6B35"/>
      <stop offset="50%" stop-color="#F72C5B"/>
      <stop offset="75%" stop-color="#4E44CE"/>
      <stop offset="100%" stop-color="#2CD5C4"/>
    </linearGradient>
  </defs>
</svg>
`;

export const starIcon512Svg = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="64" fill="url(#bg)"/>
  <path d="M256 100L326.4 241.6L486.4 256L371.2 368L397.6 528L256 457.6L114.4 528L140.8 368L25.6 256L185.6 241.6L256 100Z" fill="url(#starGradient)" stroke="#FFF" stroke-width="4"/>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD700"/>
      <stop offset="25%" stop-color="#FF6B35"/>
      <stop offset="50%" stop-color="#F72C5B"/>
      <stop offset="75%" stop-color="#4E44CE"/>
      <stop offset="100%" stop-color="#2CD5C4"/>
    </linearGradient>
  </defs>
</svg>
`;

// Convert SVG to data URL
export const icon192DataUrl = `data:image/svg+xml;base64,${btoa(starIconSvg)}`;
export const icon512DataUrl = `data:image/svg+xml;base64,${btoa(starIcon512Svg)}`;
