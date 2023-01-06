import { useState } from 'react';
import './App.css';
import Button from './component/button/Button';

import { HowToPlay } from './component/endgame/endgame';


export default function App() {
  const [showHowTo, setShow] = useState("");
  const onhowto = () =>{
    setShow("reveal quick")
  }

  return (
    <div className='App'>
      <HowToPlay reveal={showHowTo} setState={setShow} />
      <section className='row'>
        <BigTile color="green">r</BigTile>
        <BigTile color="green">a</BigTile>
        <BigTile color="green">m</BigTile>
        <BigTile color="green">b</BigTile>
        <BigTile color="green">l</BigTile>
        <BigTile color="green">e</BigTile>
      </section>
      <section className='row'>
        <BigTile color="yellow">r</BigTile>
        <BigTile color="green">u</BigTile>
        <BigTile color="blue">m</BigTile>
        <BigTile color="yellow">b</BigTile>
        <BigTile color="red">l</BigTile>
        <BigTile color="yellow">e</BigTile>
      </section>
      <div style={{ minHeight: "12vh" }} />
      <section className='row'>
        <Button href="/#/timed">Timed Challenge</Button>
        <Button href="/#/hiscore">High Score</Button>
        
      </section>
      <div style={{ minHeight: "5vh" }} />
      <section className='row'>
        <Button onClick={onhowto}>How to Play</Button>
      </section>
      
    </div>
  );
}



function BigTile(props) {
  const rand = Math.random() * 8 + "s";

  return (
    <div id={"big"} className={"tile"} key={props.key} style={{ "--color": `var(--${props.color})`, "--rand": rand }}>
      <span>{props.children}</span>
    </div>
  );
}




