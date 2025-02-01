"use client"

import React, { useState, useEffect, useRef } from 'react';
import Player from './Player';
import Enemy from './Enemy';

const GameScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerSize = 48;
  const enemySize = 48;
  const step = 20;
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [enemyPosition, setEnemyPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setPosition({
        x: offsetWidth / 2 - playerSize / 2,
        y: offsetHeight / 2 - playerSize / 2,
      });
      setEnemyPosition({
        x: 0,
        y: 0,
      })
    }
  }, []);

  function changeEnemyPosition() {
    if (!containerRef.current) return;
    const { offsetWidth, offsetHeight } = containerRef.current;
    setEnemyPosition((prev) => {
      if (!prev) return enemyPosition;

      let newX = prev.x;
      let newY = prev.y;

      if (prev.x - step >= 0 && prev.x + step <= offsetWidth - 16 -enemySize) {
        newX = Math.random() < 0.5 ? (prev.x + step) : (prev.x - step)
      } else if (prev.x - step < 0) {
        newX = prev.x + step;
      } else if (prev.x + step > offsetWidth - 16 -enemySize) {
        newX = prev.x - step;
      }

      if (prev.y - step >= 0 && prev.y + step <= offsetHeight - 16 - enemySize) {
        newY = Math.random() < 0.5 ? (prev.y + step) : (prev.y - step)
      } else if (prev.y - step < 0) {
        newY = prev.y + step;
      } else if (prev.y + step > offsetHeight - 16 -enemySize) {
        newY = prev.y - step;
      }

      return { x: newX, y: newY };
    })
  }

  useEffect(() => {
    const interval = setInterval(changeEnemyPosition, 10);
  
    return () => clearInterval(interval); // Zatrzymanie po unmount
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
      {enemyPosition && <Enemy enemyPosition={enemyPosition}/>}
    </div>
  );
};

export default GameScene;