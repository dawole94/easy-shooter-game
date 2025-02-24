import React from 'react'

interface LevelCompleteProps {
  setIsLevelDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const LevelComplete: React.FC<LevelCompleteProps> = ({setIsLevelDone}) => {
  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
      <p>Level complete. Go to the next level.</p>
      <button onClick={() => setIsLevelDone(false)}>OK</button>
    </div>
  )
}

export default LevelComplete