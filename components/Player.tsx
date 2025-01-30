import React from 'react';

interface PlayerProps {
  position: { x: number; y: number };
}

const Player: React.FC<PlayerProps> = ({ position }) => {
  return (
    <div
      className="w-12 h-12 rounded-full bg-yellow-300 absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'top 0.1s, left 0.1s',
      }}
    ></div>
  );
};

export default Player;
