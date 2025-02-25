"use client"

import React, { useState, useEffect, useRef, use } from 'react';
import Player from './Player';
import Enemy from './Enemy';
import Bullet from './Bullet';
import LevelComplete from './LevelComplete';
import GameWon from './GameWon';
import WelcomeWindow from './WelcomeWindow';
import GameOver from './GameOver';

const GameScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftLifeRef = useRef<HTMLDivElement | null>(null);
  const middleLifeRef = useRef<HTMLDivElement | null>(null);
  const rightLifeRef = useRef<HTMLDivElement | null>(null);
  const [borderWidth, setBorderWidth] = useState<number>(8);
  const playerSize = 48;
  const enemySize = 48;
  const [level, setLevel] = useState<number>(1);
  const [isGameBeginning, setIsGameBeginning] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isLevelDone, setIsLevelDone] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [enemiesExistance, setEnemiesExistance] = useState<boolean[]>([true, true, true, true])
  const [collisionTime, setCollisionTime] = useState<number>(0);
  const [enemiesLives, setEnemiesLives] = useState<number[]>([3,3,3,3])
  const [playerLife, setPlayerLife] = useState<number>(3)
  const [enemiesColors, setEnemiesColors] = useState<string[]>(["bg-red-600", "bg-red-600", "bg-red-600", "bg-red-600"]);
  const step = 20;
  const shootDistance = 200;
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [enemiesPositions, setEnemiesPositions] = useState<({ x: number; y: number} | null)[]>([]);
  const [isShooting, setIsShooting] = useState<boolean>(false);
  const [movedUp, setMovedUp] = useState<boolean>(false);
  const [movedDown, setMovedDown] = useState<boolean>(false);
  const [movedLeft, setMovedLeft] = useState<boolean>(false);
  const [movedRight, setMovedRight] = useState<boolean>(false);
  const [bulletPosition, setBulletPosition] = useState<{ x: number; y: number } | null>(null);
  const [initialBulletPosition, setInitialBulletPosition] = useState<{ x: number; y: number } | null>(null);
  const [bulletDirection, setBulletDirection] = useState<{ x: number; y: number } | null>(null);

  // function bulletEnemyCollision() {
  //   return enemiesPositions.some((enemyPosition) => {
  //     if(!bulletPosition || !enemyPosition) return false; 
  //   return (
  //     bulletPosition.x <= enemyPosition.x + enemySize &&
  //     bulletPosition.x + 16 >= enemyPosition.x &&
  //     bulletPosition.y <= enemyPosition.y + enemySize &&
  //     bulletPosition.y + 16 >= enemyPosition.y
  //   )
  //   })
  // }

  function bulletEnemyCollision(enemyIndex: number) {
    if (!bulletPosition) return false;
  
    const enemyPosition = enemiesPositions[enemyIndex];
    if (!enemyPosition) return false;
  
    return (
      bulletPosition.x <= enemyPosition.x + enemySize &&
      bulletPosition.x + 16 >= enemyPosition.x &&
      bulletPosition.y <= enemyPosition.y + enemySize &&
      bulletPosition.y + 16 >= enemyPosition.y
    );
  }
  

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

    if (level === 1) {
      setEnemiesPositions([{x:0,y:0}])
      setEnemiesExistance([true, false, false, false])
      setEnemiesLives([3,3,3,3])
      setEnemiesColors(["bg-red-600","bg-red-600","bg-red-600","bg-red-600"])
      setPlayerLife(3)
    } else if (level === 2) {
      setEnemiesPositions([{x:0,y:0}, {x: offsetWidth - 2*borderWidth- enemySize , y:0}])
      setEnemiesExistance([true, true, false, false])
      setEnemiesLives([3,3,3,3])
      setEnemiesColors(["bg-red-600","bg-red-600","bg-red-600","bg-red-600"])
      setPlayerLife(3)
    } else if (level === 3) {
      setEnemiesPositions([{x:0,y:0}, {x: offsetWidth - 2*borderWidth- enemySize , y:0}, {x:0, y: offsetHeight - 2*borderWidth - enemySize}])
      setEnemiesExistance([true, true, true, false])
      setEnemiesLives([3,3,3,3])
      setEnemiesColors(["bg-red-600","bg-red-600","bg-red-600","bg-red-600"])
      setPlayerLife(3)
    } else if (level === 4) {
      setEnemiesPositions([
        {x: 0, y: 0}, 
        {x: offsetWidth - 2*borderWidth- enemySize , y:0},
        {x:0, y: offsetHeight - 2*borderWidth - enemySize},
        {x: offsetWidth - 2*borderWidth- enemySize, y: offsetHeight - 2*borderWidth - enemySize}
      ])
      setEnemiesExistance([true, true, true, true])
      setEnemiesLives([3,3,3,3])
      setEnemiesColors(["bg-red-600","bg-red-600","bg-red-600","bg-red-600"])
      setPlayerLife(3)
    }
    }
  }, [level]);

  useEffect(() => {
    if (enemiesExistance.every((val) => val === false)) {
      if (level === 1) {
        setLevel(2);
        setIsLevelDone(true);
    } else if (level === 2) {
      setLevel(3);
      setIsLevelDone(true);
    } else if (level === 3) {
      setLevel(4);
      setIsLevelDone(true);
    } else if (level === 4) {
      setLevel(1)
      setIsGameWon(true)
    }
    }
  }, [enemiesExistance])

  // function changeEnemyPosition() {
  //   if (!containerRef.current) return;
  //   const { offsetWidth, offsetHeight } = containerRef.current;
  //   setEnemyPosition((prev) => {
  //     if (!prev) return enemyPosition;

  //     let newX = prev.x;
  //     let newY = prev.y;

  //     if (prev.x - step >= 0 && prev.x + step <= offsetWidth - 16 -enemySize) {
  //       newX = Math.random() < 0.5 ? (prev.x + step) : (prev.x - step)
  //     } else if (prev.x - step < 0) {
  //       newX = prev.x + step;
  //     } else if (prev.x + step > offsetWidth - 16 -enemySize) {
  //       newX = prev.x - step;
  //     }

  //     if (prev.y - step >= 0 && prev.y + step <= offsetHeight - 16 - enemySize) {
  //       newY = Math.random() < 0.5 ? (prev.y + step) : (prev.y - step)
  //     } else if (prev.y - step < 0) {
  //       newY = prev.y + step;
  //     } else if (prev.y + step > offsetHeight - 16 -enemySize) {
  //       newY = prev.y - step;
  //     }

  //     return { x: newX, y: newY };
  //   })
  // }

  function changeEnemyPosition() {
    if (!containerRef.current) return;
    const { offsetWidth, offsetHeight } = containerRef.current;

    setEnemiesPositions((prev) => {
        if (!prev) return prev;

        return prev.map((enemy) => {

          if(!enemy) return null;
          
            let newX = enemy.x;
            let newY = enemy.y;

            if (enemy.x - step >= 0 && enemy.x + step <= offsetWidth - 16 - enemySize) {
                newX = Math.random() < 0.5 ? enemy.x + step : enemy.x - step;
            } else if (enemy.x - step < 0) {
                newX = enemy.x + step;
            } else if (enemy.x + step > offsetWidth - 16 - enemySize) {
                newX = enemy.x - step;
            }

            if (enemy.y - step >= 0 && enemy.y + step <= offsetHeight - 16 - enemySize) {
                newY = Math.random() < 0.5 ? enemy.y + step : enemy.y - step;
            } else if (enemy.y - step < 0) {
                newY = enemy.y + step;
            } else if (enemy.y + step > offsetHeight - 16 - enemySize) {
                newY = enemy.y - step;
            }

            return { x: newX, y: newY };
        });
    });
}

