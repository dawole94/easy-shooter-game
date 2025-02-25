import React from 'react'

interface GameBeginningProps {
  setIsGameBeginning: React.Dispatch<React.SetStateAction<boolean>>;
}

const WelcomeWindow: React.FC<GameBeginningProps> = ({setIsGameBeginning}) => {
  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
      <p className='text-center'>Welcom to the shooter game. Your goal is to eliminate all the enemies. Move with arrows and shoot with the spacebar. Good luck! </p>
      <button className='bg-blue-300 py-2 rounded-full font-bold' onClick={() => setIsGameBeginning(false)}>Start game</button>
    </div>
  )
}

export default WelcomeWindow