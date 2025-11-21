import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingSparklesProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const FloatingSparkles: React.FC<FloatingSparklesProps> = ({ containerRef }) => {
  const [sparkles, setSparkles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      rotation: number;
      opacity: number;
      isValid: boolean;
    }>
  >([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Учитываем prefers-reduced-motion (важно для iOS / macOS)
  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsReducedMotion(e.matches);
    };

    update(mq);

    if ('addEventListener' in mq) {
      mq.addEventListener('change', update as any);
      return () => mq.removeEventListener('change', update as any);
    } else {
      // старые Safari
      // @ts-ignore
      mq.addListener(update);
      return () => {
        // @ts-ignore
        mq.removeListener(update);
      };
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (isReducedMotion) {
      // При сниженной анимации создаём пару статичных искр и останавливаемся
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      const createStaticSparkle = () => {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;

        return {
          id: Date.now() + Math.random(),
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          size: Math.random() * 10 + 6,
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.5 + 0.3,
          isValid: true,
        };
      };

      setSparkles([createStaticSparkle(), createStaticSparkle()]);
      return;
    }

    const createSparkle = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      let attempts = 0;
      let validPosition = false;
      let x = 0;
      let y = 0;

      while (!validPosition && attempts < 20) {
        x = Math.random() * (containerRect.width + 400) - 200;
        y = Math.random() * (containerRect.height + 200) - 100;

        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );

        if (distance > 100) {
          validPosition = true;
        }
        attempts++;
      }

      if (!validPosition) return;

      const newSparkle = {
        id: Date.now() + Math.random(),
        x: (x / containerRect.width) * 100,
        y: (y / containerRect.height) * 100,
        size: Math.random() * 16 + 8, // 8–24px
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.8 + 0.2,
        isValid: true,
      };

      setSparkles((prev) => [...prev.slice(-4), newSparkle]); // максимум 5 искр
    };

    const interval = setInterval(createSparkle, 3000);
    return () => clearInterval(interval);
  }, [containerRef, isReducedMotion]);

  useEffect(() => {
    if (isReducedMotion) return; // статика — без автоудаления

    const cleanup = setInterval(() => {
      setSparkles((prev) => prev.filter((sparkle) => Date.now() - sparkle.id < 6000));
    }, 1000);
    return () => clearInterval(cleanup);
  }, [isReducedMotion]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
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
            filter: 'drop-shadow(0 0 4px rgba(255, 193, 7, 0.6))',
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

  // Мягкий параллакс только на устройствах с мышью и при нормальной анимации
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasFinePointer =
      'matchMedia' in window && window.matchMedia('(pointer: fine)').matches;
    const prefersReduced =
      'matchMedia' in window &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReduced) {
      // Мобильные / iOS — статичный логотип без тяжёлых mousemove
      return;
    }

    let frameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;

      // Обрабатываем только верхнюю часть (hero)
      if (e.clientY > window.innerHeight) return;

      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const maxMove = 15;
      const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX * 0.03));
      const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY * 0.03));

      const maxRotation = 20;
      const rotateX = Math.max(
        -maxRotation,
        Math.min(maxRotation, deltaY * -0.05)
      );
      const rotateY = Math.max(
        -maxRotation,
        Math.min(maxRotation, deltaX * 0.05)
      );

      if (frameId) cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        setMousePosition({ x: moveX, y: moveY });
        setRotation({ x: rotateX, y: rotateY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      <div
        ref={logoRef}
        className="relative transform-gpu transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Multiple neon glow layers */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-3xl opacity-70 animate-pulse"
            style={{ animationDuration: '6s' }}
          />
          <div
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-2xl opacity-50 animate-ping"
            style={{ animationDuration: '8s' }}
          />

          {/* Logo container with neon border */}
          <div
            className="relative w-full h-full rounded-full bg-gray-900/95 backdrop-blur-lg overflow-hidden"
            style={{
              border: '6px solid transparent',
              background:
                'linear-gradient(#111827, #111827) padding-box, linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #10b981) border-box',
            }}
          >
            <div className="relative w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
              {/* TVLP Logo Image */}
              <div className="flex w-full h-full items-center justify-center">
                <img
                  src="/tvlp-logo.png"
                  alt="TVLP Logo"
                  className="w-36 h-36 object-contain drop-shadow-2xl filter brightness-110 contrast-105"
                  style={{ display: 'block' }}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />

                {/* Fallback if image doesn't load */}
                <div
                  className="hidden w-full h-full items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    TVLP
                  </span>
                </div>
              </div>

              {/* Animated overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse"
                style={{ animationDuration: '5s' }}
              />
            </div>
          </div>

          {/* Orbiting particles */}
          <div
            className="absolute inset-0 animate-spin-slow"
            style={{ animationDuration: '15s' }}
            aria-hidden="true"
          >
            <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 transform rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse" />
            <div className="absolute bottom-0 right-1/2 w-2.5 h-2.5 translate-x-1/2 transform rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 animate-pulse" />
          </div>

          {/* Pulsing rings */}
          <div
            className="absolute -inset-4 rounded-full border border-cyan-400/30 animate-ping"
            style={{ animationDuration: '6s' }}
            aria-hidden="true"
          />
          <div
            className="absolute -inset-6 rounded-full border border-purple-500/20 animate-pulse"
            style={{ animationDuration: '8s' }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Floating sparkles in wider area */}
      <FloatingSparkles containerRef={containerRef} />
    </div>
  );
};
