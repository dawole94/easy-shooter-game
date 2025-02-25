import React from 'react'

interface GameOverProps {
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameOver: React.FC<GameOverProps> = ({setIsGameOver}) => {
  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
      <p className='text-center'>Enemies hit you tree times. Game over.</p>
      <button className='bg-blue-300 py-2 rounded-full font-bold' onClick={() =>  setIsGameOver(false) }>Start again</button>
    </div>
  )
}

export default GameOver