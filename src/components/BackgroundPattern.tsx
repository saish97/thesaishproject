'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import { debounce } from '@/utils/debounce'; // Import debounce

// --- Interfaces ---
interface BackgroundPatternProps {
  className?: string;
  dotColor?: string; // Base color for the theme
}

// Interface for Particle state
interface ParticleState {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  canvasWidth: number; // Store canvas dimensions for boundary checks
  canvasHeight: number;
}

// Interface for Mouse position
interface MousePosition {
  x: number | null;
  y: number | null;
}

// --- Particle Class ---
// Represents a single particle in the network
class Particle implements ParticleState {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  canvasWidth: number;
  canvasHeight: number;

  // --- Configuration ---
  static BASE_SPEED = 0.5; // Base speed multiplier

  constructor(width: number, height: number, x?: number, y?: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.x = x ?? Math.random() * this.canvasWidth;
    this.y = y ?? Math.random() * this.canvasHeight;
    this.size = Math.random() * 1.5 + 1; // Size between 1 and 2.5
    this.speedX = (Math.random() * 2 - 1) * Particle.BASE_SPEED; // Random horizontal speed
    this.speedY = (Math.random() * 2 - 1) * Particle.BASE_SPEED; // Random vertical speed
  }

  // Update particle position and handle boundaries
  update(canvasWidth: number, canvasHeight: number): void {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.x += this.speedX;
    this.y += this.speedY;

    // Boundary check (wrap around edges)
    if (this.x < 0) this.x = this.canvasWidth;
    if (this.x > this.canvasWidth) this.x = 0;
    if (this.y < 0) this.y = this.canvasHeight;
    if (this.y > this.canvasHeight) this.y = 0;
  }

  // Draw the particle
  draw(ctx: CanvasRenderingContext2D, particleColor: string): void {
    ctx.fillStyle = particleColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}


// --- React Component ---
export function BackgroundPattern({
  className = '',
  dotColor = 'rgb(20 184 166 / 0.5)', // Default to user's teal
}: BackgroundPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: null, y: null });
  const animationFrameRef = useRef<number | undefined>(undefined);

  // --- Configuration ---
  const PARTICLE_COUNT = 100; // Number of particles
  const MAX_LINE_DISTANCE = 120; // Max distance for lines between particles
  const MOUSE_INTERACTION_RADIUS = 180; // Radius for mouse interaction lines

  // Derive theme colors from dotColor prop
  // Use slightly higher opacity for particles themselves for better visibility
  const particleDrawColor = dotColor.replace(/[\d\.]+\)$/g, '0.8)');
  // Use lower opacity for connecting lines
  const lineDrawColorBase = dotColor.replace(/[\d\.]+\)$/g, ''); // Get 'rgb(r g b / ' part
  const mouseLineDrawColor = dotColor.replace(/[\d\.]+\)$/g, '0.5)'); // Opacity for mouse lines


  // --- Initialization and Resize Handler ---
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Adjust for pixel density for sharper rendering
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext('2d');
     if (!ctx) return;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio); // Scale context

    // Use scaled dimensions for particle creation
    const scaledWidth = canvas.width / window.devicePixelRatio;
    const scaledHeight = canvas.height / window.devicePixelRatio;

    particlesRef.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push(new Particle(scaledWidth, scaledHeight));
    }
  }, [PARTICLE_COUNT]); // Dependency: particle count


  // --- Connect Particles Logic ---
  const connectParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[], mouse: MousePosition) => {
    ctx.lineWidth = 0.5; // Thin lines

    for (let i = 0; i < particles.length; i++) {
      // Connect to other particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_LINE_DISTANCE) {
          const opacity = 1 - (distance / MAX_LINE_DISTANCE);
          // Dynamically set strokeStyle with calculated opacity based on base color
          ctx.strokeStyle = `${lineDrawColorBase}${opacity * 0.4})`; // Adjust multiplier for desired line visibility
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < MOUSE_INTERACTION_RADIUS) {
          const opacity = 1 - (distanceMouse / MOUSE_INTERACTION_RADIUS);
          // Use specific mouse line color, adjusting global alpha for fade
          ctx.strokeStyle = mouseLineDrawColor;
          ctx.globalAlpha = opacity; // Fade line using globalAlpha
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.globalAlpha = 1.0; // Reset global alpha
        }
      }
    }
  }, [lineDrawColorBase, mouseLineDrawColor, MAX_LINE_DISTANCE, MOUSE_INTERACTION_RADIUS]); // Dependencies for connection logic


  // --- Animation Loop ---
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Use scaled dimensions for clearing and updates
    const scaledWidth = canvas.width / window.devicePixelRatio;
    const scaledHeight = canvas.height / window.devicePixelRatio;

    // Clear canvas completely each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach(p => {
      p.update(scaledWidth, scaledHeight); // Pass current dimensions
      p.draw(ctx, particleDrawColor);
    });

    // Draw connecting lines
    connectParticles(ctx, particlesRef.current, mouseRef.current);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [particleDrawColor, connectParticles]); // Dependencies for animation


  // --- Effect Hook for Setup & Cleanup ---
  useEffect(() => {
    initCanvas(); // Initial setup

    const debouncedResizeHandler = debounce(() => { // Debounce the resize handler
        initCanvas(); // Re-initialize on resize
        // Restart animation if it was running
        if (animationFrameRef.current) {
             cancelAnimationFrame(animationFrameRef.current);
             animationFrameRef.current = requestAnimationFrame(animate);
        }
    }, 250); // 250ms debounce delay

    const handleMouseMove = (event: MouseEvent) => {
      // Adjust mouse coordinates for canvas scaling
       const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: (event.clientX - rect.left), // * window.devicePixelRatio, // No need to scale mouse here if context is scaled
            y: (event.clientY - rect.top) // * window.devicePixelRatio
        };
    };

    const handleMouseOut = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener('resize', debouncedResizeHandler); // Use debounced handler
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler); // Clean up debounced handler
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initCanvas, animate]); // Rerun effect if init or animate functions change


  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 ${className}`} // Ensure it's behind content
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
}