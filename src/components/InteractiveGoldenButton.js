import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const InteractiveGoldenButton = ({ children, href }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      };

      resizeCanvas();

      const particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 - 0.5,
      }));

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(174, 133, 7, 0.8)';  // Particule aurii la hover
          ctx.fill();
        });

        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 70) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(174, 133, 7, ${1 - distance / 70})`;  // Linii aurii la hover
              ctx.stroke();
            }
          });
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isHovered]);

  const buttonContent = (
    <>
      {isHovered && (
        <canvas
          ref={canvasRef}
          className="interactive-golden-button-canvas"
        />
      )}
      <span className="interactive-golden-button-text">{children}</span>
    </>
  );

  const motionProps = {
    className: "interactive-golden-button",
    whileHover: {
      scale: 1.05,
      boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
      backgroundColor: 'rgba(174, 133, 7, 0.1)',
      color: 'white'
    },
    whileTap: { scale: 0.95 },
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
  };

  return href ? (
    <motion.a href={href} {...motionProps}>
      {buttonContent}
    </motion.a>
  ) : (
    <motion.button {...motionProps}>
      {buttonContent}
    </motion.button>
  );
};

export default InteractiveGoldenButton;