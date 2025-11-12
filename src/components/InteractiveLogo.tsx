import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingSparklesProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const FloatingSparkles: React.FC<FloatingSparklesProps> = ({ containerRef }) => {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    rotation: number;
    opacity: number;
    isValid: boolean;
  }>>([]);

  useEffect(() => {
    const createSparkle = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      // Generate position in viewport coordinates
      let attempts = 0;
      let validPosition = false;
      let x, y;
      
      while (!validPosition && attempts < 20) {
        // Generate position in the hero section area (wider area around logo)
        x = Math.random() * (containerRect.width + 400) - 200; // Extend beyond container
        y = Math.random() * (containerRect.height + 200) - 100; // Extend above/below
        
        // Check if position is not too close to logo center
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        
        // Must be at least 100px away from logo center
        if (distance > 100) {
          validPosition = true;
        }
        attempts++;
      }
      
      if (!validPosition) return; // Skip if no valid position found
      
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: (x / containerRect.width) * 100, // Convert to percentage
        y: (y / containerRect.height) * 100,
        size: Math.random() * 16 + 8, // 8-24px
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.8 + 0.2,
        isValid: true
      };
      
      setSparkles(prev => [...prev.slice(-4), newSparkle]); // Keep max 5 sparkles
    };

    const interval = setInterval(createSparkle, 3000); // Create sparkle every 3 seconds
    return () => clearInterval(interval);
  }, [containerRef]);

  useEffect(() => {
    // Remove sparkles after 6 seconds
    const cleanup = setInterval(() => {
      setSparkles(prev => prev.filter(sparkle => Date.now() - sparkle.id < 6000));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 1 }}>
      {sparkles.map((sparkle) => (
        <Sparkles
          key={sparkle.id}
          className="absolute text-yellow-400 animate-pulse drop-shadow-lg"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            transform: `rotate(${sparkle.rotation}deg)`,
            opacity: sparkle.opacity,
            animationDuration: '4s',
            filter: 'drop-shadow(0 0 4px rgba(255, 193, 7, 0.6))'
          }}
        />
      ))}
    </div>
  );
};

export const InteractiveLogo: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only track mouse in the top portion of the page (hero section)
      if (e.clientY <= window.innerHeight) {
        const rect = logoRef.current?.getBoundingClientRect();
        if (rect) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Calculate movement and rotation based on mouse position
          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;
          
          // Limit the movement range
          const maxMove = 15;
          const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX * 0.03));
          const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY * 0.03));
          
          // Calculate rotation (tilt towards cursor)
          const maxRotation = 20;
          const rotateX = Math.max(-maxRotation, Math.min(maxRotation, deltaY * -0.05));
          const rotateY = Math.max(-maxRotation, Math.min(maxRotation, deltaX * 0.05));
          
          setMousePosition({ x: moveX, y: moveY });
          setRotation({ x: rotateX, y: rotateY });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto"
    >
      <div
      ref={logoRef}
      className="relative transition-all duration-500 ease-out transform-gpu"
      style={{
        transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      >
      <div className="relative w-40 h-40 mx-auto mb-8">
        {/* Multiple neon glow layers */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-2xl opacity-50 animate-ping" style={{ animationDuration: '8s' }}></div>
        
        {/* Logo container with neon border */}
        <div className="relative w-full h-full rounded-full bg-gray-900/95 backdrop-blur-lg overflow-hidden" 
             style={{ 
               border: '6px solid transparent',
               background: 'linear-gradient(#111827, #111827) padding-box, linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #10b981) border-box'
             }}>
          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
            {/* TVLP Logo Image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/tvlp-logo.png"
                alt="TVLP Logo"
                className="w-36 h-36 object-contain drop-shadow-2xl filter brightness-110 contrast-105"
                style={{ display: 'block' }}
                onError={(e) => {
                  // If image fails to load, show fallback
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              
              {/* Fallback if image doesn't load */}
              <div className="w-full h-full items-center justify-center" style={{ display: 'none' }}>
                <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  TVLP
                </span>
              </div>
            </div>
            
            {/* Animated overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse" style={{ animationDuration: '5s' }}></div>
          </div>
        </div>
        
        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '15s' }}>
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-cyan-400/50 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/2 w-2.5 h-2.5 bg-purple-500 rounded-full transform translate-x-1/2 shadow-lg shadow-purple-500/50 animate-pulse"></div>
        </div>
        
        {/* Pulsing rings */}
        <div className="absolute -inset-4 rounded-full border border-cyan-400/30 animate-ping" style={{ animationDuration: '6s' }}></div>
        <div className="absolute -inset-6 rounded-full border border-purple-500/20 animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>
      </div>
      
      {/* Floating sparkles in wider area */}
      <FloatingSparkles containerRef={containerRef} />
    </div>
  );
};