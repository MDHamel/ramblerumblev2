import { useState, useEffect, useContext } from 'react';

import "./game.css";
import Message from '../component/message/message';
import { ControllerContext } from '../context';
import { GameBoard, Qwerty } from '../component/gameboard/gameboard';
import Timer from '../component/timer/timer';
import EndGame from '../component/endgame/endgame';


export default function Game() {
    const context = useContext(ControllerContext);
  
    useEffect(() => {
      const gametype = document.location.hash.split("/")[1];
      context.setTimedMode(gametype === "timed");
  
  
      return () => { }
    }, [])
  
    return (
      <div className="game">
        <Countdown />
        <main className='center'>
          <EndGame />
          <Message />
          <aside className='gameUI'>
            <Timer />
            <h1>Score:  {context.score}</h1>
          </aside>
          <GameBoard />
          <Qwerty />
        </main>
      </div>
    );
  }


  function Countdown(){
    const context = useContext(ControllerContext);
    const display = ["3", "2", "1", "GO!"]
    const [count, setCount] = useState(0);
    const [id, setId] = useState("countdown");
    const [hide, setHide] = useState("")

    const countdownHandler = () =>{
      setCount(prev=>prev+1)
      if(count+1 == display.length){
        setHide("hide");
        setId("hide")
        context.startGame();
      }
    };

    return(
      <div id={hide} className='back'>
        <h1  id={id } onAnimationIteration={countdownHandler}>{display[count]}</h1>
      </div>
    )
  }