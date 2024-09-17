// import React, { useRef, useEffect, useState } from 'react';

// const RotatingNetworkCube = () => {
//   const canvasRef = useRef(null);
//   const [isRevealing, setIsRevealing] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;

//     const resizeCanvas = () => {
//       canvas.width = canvas.clientWidth;
//       canvas.height = canvas.clientHeight;
//     };

//     window.addEventListener('resize', resizeCanvas);
//     resizeCanvas();

//     const isMobile = () => window.innerWidth <= 768;

//     const centerX = isMobile() ? canvas.width * 0.5 : canvas.width * 0.70;
//     const centerY = (canvas.height / 2) - (canvas.height * 0.08);
//     const baseSize = Math.min(centerX, centerY) * 1;
//     const size = isMobile() ? baseSize * 1.15 : baseSize;

//     const colors = {
//       primary: '#ffeeca',
//       secondary: '#d9bd89',
//       tertiary: '#ffff00',
//       background: '#ae8507',
//       white: '#ffffff'
//     };

//     const createGradient = (x1, y1, x2, y2, color1, color2) => {
//       const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
//       gradient.addColorStop(0, color1);
//       gradient.addColorStop(1, color2);
//       return gradient;
//     };

//     const cubePoints = [
//       { x: -1, y: -1, z: -1 },
//       { x: 1, y: -1, z: -1 },
//       { x: 1, y: 1, z: -1 },
//       { x: -1, y: 1, z: -1 },
//       { x: -1, y: -1, z: 1 },
//       { x: 1, y: -1, z: 1 },
//       { x: 1, y: 1, z: 1 },
//       { x: -1, y: 1, z: 1 },
//     ].map(p => ({ x: p.x * size / 2, y: p.y * size / 2, z: p.z * size / 2 }));

//     const cubeEdges = [
//       [0, 1], [1, 2], [2, 3], [3, 0],
//       [4, 5], [5, 6], [6, 7], [7, 4],
//       [0, 4], [1, 5], [2, 6], [3, 7],
//     ];

//     const numInteriorPoints = 50;
//     const interiorPoints = Array.from({ length: numInteriorPoints }, () => ({
//       x: (Math.random() - 0.5) * size,
//       y: (Math.random() - 0.5) * size,
//       z: (Math.random() - 0.5) * size,
//       vx: (Math.random() - 0.5) * 2,
//       vy: (Math.random() - 0.5) * 2,
//       vz: (Math.random() - 0.5) * 2,
//       radius: Math.random() * 3 + 1,
//       color: Math.random() < 0.33 ? colors.primary : (Math.random() < 0.5 ? colors.secondary : colors.tertiary)
//     }));

//     const particles = [];
//     const addParticle = (x, y, z) => {
//       particles.push({
//         x, y, z,
//         vx: (Math.random() - 0.5) * 0.5,
//         vy: (Math.random() - 0.5) * 0.5,
//         vz: (Math.random() - 0.5) * 0.5,
//         life: 100 + Math.random() * 50
//       });
//     };

//     let connections = [];
//     let rotationX = 0;
//     let rotationY = 0;
//     let pulseEffect = 0;

//     const rotatePoint = (point) => {
//       let { x, y, z } = point;
//       let tempX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
//       z = x * Math.sin(rotationY) + z * Math.cos(rotationY);
//       x = tempX;
//       let tempY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
//       z = y * Math.sin(rotationX) + z * Math.cos(rotationX);
//       y = tempY;
//       return { x, y, z };
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       rotationX += 0.001;
//       rotationY += 0.002;
//       pulseEffect = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;

//       ctx.strokeStyle = createGradient(centerX - size/2, centerY - size/2, centerX + size/2, centerY + size/2, colors.primary, colors.secondary);
//       ctx.lineWidth = 2 + pulseEffect * 2;
//       ctx.beginPath();
//       cubeEdges.forEach(([i, j]) => {
//         const p1 = rotatePoint(cubePoints[i]);
//         const p2 = rotatePoint(cubePoints[j]);
//         ctx.moveTo(p1.x + centerX, p1.y + centerY);
//         ctx.lineTo(p2.x + centerX, p2.y + centerY);
//       });
//       ctx.stroke();

//       interiorPoints.forEach(point => {
//         point.x += point.vx;
//         point.y += point.vy;
//         point.z += point.vz;

//         if (Math.abs(point.x) > size / 2) point.vx *= -1;
//         if (Math.abs(point.y) > size / 2) point.vy *= -1;
//         if (Math.abs(point.z) > size / 2) point.vz *= -1;

//         const rotated = rotatePoint(point);
//         const projectedX = rotated.x + centerX;
//         const projectedY = rotated.y + centerY;

//         const radius = Math.max(0.1, point.radius * (1 + pulseEffect * 0.5));
//         ctx.beginPath();
//         ctx.arc(projectedX, projectedY, radius, 0, Math.PI * 2);
//         ctx.fillStyle = point.color;
//         ctx.fill();

//         if (Math.random() < 0.05) addParticle(point.x, point.y, point.z);
//       });

//       connections = connections.filter(([i, j, life]) => {
//         const p1 = rotatePoint(interiorPoints[i]);
//         const p2 = rotatePoint(interiorPoints[j]);
//         const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
        
