import React, { useState, useEffect } from 'react';
import logo from '../assets/dwsserios.png'; // Asigură-te că folosești corect calea pentru logo-ul firmei tale
import '../styles/LoadingScreen.css'; // Stilurile pentru loading screen

const LoadingScreen = ({ onLoaded }) => {
  const [count, setCount] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);
  const [dots, setDots] = useState([]); // Pentru a stoca punctele random
  const [loadingDots, setLoadingDots] = useState('.'); // Primul punct este vizibil mereu
  const [animationComplete, setAnimationComplete] = useState(false); // Indicator pentru finalizarea animatiei

  useEffect(() => {
    // Interval pentru counter
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          generateRandomDots(); // Generează puncte random
          setFadeOut(true); // Inițiază fade-out
          setTimeout(() => {
            onLoaded(); // Notifică componenta părinte că încărcarea este completă
          }, 2000); // Reducem întârzierea la 1 secundă pentru ca pagina să apară mai repede
          setAnimationComplete(true); // Animația este completă
          return prevCount;
        }
      });
    }, 20); // Mai rapid la fiecare 20ms

    return () => clearInterval(interval);
  }, [onLoaded]);

  // Interval pentru punctele de încărcare
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setLoadingDots((prevDots) => {
        if (animationComplete) {
          return '...'; // Odată ce animația e completă, păstrează cele trei puncte
        }
        if (prevDots.length === 1) {
          return '..'; // Al doilea punct apare
        } else if (prevDots.length === 2) {
          return '...'; // Al treilea punct apare
        } else {
          return '.'; // Se resetează la primul punct
        }
      });
    }, 300); // Mai rapid la fiecare 300ms pentru a face animația mai rapidă

    return () => clearInterval(dotsInterval);
  }, [animationComplete]); // Verifică doar dacă animația este completă

  // Funcție pentru selectarea unei culori din paleta specificată
  const generateRandomColor = () => {
    const colors = ['#f4e285', '#ffffff', '#ae8507']; // Paleta de culori
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const generateRandomDots = () => {
    const newDots = [];
    for (let i = 0; i < 200; i++) { // Generăm mai multe puncte random, de exemplu 200
      const size = Math.random() * 10 + 5; // Dimensiuni mai mari, între 5 și 15px
      const angle = Math.random() * 360; // Unghi pentru direcția exploziei
      const distance = Math.random() * 600 + 400; // Distanța la care va exploda (400-1000px)
      const color = generateRandomColor(); // Selectăm o culoare din paleta specificată
      newDots.push({ size, angle, distance, color });
    }
    setDots(newDots);
  };

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <img src={logo} alt="Logo" className="logo" />
      {/* Afișăm counter-ul cu punctele animate */}
      <div className={`counter ${fadeOut ? 'fade-out-counter' : ''}`}>[ {count}{loadingDots} ]</div>
      
      {/* Generăm punctele random */}
      <div className="dots-container">
        {dots.map((dot, index) => (
          <div
            key={index}
            className="dot"
            style={{
              '--size': `${dot.size}px`,
              '--angle': `${dot.angle}deg`,
              '--distance': `${dot.distance}px`,
              backgroundColor: `${dot.color}`, // Setăm culoarea pentru fiecare punct
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
