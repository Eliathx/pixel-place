import { useState, useEffect } from 'react';

import PixelArtCanvas from "../components/PixelBoard/PixelBoard";
import GameHeader from "../components/GameHeader/GameHeader";

const Game = ({username}) => {
    const [canDraw, setCanDraw] = useState(false);
    const [timeLeft, setTimeLeft] = useState(2); 

    useEffect(() => {
    if (timeLeft === 0) {
        setCanDraw(true); 
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
        return () => clearInterval(timer); 
    }, [timeLeft]);

    const handlePixelPlaced = () => {
      setCanDraw(false); 
      setTimeLeft(2); 
    };
  
    return (
      <div className="gameContainer">
        <GameHeader timeLeft={timeLeft} username={username}/>
        <PixelArtCanvas canDraw={canDraw} onPixelPlaced={handlePixelPlaced} username={username}/>
      </div>
    );
  };

export default Game;
