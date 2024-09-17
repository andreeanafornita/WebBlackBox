import React, { useRef, useEffect } from 'react';

const RotatingNetworkSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const centerX = canvas.width * 0.70; // Shift the sphere to the right
const centerY = (canvas.height / 2) - (canvas.height * 0.08); // Keep the vertical positioning the same
    const radius = Math.min(centerX, centerY) * 1; // Dimensiunea Sferei
    const numPoints = 40; // Menținem un număr moderat de puncte
    const points = [];


    
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      });
    }

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotation += 0.002;

      const rotatedPoints = points.map(point => ({
        x: point.x * Math.cos(rotation) - point.z * Math.sin(rotation),
        y: point.y,
        z: point.x * Math.sin(rotation) + point.z * Math.cos(rotation),
      }));

      // Desenăm liniile
      ctx.beginPath();
      rotatedPoints.forEach((point, i) => {
        const projectedX = point.x + centerX;
        const projectedY = point.y + centerY;

        rotatedPoints.slice(i + 1).forEach(otherPoint => {
          const otherProjectedX = otherPoint.x + centerX;
          const otherProjectedY = otherPoint.y + centerY;
          const dx = projectedX - otherProjectedX;
          const dy = projectedY - otherProjectedY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius * 1) { // Mărim raza de conectare pentru a genera mai multe linii
            ctx.moveTo(projectedX, projectedY);
            ctx.lineTo(otherProjectedX, otherProjectedY);
          }
        });
      });
      ctx.strokeStyle = 'rgba(174, 133, 7, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Desenăm punctele
      rotatedPoints.forEach(point => {
        const projectedX = point.x + centerX;
        const projectedY = point.y + centerY;
        const size = (point.z + radius) / (2 * radius);

        ctx.beginPath();
        ctx.arc(projectedX, projectedY, size * 4, 0, Math.PI * 2); // Puncte mai mari
        ctx.fillStyle = `rgba(174, 133, 7, ${size * 0.8 + 0.2})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    />
  );
};

export default RotatingNetworkSphere;