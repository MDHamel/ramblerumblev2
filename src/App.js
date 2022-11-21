import logo from './logo.svg';
import './App.css';

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
        console.log(score);
        setTimeout(resetBoard, 2000);
      }
      else if (index == 6) {
        setScore(prev => scoreLegend[index])
        setTimeout(resetBoard, 2000);
      }


    }
    else {
      // updateIds(index, "shake");
      // sendMessage("Not in Word List")
    }
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
