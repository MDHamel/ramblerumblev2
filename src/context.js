import { useEffect, useState, createContext } from "react";
import wordList from "./words.json";
import colorCheck from './misc/colorCheck';

const scoreLegend = [10, 8, 6, 4, 2, 1];
const resetTimeout = 1250;

export const ControllerContext = createContext();

export function Controller(props) {
    const [index, setIndex] = useState(0);
    //indicator tells the user if they are right or wrong
    const [message, setMessage] = useState("")
    const [score, setScore] = useState(0);

    const [gameStarted, setGameStart] = useState(true);
    const [gameEnded, setGameEnd] = useState(false);

    const [words, setWords] = useState(Array(6).fill(""));
    const guess = words[index];

    const [tileColor, setColors] = useState(Array(6).fill(Array(5).fill("")));
    const [tileAnim, setAllTileAnim] = useState(["", "", "", "", ""]);
    const [rowAnim, setAllRowAnim] = useState(["", "", "", "", "", ""]);

    const [keyColors, setKeyColors] = useState({});

    const allWords = [];
    wordList.everyword.map((val, i) => { allWords.push(val.toLocaleUpperCase()) });
    const commonWords = [];
    wordList.common.map((val, i) => { commonWords.push(val.toLocaleUpperCase()) });


    // const [ans, setAns] = useState("pizza");
    const [ans, setAns] = useState(wordList.common[Math.floor(Math.random() * commonWords.length)]);
    
    console.log(ans)

    

    const updateGuess = (char) => {
        if (words[index].length < 5) {
            setWord(words[index]+char);
        } else {
            setRowAnim("shake", index);
        }
    };

    const setWord=(word, i=index)=>{
        let temp = [ ... words];
        temp[i] = word;
        setWords(temp);
    }

    const backtrackGuess = () => {
        if (guess.length > 0) {
            let temp =  [...words] 
            temp[index] = temp[index].substring(0, temp[index].length - 1)

            setWords(temp);
        }
        else {
            setRowAnim("shake", index);

        }
    };

    const enter = () => {
        
        if (wordList.everyword.includes(words[index].toLocaleLowerCase())) {
            //flip word
            let colorRow = colorCheck(ans, words[index].toLocaleLowerCase());
            let tempColors = [... tileColor];
            tempColors[index] = colorRow;

            setColors(tempColors);
            setTileAnim("tileFlip");

            let newKeyColors = { ...keyColors };
            Array.from(words[index]).map((l, i) => {
                if (!newKeyColors[l.toLowerCase()] || colorRow[i] === "green" || ((newKeyColors[l.toLowerCase()] === "yellow" || newKeyColors[l.toLowerCase()] === "red") && colorRow[i] === "blue") || (newKeyColors[l.toLowerCase()] === "red" && colorRow[i] === "yellow")) {
                    newKeyColors[l.toLowerCase()] = colorRow[i];
                }

            });

            setKeyColors(newKeyColors);
            setIndex(index + 1);

            if (colorRow.every(el => el === "green")) {
                setScore(prev => prev + scoreLegend[index]);
                setMessage(`Correct! +${scoreLegend[index]}`)
                setTimeout(resetBoard, resetTimeout);
            }
            else if(index==5){
                setMessage("gameOver")
            }
        }
        else {
            setRowAnim("shake", index);
            setMessage("Not in Word List")
        }
    }

    const clearRowAnim = () => {
        setAllRowAnim(Array(6).fill(""));

    }

    const setRowAnim = (anim, i) => {
        let temp = [...rowAnim];
        temp[i] = anim;
        setAllRowAnim(temp);
    }

    const setTileAnim = (anim) => {
    
        let temp = [... tileAnim];
        temp[index] = anim;
        setAllTileAnim(temp);
    }

    const resetBoard = () => {
        setAllRowAnim(Array(6).fill("flips"));

        //resets colors and words when tile rows are flipped over, at .5s the row is at the apex of the flip
        setTimeout(()=>{
            setAllTileAnim(Array(6).fill(""));
            setWords(Array(6).fill(""))
        }, 500)
        //after the full second, remove animation
        setTimeout(()=>{setAllRowAnim(Array(6).fill(""));}, 1000)
        
        setColors(Array(6).fill(Array(5).fill("")));
        setKeyColors({});
        setIndex(0);
        setAns(wordList.common[Math.floor(Math.random() * commonWords.length)]);
        

    }

    const keylistener = (e) => {
        const key = e.key.toLowerCase();
        

        if (key === "enter" && guess.length == 5) {
            enter();
        }
        else if (key === "backspace") {
            backtrackGuess();
        }
        else if (key.length == 1 && key.match("[a-z\s]+")) {
            updateGuess(key);
        }
        else {
            setRowAnim("shake", index)
        }
    };

    useEffect(() => {
        if (gameStarted) {
            window.addEventListener("keydown", keylistener);
        }

        return () => { window.removeEventListener("keydown", keylistener); };
    }, [updateGuess, backtrackGuess, enter]);

    const clearMessage = ()=>{setMessage("")}

    const value = { guess, updateGuess, backtrackGuess, enter, words, score, tileColor, tileAnim, rowAnim, keyColors, message, clearMessage, clearRowAnim }

    return (
        <ControllerContext.Provider value={value}>
            {props.children}
        </ControllerContext.Provider>
    )
}