import './App.css';
import Button from './component/button/Button';


export default function App() {

  console.log(document.location.origin);
  return (
    <div className='App'>
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
        <Button href="/timed">Timed Challenge</Button>
        <Button href="/hiscore">High Score</Button>
        
      </section>
      <div style={{ minHeight: "5vh" }} />
      <section className='row'>
        <Button>How to Play</Button>
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




