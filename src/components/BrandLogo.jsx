import React from 'react';
import './BrandLogo.css';

export default function BrandLogo() {
  return (
    <svg 
      className="brandLogoSvg" 
      viewBox="0 0 400 50" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KHAANAKRUSH"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#d9b35f" />
        </linearGradient>
      </defs>

      {/* K - Delay 1 */}
      <g className="letter-group" transform="translate(10, 10)">
        <line x1="0" y1="0" x2="0" y2="30" className="stroke-vertical anim-delay-1" />
        <line x1="0" y1="18" x2="18" y2="0" className="stroke-diag-up anim-delay-1" />
        <line x1="0" y1="18" x2="18" y2="30" className="stroke-diag-down anim-delay-1" />
      </g>

      {/* H - Delay 3 */}
      <g className="letter-group" transform="translate(40, 10)">
        <line x1="0" y1="0" x2="0" y2="30" className="stroke-vertical anim-delay-3" />
        <line x1="20" y1="0" x2="20" y2="30" className="stroke-vertical anim-delay-3" />
        <line x1="0" y1="15" x2="20" y2="15" className="stroke-horiz" />
      </g>

      {/* A - Delay 2 */}
      <g className="letter-group" transform="translate(75, 10)">
        <polyline points="0,30 10,0 20,30" className="stroke-peak anim-delay-2" />
        <line x1="5" y1="20" x2="15" y2="20" className="stroke-horiz" />
      </g>

      {/* A - Delay 4 */}
      <g className="letter-group" transform="translate(105, 10)">
        <polyline points="0,30 10,0 20,30" className="stroke-peak anim-delay-4" />
        <line x1="5" y1="20" x2="15" y2="20" className="stroke-horiz" />
      </g>

      {/* N - Delay 1 (Left) & 1.5 (Right) */}
      <g className="letter-group" transform="translate(135, 10)">
        <line x1="0" y1="0" x2="0" y2="30" className="stroke-vertical anim-delay-1" />
        <line x1="0" y1="0" x2="20" y2="30" className="stroke-diag-down anim-delay-1" />
        <line x1="20" y1="0" x2="20" y2="30" className="stroke-vertical anim-delay-1-5" />
      </g>

      {/* A - Delay 5 */}
      <g className="letter-group" transform="translate(165, 10)">
        <polyline points="0,30 10,0 20,30" className="stroke-peak anim-delay-5" />
        <line x1="5" y1="20" x2="15" y2="20" className="stroke-horiz" />
      </g>

      {/* K - Delay 2 */}
      <g className="letter-group" transform="translate(195, 10)">
        <line x1="0" y1="0" x2="0" y2="30" className="stroke-vertical anim-delay-2" />
        <line x1="0" y1="18" x2="18" y2="0" className="stroke-diag-up anim-delay-2" />
        <line x1="0" y1="18" x2="18" y2="30" className="stroke-diag-down anim-delay-2" />
      </g>

      {/* R - Delay 3 */}
      <g className="letter-group" transform="translate(225, 10)">
        <line x1="0" y1="0" x2="0" y2="30" className="stroke-vertical anim-delay-3" />
        <path d="M0,0 L12,0 C18,0 18,15 12,15 L0,15" className="stroke-curved anim-delay-3" />
        <line x1="6" y1="15" x2="18" y2="30" className="stroke-diag-down anim-delay-3" />
      </g>

      {/* U - Delay 4 */}
      <g className="letter-group" transform="translate(255, 10)">
        {/* Curved U */}
        <path d="M0,0 L0,20 Q0,30 10,30 Q20,30 20,20 L20,0" className="stroke-curved anim-delay-4" />
      </g>

      {/* S - Delay 5 */}
      <g className="letter-group" transform="translate(285, 10)">
        <path d="M18,5 Q18,0 10,0 Q0,0 0,10 Q0,20 18,20 Q18,30 10,30 Q0,30 0,25" className="stroke-curved anim-delay-5" />
      </g>

      {/* H - Delay 1 (Left) & 1.5 (Right) */}
      <g className="letter-group" transform="translate(315, 10)">
        <line x1="0" y1="0" x2="0" y2="30" className="stroke-vertical anim-delay-1" />
        <line x1="20" y1="0" x2="20" y2="30" className="stroke-vertical anim-delay-1-5" />
        <line x1="0" y1="15" x2="20" y2="15" className="stroke-horiz" />
      </g>

    </svg>
  );
}
