import React from 'react'

interface EnemyProps {
  enemyPosition : {x: number, y: number},
  enemyColor : string
}

const Enemy: React.FC<EnemyProps> = ({enemyPosition, enemyColor}) => {
  return (
    <div 
    className={`w-12 h-12 rounded-tl-full rounded-tr-full ${enemyColor} absolute`}
    style={{
        left: `${enemyPosition.x}px`,
        top: `${enemyPosition.y}px`,
        transition: 'top 0.1s, left 0.1s',
    }}>
    </div>
  )
}

export default Enemy