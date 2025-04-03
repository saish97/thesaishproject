'use client';
import { useEffect, useRef } from 'react';

interface BackgroundPatternProps {
  className?: string;
  dotColor?: string;
}

interface Dot {
    x: number;
    y: number;
    size: number;
    opacity: number;
}

export function BackgroundPattern({ 
    className = '',
    dotColor = 'rgb(20 184 166 / 0.5)'
}: BackgroundPatternProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions to match window
        const setCanvasSize = (): void => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Create dots
        const dotCount: number = 200;
        const dots: Dot[] = [];
        
        for (let i = 0; i < dotCount; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 1.5 + Math.random() * 1.5,
                opacity: 0.2 + Math.random() * 0.2
            });
        }

        // Simple animation
        let animationFrame: number;
        const animate = (): void => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw dots with very subtle movement
            const time: number = Date.now() * 0.0005;
            
            dots.forEach((dot: Dot, index: number) => {
                const offsetX: number = Math.sin(time + index * 0.2) * 20;
                const offsetY: number = Math.cos(time + index * 0.2) * 20;
                
                ctx.beginPath();
                ctx.arc(
                    dot.x + offsetX, 
                    dot.y + offsetY, 
                    dot.size, 
                    0, 
                    Math.PI * 2
                );
                ctx.fillStyle = dotColor.replace('0.3', dot.opacity.toString());
                ctx.fill();
            });
            
            animationFrame = requestAnimationFrame(animate);
        };
        
        animate();
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrame);
        };
    }, [dotColor]);

    return (
        <div 
            className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
            aria-hidden="true"
        >
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0" 
            />
        </div>
    );
}