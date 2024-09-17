import React, { useEffect, useRef, useState } from 'react';
import { useClickContext } from '../contexts/ClickContext';
import { Navigate } from 'react-router-dom';

const HiddenPage = () => {
  const { showHiddenPage } = useClickContext();
  const canvasRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!showHiddenPage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    const stars = [];
    const numStars = 200;
    const speed = 0.2;

    // Create stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * speed + 0.1
      });
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move star
        star.y += star.speed;

        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Fade in effect
    let fadeInInterval = setInterval(() => {
      setOpacity(prev => {
        if (prev >= 1) {
          clearInterval(fadeInInterval);
          return 1;
        }
        return prev + 0.05;
      });
    }, 50);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(fadeInInterval);
    };
  }, [showHiddenPage]);

  if (!showHiddenPage) {
    return <Navigate to="/" />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black" style={{ opacity }}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome, Master</h1>
        <p className="text-xl md:text-2xl text-white">Provide the key</p>
      </div>
    </div>
  );
};

export default HiddenPage;