//         if (dist < size * 0.3) {
//           ctx.beginPath();
//           ctx.moveTo(p1.x + centerX, p1.y + centerY);
//           ctx.lineTo(p2.x + centerX, p2.y + centerY);
//           ctx.strokeStyle = createGradient(p1.x + centerX, p1.y + centerY, p2.x + centerX, p2.y + centerY, interiorPoints[i].color, interiorPoints[j].color);
//           ctx.lineWidth = Math.max(0.1, (1 - dist / (size * 0.3)) * 2 * (life / 100));
//           ctx.stroke();
//         }
        
//         return life > 0;
//       }).map(([i, j, life]) => [i, j, life - 1]);

//       if (Math.random() < 0.1) {
//         const i = Math.floor(Math.random() * interiorPoints.length);
//         const j = Math.floor(Math.random() * interiorPoints.length);
//         if (i !== j) {
//           connections.push([i, j, 100 + Math.random() * 50]);
//         }
//       }

//       particles.forEach((particle, index) => {
//         particle.x += particle.vx;
//         particle.y += particle.vy;
//         particle.z += particle.vz;
//         particle.life--;

//         const rotated = rotatePoint(particle);
//         const projectedX = rotated.x + centerX;
//         const projectedY = rotated.y + centerY;

//         const radius = Math.max(0.1, 1 * (particle.life / 150));
//         ctx.beginPath();
//         ctx.arc(projectedX, projectedY, radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${particle.life / 150})`;
//         ctx.fill();

//         if (particle.life <= 0) particles.splice(index, 1);
//       });

//       ctx.shadowBlur = 15;
//       ctx.shadowColor = colors.primary;

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <canvas 
//       ref={canvasRef} 
//       style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
//     />
//   );
// };

// export default RotatingNetworkCube;
import React, { useRef, useEffect, useState } from 'react';

const RotatingNetworkCube = () => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detectează dacă este pe mobil

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Actualizează starea când fereastra este redimensionată
    };

    window.addEventListener('resize', handleResize); // Ascultă redimensionarea

    return () => window.removeEventListener('resize', handleResize); // Curăță ascultătorul la demontare
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Limitează ratele de cadre (FPS)
    const fps = isMobile ? 30 : 60;
    let lastFrameTime = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const centerX = isMobile ? canvas.width * 0.5 : canvas.width * 0.70;
    const centerY = (canvas.height / 2) - (canvas.height * 0.08);
    const baseSize = Math.min(centerX, centerY) * 1;
    const size = isMobile ? baseSize * 0.75 : baseSize; // Reduce dimensiunea pe mobil

    const colors = {
      primary: '#ffeeca',
      secondary: '#d9bd89',
      tertiary: '#ffff00',
      background: '#ae8507',
      white: '#ffffff'
    };

    const createGradient = (x1, y1, x2, y2, color1, color2) => {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      return gradient;
    };

    const cubePoints = [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
    ].map(p => ({ x: p.x * size / 2, y: p.y * size / 2, z: p.z * size / 2 }));

    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    const numInteriorPoints = isMobile ? 25 : 50; // Reduce numărul de puncte pe mobil
    const interiorPoints = Array.from({ length: numInteriorPoints }, () => ({
      x: (Math.random() - 0.5) * size,
      y: (Math.random() - 0.5) * size,
      z: (Math.random() - 0.5) * size,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      vz: (Math.random() - 0.5) * 2,
      radius: Math.random() * 3 + 1,
      color: Math.random() < 0.33 ? colors.primary : (Math.random() < 0.5 ? colors.secondary : colors.tertiary)
    }));

    let rotationX = 0;
    let rotationY = 0;
    let pulseEffect = 0;

    const rotatePoint = (point) => {
      let { x, y, z } = point;
      let tempX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
      z = x * Math.sin(rotationY) + z * Math.cos(rotationY);
      x = tempX;
      let tempY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
      z = y * Math.sin(rotationX) + z * Math.cos(rotationX);
      y = tempY;
      return { x, y, z };
    };

    const animate = (time) => {
      if (time - lastFrameTime < 1000 / fps) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rotationX += isMobile ? 0.0005 : 0.001; // Viteza de rotație mai mică pe mobil
      rotationY += isMobile ? 0.001 : 0.002;
      pulseEffect = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;

      ctx.strokeStyle = createGradient(centerX - size / 2, centerY - size / 2, centerX + size / 2, centerY + size / 2, colors.primary, colors.secondary);
      ctx.lineWidth = 2 + pulseEffect * 2;
      ctx.beginPath();
      cubeEdges.forEach(([i, j]) => {
        const p1 = rotatePoint(cubePoints[i]);
        const p2 = rotatePoint(cubePoints[j]);
        ctx.moveTo(p1.x + centerX, p1.y + centerY);
        ctx.lineTo(p2.x + centerX, p2.y + centerY);
      });
      ctx.stroke();

      // Puncte interioare
      interiorPoints.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;
        point.z += point.vz;

        if (Math.abs(point.x) > size / 2) point.vx *= -1;
        if (Math.abs(point.y) > size / 2) point.vy *= -1;
        if (Math.abs(point.z) > size / 2) point.vz *= -1;

        const rotated = rotatePoint(point);
        const projectedX = rotated.x + centerX;
        const projectedY = rotated.y + centerY;

        const radius = Math.max(0.1, point.radius * (1 + pulseEffect * 0.5));
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, radius, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
      });

      // Dezactivează umbra pe mobil
      if (!isMobile) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = colors.primary;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
    />
  );
};

export default RotatingNetworkCube;
