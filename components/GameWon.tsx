import React from 'react'

interface GameWonProps {
  setIsGameWon: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameWon: React.FC<GameWonProps> = ({setIsGameWon}) => {
  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
      <p>Congratulations! You have won the game!</p>
      <button onClick={() => setIsGameWon(false)}>Start again</button>
    </div>
  )
}

export default GameWon