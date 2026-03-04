import { useState, useCallback } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { LanguageProvider } from './context/LanguageContext';

import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import QuienesSomos from './components/QuienesSomos';
import Servicios from './components/Servicios';
import Clientes from './components/Clientes';
import Proyectos from './components/Proyectos';
import Proceso from './components/Proceso';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  /* Activa las animaciones de scroll solo después de que el splash termina */
  useScrollReveal(showSplash);

  return (
    <LanguageProvider>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <Header />
      <main>
        <Hero />
        <QuienesSomos />
        <Servicios />
        <Clientes />
        <Proyectos />
        <Proceso />
        <Contacto />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