useEffect(() => {
  console.log(enemiesLives);
  console.log(enemiesColors);
}, [enemiesLives, enemiesColors]);

  useEffect(() => {
    const interval = setInterval(changeEnemyPosition, 500);
  
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

  // useEffect(() => {
  //   if (enemyLife === 2) {
  //     setEnemyColor("bg-blue-600");
  //   } else if (enemyLife === 1) {
  //     setEnemyColor("bg-green-600");
  //   } else if (enemyLife <= 0) {
  //     setEnemyExists(false);
  //   }
  // }, [enemyLife]);

  useEffect(() => {
    setEnemiesColors((prevColors) =>
      prevColors.map((color, index) => {
        if (enemiesLives[index] === 2) {
          return "bg-blue-600";
        } else if (enemiesLives[index] === 1) {
          return "bg-green-600";
        } else if (enemiesLives[index] <= 0) {
          enemiesPositions[index] = null;
          console.log(enemiesPositions);
          return "bg-red-100"; // Możesz ustawić pusty string lub inną klasę oznaczającą brak wroga
        }
        return color; // Jeśli życie się nie zmieniło, zachowaj dotychczasowy kolor
      })
    );
  
    setEnemiesExistance((prevEnemiesExistance) => {
      let newEnemiesExistance = [...prevEnemiesExistance];
      enemiesLives.map((enemyLife, index)=> {
        if (enemyLife <= 0) {
          newEnemiesExistance[index] = false;
        }
      })
      return newEnemiesExistance;
    }
    )
    
  }, [enemiesLives]);


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

      // if (enemiesPositions.some((_, index) => bulletEnemyCollision(index))) {
      //   // setEnemyLife(enemyLife - 1);
      //   setEnemiesLives((prevLives) =>
      //     prevLives.map((life, index) =>
      //       bulletEnemyCollision(index) ? life - 1 : life
      //     )
      //   );
      //   setIsShooting(false);
      //   setBulletPosition(null);
      //   setInitialBulletPosition(null);
        
      // }
      //   let i = 0;
      //  for (i = 0; i++; i<= 4) {
      //   if (bulletEnemyCollision(i)) {
      //     // setEnemiesLives((prevLives) => {
      //     //   const newLives = [...prevLives];
      //     //   newLives[index] = newLives[index] - 1;
      //     //   console.log(enemiesLives);
      //     //   console.log(enemiesColors);
      //     //   return newLives;
      //     // });
      //     setEnemiesLives((prevLives) => {
      //       console.log("Aktualizacja życia dla index:", i);
      //       // return prevLives.map((life, index) => 
      //       //   bulletEnemyCollision(index) && life > 0 ? life - 1 : life
      //       // );
      //       for (i = 0; i++; i<= 4) {

      //       }
      //     });
      //     setIsShooting(false);
      //     setBulletPosition(null);
      //     setInitialBulletPosition(null);
      //   }
      // };

      setEnemiesLives((prevLives) => {
        let newLives = [...prevLives];
        let updated = false;

        for(let i=0; i<=3; i++) {
          if(bulletEnemyCollision(i) && (!updated)) {
            newLives[i] = prevLives[i] - 0.5;
            updated = true;
            setIsShooting(false);
            setBulletPosition(null);
            setInitialBulletPosition(null);
            break;
          }
        }
        return newLives
      })

      // if (bulletEnemyCollision()) {
      //   setEnemyLife((prev) => {
      //     let newLife = prev - 1;
      //     if (newLife === 2) {
      //       setEnemyColor("bg-blue-600");
      //     } else if (newLife === 1) {
      //       setEnemyColor("bg-green-600");
      //     } else if (newLife === 0) {
      //       setEnemyExists(false);
      //     }
      //     return newLife;
      //   });
      //   setIsShooting(false);
      // }
      

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
  }, [isShooting, bulletPosition, initialBulletPosition, bulletDirection, enemiesLives]);

  function playerEnemyCollision() {
    return enemiesPositions.some((enemyPosition) => {
      if (!position || !enemyPosition) return false;
    return (
      position.x < enemyPosition.x + enemySize &&
      position.x + playerSize > enemyPosition.x &&
      position.y < enemyPosition.y + enemySize &&
      position.y + playerSize > enemyPosition.y
    );
    })
  }

  useEffect(() => {
    if (playerEnemyCollision() && collisionTime === 0 || 
        playerEnemyCollision() && (Date.now() - collisionTime > 2000)) {
      setCollisionTime(Date.now())
      setPlayerLife((prev) => Math.max(0, prev - 1))
    }
  }, [position, enemiesPositions])
  
  useEffect(() => {
    if(playerLife === 3) {
      if (rightLifeRef.current) rightLifeRef.current.style.display = "inline";
      if (middleLifeRef.current) middleLifeRef.current.style.display = "inline";
      if (leftLifeRef.current) leftLifeRef.current.style.display = "inline";
    } else if (playerLife === 2) {
      rightLifeRef.current!.style.display = "none";
    } else if (playerLife === 1) {
      middleLifeRef.current!.style.display = "none"
    } else if (playerLife === 0) {
      leftLifeRef.current!.style.display = "none"
      setIsGameOver(true);
      setEnemiesLives([3,3,3,3])
      setEnemiesColors(["bg-red-600","bg-red-600","bg-red-600","bg-red-600"])
      setPlayerLife(3)

      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setPosition({
          x: offsetWidth / 2 - playerSize / 2,
          y: offsetHeight / 2 - playerSize / 2,
        }); 
      

      if(level === 1 ) {
        setEnemiesPositions([{x:0,y:0}])
        setEnemiesExistance([true, false, false, false])
      } else if (level === 2) {
        setEnemiesPositions([{x:0,y:0}, {x: offsetWidth - 2*borderWidth- enemySize , y:0}])
        setEnemiesExistance([true, true, false, false])
      } else if (level === 3) {
        setEnemiesPositions([{x:0,y:0}, {x: offsetWidth - 2*borderWidth- enemySize , y:0}, {x:0, y: offsetHeight - 2*borderWidth - enemySize}])
        setEnemiesExistance([true, true, true, false])
      } else if (level === 4) {
        setEnemiesPositions([
          {x: 0, y: 0}, 
          {x: offsetWidth - 2*borderWidth- enemySize , y:0},
          {x:0, y: offsetHeight - 2*borderWidth - enemySize},
          {x: offsetWidth - 2*borderWidth- enemySize, y: offsetHeight - 2*borderWidth - enemySize}
        ])
        setEnemiesExistance([true, true, true, true])
      }

    }
      // setEnemiesPositions([{x:0,y:0}])
      // setEnemiesExistance([true, false, false, false])
      // setEnemiesLives([3,3,3,3])
      // setEnemiesColors(["bg-red-600","bg-red-600","bg-red-600","bg-red-600"])
      // setPlayerLife(3)
      // if (containerRef.current) {
      //   const { offsetWidth, offsetHeight } = containerRef.current;
      //   setPosition({
      //     x: offsetWidth / 2 - playerSize / 2,
      //     y: offsetHeight / 2 - playerSize / 2,
      //   });
      // }
    }
  }, [playerLife]);
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
      className={`w-[80vw] h-[80vh] bg-gray-400 border-${borderWidth} border-blue-300 relative`}
    >
      {isGameBeginning ? <WelcomeWindow setIsGameBeginning={setIsGameBeginning}/> :
      isLevelDone || isGameWon || isGameOver ? 
      isLevelDone ? <LevelComplete setIsLevelDone = {setIsLevelDone}/> : 
      isGameWon ? <GameWon setIsGameWon = {setIsGameWon}/> : <GameOver setIsGameOver={setIsGameOver}/> :
      <div>
      <div className='absolute left-[50%] -translate-x-1/2 top-[-4rem] flex gap-4'>
        <div ref={leftLifeRef} className='w-8 h-8 rounded-full bg-red-300'></div>
        <div ref={middleLifeRef} className='w-8 h-8 rounded-full bg-red-300'></div>
        <div ref={rightLifeRef} className='w-8 h-8 rounded-full bg-red-300'></div>
      </div>
      {position && <Player position={position} />}
      {enemiesExistance[0] && enemiesPositions[0] && <Enemy enemyPosition={enemiesPositions[0]} enemyColor={enemiesColors[0]}/>}
      {enemiesExistance[1] && enemiesPositions[1] && <Enemy enemyPosition={enemiesPositions[1]} enemyColor={enemiesColors[1]}/>}
      {enemiesExistance[2] && enemiesPositions[2] && <Enemy enemyPosition={enemiesPositions[2]} enemyColor={enemiesColors[2]}/>}
      {enemiesExistance[3] && enemiesPositions[3] && <Enemy enemyPosition={enemiesPositions[3]} enemyColor={enemiesColors[3]}/>}
      {isShooting && bulletPosition && <Bullet bulletPosition={bulletPosition} />}
      </div>}
      
    </div>
  );
};

export default GameScene;