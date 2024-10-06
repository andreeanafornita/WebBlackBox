import React, { useRef, useEffect } from 'react';

const RotatingNetworkSphere = () => {
  const canvasRef = useRef(null);
  const centerXRef = useRef(0);
  const centerYRef = useRef(0);
  const radiusRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Update centerX, centerY, and radius
      centerXRef.current = canvas.width * 0.70; // Shift the sphere to the right
      centerYRef.current = (canvas.height / 2) - (canvas.height * 0.08);
      radiusRef.current = Math.min(centerXRef.current, centerYRef.current) * 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const numPoints = 40; // Number of points
    const points = [];

    // Generate points on a unit sphere
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1); // Uniform distribution
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      points.push({ x, y, z });
    }

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotation += 0.002;

      const centerX = centerXRef.current;
      const centerY = centerYRef.current;
      const radius = radiusRef.current;

      const rotatedPoints = points.map(point => {
        // Rotate around the Y-axis
        const x = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
        const y = point.y;
        const z = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);

        return {
          x: x * radius,
          y: y * radius,
          z: z * radius,
        };
      });

      // Draw lines
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

          if (distance < radius * 1) {
            // Adjust the connection radius as needed
            ctx.moveTo(projectedX, projectedY);
            ctx.lineTo(otherProjectedX, otherProjectedY);
          }
        });
      });
      ctx.strokeStyle = 'rgba(174, 133, 7, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw points
      rotatedPoints.forEach(point => {
        const projectedX = point.x + centerX;
        const projectedY = point.y + centerY;
        const size = (point.z + radius) / (2 * radius);

        ctx.beginPath();
        ctx.arc(projectedX, projectedY, size * 4, 0, Math.PI * 2); // Larger points
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
