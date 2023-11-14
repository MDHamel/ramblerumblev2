import { useState } from 'react';
import './App.css';


import { HowToPlay } from './component/endgame/endgame';


export default function App() {
  const [showHowTo, setShow] = useState("");
  const onhowto = () => {
    setShow("reveal quick")
  }

  return (
    <div className='App container position-relative my-0' style={{ minHeight: '100vh' }}>
      <HowToPlay reveal={showHowTo} setState={setShow} />
      <main className='d-flex flex-column justify-content-evenly' style={{ minHeight: '100vh' }}>
        <section className='mb-5 py-4'>
          <div className='d-flex justify-content-center'>
            <BigTile color="green">r</BigTile>
            <BigTile color="green">a</BigTile>
            <BigTile color="green">m</BigTile>
            <BigTile color="green">b</BigTile>
            <BigTile color="green">l</BigTile>
            <BigTile color="green">e</BigTile>
          </div>
          <div className='d-flex justify-content-center'>
            <BigTile color="yellow">r</BigTile>
            <BigTile color="green">u</BigTile>
            <BigTile color="blue">m</BigTile>
            <BigTile color="yellow">b</BigTile>
            <BigTile color="red">l</BigTile>
            <BigTile color="yellow">e</BigTile>
          </div>
          <p className=' position-absolute text-light text-end fs-1 fw-bold w-75 start-50 translate-middle-x'>Beta</p>
        </section>

        <div className='d-flex justify-content-evenly'>
          <a type='button' className='btn btn-lg btn-outline-light fw-bold text-center col-5 py-3' href='/timed'>Timed Trial</a>
          <a type='button' className='btn btn-lg btn-outline-light fw-bold text-center col-5 py-3' href="/hiscore">High Score</a>
        </div>

        <div className='d-flex justify-content-center'>
          <a type='button' className='btn btn-lg btn-outline-light fw-bold text-center col-5 py-3' onClick={onhowto}>How to Play</a>
        </div>
      </main>
    </div>
  );
}



function BigTile(props) {
  const rand = Math.random() * 8 + "s";

  return (
    <div id={"big"} className="tile display-4" key={props.key} style={{ "--color": `var(--${props.color})`, "--rand": rand }}>
      <span>{props.children}</span>
    </div>
  );
}




