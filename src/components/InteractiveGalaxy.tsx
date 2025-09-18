"use client";

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkle: number;
  originalX: number;
  originalY: number;
}

interface Planet {
  x: number;
  y: number;
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
  originalX: number;
  originalY: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
}

export const InteractiveGalaxy: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialiser les étoiles
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        starsRef.current.push({
          x,
          y,
          originalX: x,
          originalY: y,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.3 + 0.05,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    };

    // Initialiser les planètes
    const initPlanets = () => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
      planetsRef.current = [];
      for (let i = 0; i < 4; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        planetsRef.current.push({
          x,
          y,
          originalX: x,
          originalY: y,
          size: Math.random() * 10 + 6,
          color: colors[i],
          orbitRadius: Math.random() * 60 + 40,
          orbitSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          angle: Math.random() * Math.PI * 2,
        });
      }
    };

    // Redimensionner le canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initPlanets();
    };

    // Gérer le mouvement de la souris (global pour suivre la souris partout)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      mouseRef.current = {
        x: mouseX,
        y: mouseY,
      };
    };

    // Gérer le mouvement de la souris sur le canvas (pour les particules)
    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Créer des particules au hover
      if (Math.random() < 0.3) {
        particlesRef.current.push({
          x: mouseX + (Math.random() - 0.5) * 40,
          y: mouseY + (Math.random() - 0.5) * 40,
          size: Math.random() * 2 + 1,
          opacity: 0.8,
          life: 0,
          maxLife: 60,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
        });
      }
    };

    // Gérer le clic global
    const handleGlobalClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Vérifier si le clic est dans les limites du canvas
      if (clickX >= 0 && clickX <= canvas.width && clickY >= 0 && clickY <= canvas.height) {
        // Créer une onde de choc plus petite et plus lente
        ripplesRef.current.push({
          x: clickX,
          y: clickY,
          radius: 0,
          opacity: 1,
          maxRadius: 80, // Plus petit
        });

        // Effet sur les étoiles proches - les écarter
        starsRef.current.forEach((star) => {
          const dx = star.x - clickX;
          const dy = star.y - clickY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120 && distance > 0) {
            const force = (120 - distance) / 120;
            const pushDistance = force * 30;
            star.x += (dx / distance) * pushDistance;
            star.y += (dy / distance) * pushDistance;
          }
        });
      }
    };

    // Animation
    const animate = () => {
      // Effacer le canvas avec un fond dégradé
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height, 0,
        canvas.width / 2, canvas.height, canvas.height
      );
      gradient.addColorStop(0, '#1b2735');
      gradient.addColorStop(1, '#090a0f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dessiner les étoiles
      starsRef.current.forEach((star) => {
        // Attraction vers la souris
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          star.x += dx * 0.003 * force;
          star.y += dy * 0.003 * force;
        } else {
          // Retour lent vers la position originale
          const returnDx = star.originalX - star.x;
          const returnDy = star.originalY - star.y;
          star.x += returnDx * 0.001;
          star.y += returnDy * 0.001;
        }

        // Mouvement lent vers le bas
        star.originalY += star.speed;
        star.twinkle += 0.03;

        // Réinitialiser si l'étoile sort de l'écran
        if (star.originalY > canvas.height + 10) {
          star.originalY = -10;
          star.originalX = Math.random() * canvas.width;
          star.x = star.originalX;
          star.y = star.originalY;
        }

        // Dessiner l'étoile avec scintillement
        const twinkleOpacity = star.opacity * (0.3 + 0.7 * Math.sin(star.twinkle));
        const hoverEffect = distance < 50 ? 1.5 : 1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * hoverEffect, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
        ctx.fill();

        // Effet de halo pour les étoiles proches de la souris
        if (distance < 50) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity * 0.2})`;
          ctx.fill();
        }
      });

      // Dessiner les planètes (sans effets de hover)
      planetsRef.current.forEach((planet) => {
        // Orbite autour de la position initiale
        planet.angle += planet.orbitSpeed;
        const orbitX = planet.originalX + Math.cos(planet.angle) * planet.orbitRadius;
        const orbitY = planet.originalY + Math.sin(planet.angle) * planet.orbitRadius;

        // Mise à jour de la position actuelle
        planet.x = orbitX;
        planet.y = orbitY;

        // Dessiner la planète
        ctx.beginPath();
        ctx.arc(orbitX, orbitY, planet.size, 0, Math.PI * 2);
        
        // Gradient pour la planète
        const gradient = ctx.createRadialGradient(
          orbitX - planet.size * 0.3, orbitY - planet.size * 0.3, 0,
          orbitX, orbitY, planet.size
        );
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(1, planet.color + '80');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Dessiner les particules de hover
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        particle.opacity = 1 - (particle.life / particle.maxLife);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.6})`;
        ctx.fill();

        return particle.life < particle.maxLife;
      });

      // Dessiner les ondes de choc (plus lentes)
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Onde secondaire plus subtile
        if (ripple.radius > 15) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 15, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Écarter les étoiles proches de l'onde
        starsRef.current.forEach((star) => {
          const dx = star.x - ripple.x;
          const dy = star.y - ripple.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (Math.abs(distance - ripple.radius) < 5 && distance > 0) {
            const pushForce = 0.5;
            star.x += (dx / distance) * pushForce;
            star.y += (dy / distance) * pushForce;
          }
        });

        ripple.radius += 1.5; // Plus lent
        ripple.opacity -= 0.008; // Plus lent

        return ripple.opacity > 0 && ripple.radius < ripple.maxRadius;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialisation
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('click', handleGlobalClick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('click', handleGlobalClick);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Dépendances vides pour éviter les re-renders

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full interactive-galaxy"
    />
  );
};