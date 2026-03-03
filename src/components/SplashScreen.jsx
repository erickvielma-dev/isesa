import { useState, useEffect } from 'react';
import logo from '../assets/logo_mejorado.png';
import './SplashScreen.css';

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1800);
    const remove = setTimeout(() => onFinish(), 2400);
    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, [onFinish]);

  return (
    <div className={`splash ${fadeOut ? 'splash--hide' : ''}`}>
      {/* Onda eléctrica animada de fondo */}
      <div className="splash__wave" />
      <div className="splash__content">
        <img src={logo} alt="ISESA" className="splash__logo" />
        <div className="splash__pulse" />
      </div>
    </div>
  );
}
