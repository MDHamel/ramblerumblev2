import './App.css';
import { useState, useEffect } from 'react';
import wordList from "./words.json";
import colorCheck from './misc/colorCheck';
import Message from './component/message/message';

const scoreLegend = [10, 8, 6, 4, 2, 1];

export default function App() {
  const [index, setIndex] = useState(0);
  //indicator tells the user if they are right or wrong
  const [message, sendMessage] = useState("")
  const [score, setScore] = useState(0);

  const [gameStarted, setGameStart] = useState(true);
  const [gameEnded, setGameEnd] = useState(false);

  const [words, setWords] = useState([]);
  const [guess, setGuess] = useState("");
  const [colors, setColors] = useState([]);
  const [keyColors, setKeyColors] = useState({});
  const [rowAnim, setRowAnim] = useState(["","","","","",""]);

  const allWords = [];
  wordList.everyword.map((val, i) => { allWords.push(val.toLocaleUpperCase()) });
  const commonWords = [];
  wordList.common.map((val, i) => { commonWords.push(val.toLocaleUpperCase()) });

  // const [ans, setAns] = useState("daddy");
  const [ans, setAns] = useState(wordList.common[Math.floor(Math.random() * commonWords.length)]);
  console.log(ans)

  const updateGuess = (char) => {
    if (guess.length < 5) {
      setGuess(prev => prev + char);
    } else {
      // sendMessage("overflow");
      // updateIds(index, "shake");
    }
  };

  const backtrackGuess = () => {
    if (guess.length > 0) {
      setGuess(guess.substring(0, guess.length - 1));
    }
    else {
      // updateIds(index, "shake");
    }
  };

  const enter = () => {
    if (wordList.everyword.includes(guess.toLocaleLowerCase())) {
      //flip word
      let temp = [...words]
      temp.push(guess);
      setWords(temp)

      let colorRow = colorCheck(ans, guess.toLocaleLowerCase());
      setColors(prev => [...prev, colorRow]);

      let newKeyColors = { ...keyColors };
      Array.from(guess).map((l, i) => {
        if (!newKeyColors[l.toLowerCase()] || colorRow[i] === "green" || ((newKeyColors[l.toLowerCase()] === "yellow" || newKeyColors[l.toLowerCase()] === "red") && colorRow[i] === "blue") || (newKeyColors[l.toLowerCase()] === "red" && colorRow[i] === "yellow")) {
          newKeyColors[l.toLowerCase()] = colorRow[i];
        }

      });
      setKeyColors(newKeyColors);
      setGuess("");
      setIndex(prev => prev + 1);

      if (colorRow.every(el => el === "green")) {
        setScore(prev => prev + scoreLegend[index]);
        sendMessage(`Correct! +${scoreLegend[index]}`)
        setTimeout(resetBoard, 2000);
      }
      else if (index == 6) {
        setScore(prev => scoreLegend[index])
        setTimeout(resetBoard, 2000);
      }


    }
    else {
      setCurrentRowAnim("shake");
      sendMessage("Not in Word List")
    }
  }

  const clearRowAnim = (i)=>{
    let temp = [...rowAnim];
    temp[i] = "";
    setRowAnim(temp);
  }

  const setCurrentRowAnim = (anim) => {
    let temp = [...rowAnim];
    temp[index] = anim;
    setRowAnim(temp);
  }

  useEffect(() => {
    const keylistener = (e) => {
      const key = e.key.toUpperCase();
      console.log(key)

      //updateGuess(key);

      //console.log(allWords.includes(guess));

      if (key === "ENTER" && guess.length == 5) {
        enter();
        //console.log(colors);
      }
      if (key === "BACKSPACE") {
        backtrackGuess();
      }
      else if (key.length == 1 && key.match("[A-Z\s]+")) {
        updateGuess(key);
      }
      else {
        //updateIds(index, "shake");
      }
    };

    if (gameStarted) {
      const listener = window.addEventListener("keydown", keylistener);
    }

    return () => { window.removeEventListener("keydown", keylistener); };
  }, [words, guess]);

  const resetBoard = () => {
    setWords([]);
    setGuess("");
    setColors([]);
    setKeyColors({});
    setIndex(0);
    setAns(wordList.common[Math.floor(Math.random() * commonWords.length)]);
  }

  return (
    <div className="App">
      <main className='center'>
        <Message clearMessage={() => { sendMessage("") }}>{message}</Message>
        <h1>Score:  {score}</h1>
        <GameBoard  index={index} guess={guess} words={words} colors={colors} rowAnim={rowAnim} clearRowAnim={clearRowAnim}/>
        <Qwerty keyPress={updateGuess} enter={enter} back={backtrackGuess} keyColors={keyColors} />
      </main>

    </div>
  );
}

function Tile(props) {

  return (
    <div onClick={props.onClick} id={props.correct? "correct": props.color ? "tileFlip" : ""} className={"tile"} key={props.key} style={{ "--index": props.index, "--color": `var(--${props.color})` }}>
      <span>{props.children}</span>
    </div>
  );
}

function Key(props) {

  return (
    <div onClick={props.onClick} id={props.color ? props.color : ""} className={"tile mini"} key={props.key} style={{ "--index": props.index, fontSize: props.fontSize, "--widthmod": props.width ? props.width : 1 }}>
      <span>{props.children}</span>
    </div>
  );
}

function TileRow(props) {
  const word = props.word ? Array.from(props.word) : ["", "", "", "", ""];
  const colors = props.colors ? props.colors : ["", "", "", "", ""];
  const [colorState, setColorState] = useState(props.colors ? props.colors : null)

  return (
    <div id={props.rowAnim} className='tilerow' onAnimationEnd={props.onAnimationEnd}>
      {colors.map((color, index) => { return <Tile color={color} index={index}>{word[index]}</Tile> })}
    </div>
  )
}

function GameBoard(props) {
  const words = props.words;
  const index = props.index;
  const guess = props.guess;

  let display = [];
  for (let i = 0; i < 6; i++) {
    display.push(<TileRow rowAnim={props.rowAnim[i]} word={i === index ? guess : i < index ? words[i] : ""} colors={props.colors[i] ? props.colors[i] : ""} onAnimationEnd={()=>{props.clearRowAnim(i)}}/>);
  }

  return (
    <section id={props.anim?"flips":""} className='gameboard'>
      {display}
    </section>
  )
}


function Qwerty(props) {
  const update = props.keyPress;
  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ]

  return (
    <div className='qwerty'>
      <div className='tilerow'>
        {keys[0].map((item, index) => { return <Key color={props.keyColors[item] ? props.keyColors[item] : ""} onClick={() => { update(item) }} mini={true}>{item}</Key> })}
      </div>
      <div className='tilerow'>
        {keys[1].map((item, index) => { return <Key color={props.keyColors[item] ? props.keyColors[item] : ""} onClick={() => { update(item) }} mini={true}>{item}</Key> })}

      </div>
      <div className='tilerow'>
        <Key mini={true} width={2} fontSize="22px" onClick={props.enter}>Enter</Key>
        {keys[2].map((item, index) => { return <Key color={props.keyColors[item] ? props.keyColors[item] : ""} onClick={() => { update(item) }} mini={true}>{item}</Key> })}
        <Key mini={true} width={1.5} onClick={props.back}>⌫</Key>

      </div>
    </div>


  )
}