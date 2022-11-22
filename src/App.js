import './App.css';
import { useState, useEffect, useContext } from 'react';

import Message from './component/message/message';
import { ControllerContext } from './context';


export default function App() {
  const context = useContext(ControllerContext);

  return (
    <div className="App">
      <main className='center'>
        <Message />
        <h1>Score:  {context.score}</h1>
        <GameBoard  />
        <Qwerty />
      </main>

    </div>
  );
}

function Tile(props) {
  const context = useContext(ControllerContext);

  return (
    <div id={context.tileAnim[props.rowIndex]} className={"tile"} key={props.key} style={{ "--index": props.index, "--color": `var(--${context.tileColor[props.rowIndex][props.index]})` }}>
      <span>{context.words[props.rowIndex]?context.words[props.rowIndex].charAt(props.index):""}</span>
    </div>
  );
}

function Key(props) {
  const context = useContext(ControllerContext);
  return (
    <div onClick={props.onClick} id={context.keyColors[props.children]} className={"tile mini"} key={props.key} style={{ "--index": props.index, fontSize: props.fontSize, "--widthmod": props.width ? props.width : 1 }}>
      <span>{props.children}</span>
    </div>
  );
}

function TileRow(props) {
  const context = useContext(ControllerContext);
  const index = props.index;

  const word = context.words[props.index] ? Array.from(props.word) : ["", "", "", "", ""];

  let display = [];

  for(let i = 0; i < 5; i++){
    display.push(<Tile rowIndex={index} index={i}>{word[i]?word[i]:""}</Tile>);
  }

  return (
    <div id={context.rowAnim[index]} className='tilerow' style={{ "--index": index}} onAnimationEnd={()=>{context.clearRowAnim()}}>
      {display}
    </div>
  )
}

function GameBoard(props) {
  const context = useContext(ControllerContext);

  const words = context.words;
  const index = context.index;
  const guess = context.guess;

  let display = [];
  for (let i = 0; i < 6; i++) {
    display.push(<TileRow index={i} rowAnim={context.rowAnim[i]} word={i === index ? guess : i < index ? words[i] : ""} />);
  }

  return (
    <section id={props.anim?"flips":""} className='gameboard'>
      {display}
    </section>
  )
}


function Qwerty() {
  const context = useContext(ControllerContext);

  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ]

  return (
    <div className='qwerty'>
      <div className='tilerow'>
        {keys[0].map((item, index) => { return <Key color={context.keyColors[item] ? context.keyColors[item] : ""} onClick={() => { context.updateGuess(item) }} mini={true}>{item}</Key> })}
      </div>
      <div className='tilerow'>
        {keys[1].map((item, index) => { return <Key color={context.keyColors[item] ? context.keyColors[item] : ""} onClick={() => { context.updateGuess(item) }} mini={true}>{item}</Key> })}

      </div>
      <div className='tilerow'>
        <Key mini={true} width={2} fontSize="22px" onClick={context.enter}>Enter</Key>
        {keys[2].map((item, index) => { return <Key color={context.keyColors[item] ? context.keyColors[item] : ""} onClick={() => { context.updateGuess(item) }} mini={true}>{item}</Key> })}
        <Key mini={true} width={1.5} onClick={context.backtrackGuess}>⌫</Key>

      </div>
    </div>


  )
}