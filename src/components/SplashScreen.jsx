import { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onComplete, onStartExit }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Total animation time matches CSS
    const timer = setTimeout(() => {
      setExiting(true);
      if (onStartExit) onStartExit();
      setTimeout(onComplete, 800); // Wait for exit transition
    }, 3500); // Animation duration

    return () => clearTimeout(timer);
  }, [onComplete, onStartExit]);

  return (
    <div className={`splashContainer ${exiting ? 'splashExit' : ''}`}>
      <div className="splashContent">
        <div className="driftScene">
          <div className="spotlight"></div>
          <div className="cartWrapper">
            {/* Stylized Food Cart SVG */}
            <svg 
              className="cartSvg" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Steam / Aroma */}
              <path className="steam s1" d="M30 15 Q35 10 30 5" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
              <path className="steam s2" d="M50 15 Q55 10 50 5" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
              <path className="steam s3" d="M70 15 Q75 10 70 5" stroke="#fff" strokeWidth="1" strokeLinecap="round" />

              {/* Cart Body */}
              <path d="M10 50 L90 50 L90 80 L10 80 Z" fill="#D9B35F" />
              <path d="M10 50 L40 20 L90 20 L90 50" fill="rgba(255,255,255,0.1)" stroke="#D9B35F" strokeWidth="2" />
              {/* Awning/Roof */}
              <path d="M5 20 L95 20 L100 30 L0 30 Z" fill="#fff" />
              <path d="M15 30 L15 50 M35 30 L35 50 M55 30 L55 50 M75 30 L75 50" stroke="#000" strokeWidth="1" opacity="0.2" />
              {/* Wheels */}
              <g className="wheel w1">
                <circle cx="25" cy="80" r="8" fill="#111" stroke="#D9B35F" strokeWidth="2" />
                <path d="M25 80 L25 72 M25 80 L33 80 M25 80 L25 88 M25 80 L17 80" stroke="#D9B35F" strokeWidth="1" />
              </g>
              <g className="wheel w2">
                <circle cx="75" cy="80" r="8" fill="#111" stroke="#D9B35F" strokeWidth="2" />
                <path d="M75 80 L75 72 M75 80 L83 80 M75 80 L75 88 M75 80 L67 80" stroke="#D9B35F" strokeWidth="1" />
              </g>

              {/* Speed lines/Wind */}
              <path className="speedLine" d="M-20 40 L0 40" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <path className="speedLine delay1" d="M-15 60 L5 60" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="skidMarks"></div>
            <div className="smokeParticles">
              <span className="p1"></span>
              <span className="p2"></span>
              <span className="p3"></span>
            </div>
          </div>
          <div className="road"></div>
        </div>
        
        <h1 className="splashTitle">
          <span className="splashText">Khaana</span>
          <span className="splashText highlight">Krush</span>
        </h1>
        <div className="splashSubtitle">Coming to your location...</div>
      </div>
    </div>
  );
}
