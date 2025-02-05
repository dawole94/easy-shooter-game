import React from 'react'

interface BulletProps {
  bulletPosition: { x: number; y: number };
}

const Bullet: React.FC<BulletProps> = ({bulletPosition}) => {
  return (
    <div className='w-4 h-4 rounded-full bg-blue-700 absolute'
    style={{
      left: `${bulletPosition.x}px`,
      top: `${bulletPosition.y}px`,
      transition: 'top 0.1s, left 0.1s',
    }}></div>
  )
}

export default Bullet