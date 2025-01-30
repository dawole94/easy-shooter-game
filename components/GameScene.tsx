"use client"

import React, { useState, useEffect, useRef } from 'react';
import Player from './Player';

const GameScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerSize = 48;
  const step = 20;
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setPosition({
        x: offsetWidth / 2 - playerSize / 2,
        y: offsetHeight / 2 - playerSize / 2,
      });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      const { offsetWidth, offsetHeight } = containerRef.current;
      setPosition((prev) => {

        if (!prev) return position;
        
        let newX = prev.x;
        let newY = prev.y;

        switch (event.key) {
          case 'ArrowUp':
            newY = Math.max(0, prev.y - step);
            break;
          case 'ArrowDown':
            newY = Math.min(offsetHeight - 16 - playerSize, prev.y + step);
            break;
          case 'ArrowLeft':
            newX = Math.max(0, prev.x - step);
            break;
          case 'ArrowRight':
            newX = Math.min(offsetWidth - 16 - playerSize, prev.x + step);
            break;
          default:
            return prev;
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[80vw] h-[80vh] bg-gray-400 border-8 border-blue-300 relative"
    >
      {position && <Player position={position} />}
    </div>
  );
};

export default GameScene;