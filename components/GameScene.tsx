"use client"

import React, { useState, useEffect, useRef, use } from 'react';
import Player from './Player';
import Enemy from './Enemy';
import Bullet from './Bullet';

const GameScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerSize = 48;
  const enemySize = 48;
  const step = 20;
  const shootDistance = 200;
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [enemyPosition, setEnemyPosition] = useState<{ x: number; y: number } | null>(null);
  const [isShooting, setIsShooting] = useState<boolean>(false);
  const [movedUp, setMovedUp] = useState<boolean>(false);
  const [movedDown, setMovedDown] = useState<boolean>(false);
  const [movedLeft, setMovedLeft] = useState<boolean>(false);
  const [movedRight, setMovedRight] = useState<boolean>(false);
  const [bulletPosition, setBulletPosition] = useState<{ x: number; y: number } | null>(null);
  const [initialBulletPosition, setInitialBulletPosition] = useState<{ x: number; y: number } | null>(null);
  const [bulletDirection, setBulletDirection] = useState<{ x: number; y: number } | null>(null);

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
          setMovedUp(true);
          setMovedDown(false);
          setMovedLeft(false);
          setMovedRight(false);
          break;
        case 'ArrowDown':
          newY = Math.min(offsetHeight - 16 - playerSize, prev.y + step);
          setMovedUp(false);
          setMovedDown(true);
          setMovedLeft(false);
          setMovedRight(false);
          break;
        case 'ArrowLeft':
          newX = Math.max(0, prev.x - step);
          setMovedUp(false);
          setMovedDown(false);
          setMovedLeft(true);
          setMovedRight(false);
          break;
        case 'ArrowRight':
          newX = Math.min(offsetWidth - 16 - playerSize, prev.x + step);
          setMovedUp(false);
          setMovedDown(false);
          setMovedLeft(false);
          setMovedRight(true);
          break;
        default:
          return prev;
      }

      return { x: newX, y: newY };
    });
  };

  const shoot = (event: KeyboardEvent) => {
    if (!containerRef.current || !position || isShooting) return;

    let direction = { x: 0, y: 0 };
      if (movedUp) direction = { x: 0, y: -1 };
      if (movedDown) direction = { x: 0, y: 1 };
      if (movedLeft) direction = { x: -1, y: 0 };
      if (movedRight) direction = { x: 1, y: 0 };

      setBulletDirection(direction);

    if (event.key === " ") {
      if (direction.x === 0 && direction.y === 0) return;
      setInitialBulletPosition({
        x: position.x + playerSize / 2 - 8,
        y: position.y + playerSize / 2 - 8,
      });
      setIsShooting(true);
    }

      
    }

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
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", shoot);
  
    return () => {
      window.removeEventListener("keydown", shoot);
    };
  }, [position, isShooting]);

  


  useEffect(() => {
    if(initialBulletPosition) {
      setBulletPosition(initialBulletPosition)
    }
  }, [initialBulletPosition])

  useEffect(() => {
    if (!isShooting || !bulletPosition || !initialBulletPosition || !bulletDirection) return;
  
    const interval = setInterval(() => {
      setBulletPosition((prev) => {
        if (!prev) return null;
        
        let newX = prev.x + bulletDirection.x * step;
        let newY = prev.y + bulletDirection.y * step;

        if (!containerRef.current) return null;
      const { offsetWidth, offsetHeight } = containerRef.current;

      if (
        newX < -20 || newX > offsetWidth - 16 ||
        newY < -20 || newY > offsetHeight - 6
      ) {
        setIsShooting(false);
        return null;
      }

      if (
        Math.abs(newX - initialBulletPosition.x) > shootDistance ||
        Math.abs(newY - initialBulletPosition.y) > shootDistance
      ) {
        setIsShooting(false);
        return null;
      }


  
        return { x: newX, y: newY };
      });
    }, 50);
  
    return () => clearInterval(interval);
  }, [isShooting, bulletPosition, initialBulletPosition, bulletDirection]);
  
  // useEffect(() => {
  //   if (!bulletPosition) return;
    
  //   if (
  //     bulletPosition.x < 0 ||
  //     bulletPosition.x > containerRef.current?.offsetWidth ||
  //     bulletPosition.y < 0 ||
  //     bulletPosition.y > containerRef.current?.offsetHeight
  //   ) {
  //     setIsShooting(false);
  //     setBulletPosition(null);
  //   }
  // }, [bulletPosition]);

  return (
    <div
      ref={containerRef}
      className="w-[80vw] h-[80vh] bg-gray-400 border-8 border-blue-300 relative"
    >
      {position && <Player position={position} />}
      {enemyPosition && <Enemy enemyPosition={enemyPosition}/>}
      {isShooting && bulletPosition && <Bullet bulletPosition={bulletPosition} />}
    </div>
  );
};

export default GameScene;