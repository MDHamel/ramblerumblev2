import { useEffect, useState, createContext } from "react";
import wordList from "./words.json";
import colorCheck from './misc/colorCheck';

const scoreLegend = [10, 8, 6, 4, 2, 1, -5];
const resetTimeout = 1250;
const gameTime = 300;

export const ControllerContext = createContext();

export function Controller(props) {
    const [index, setIndex] = useState(0);
    //indicator tells the user if they are right or wrong
    const [message, setMessage] = useState("")
    const [score, setScore] = useState(0);

    const [gameStarted, setGameStart] = useState(false);
    const [gameEnded, setGameEnd] = useState(false);

    const [words, setWords] = useState(Array(6).fill(""));

    const [tileColor, setColors] = useState(Array(6).fill(Array(5).fill("")));
    const [tileAnim, setAllTileAnim] = useState(["", "", "", "", ""]);
    const [rowAnim, setAllRowAnim] = useState(["", "", "", "", "", ""]);

    const [keyColors, setKeyColors] = useState({});
    const [isTimed, setTimedMode] = useState(false);

    const [disabled, setDisable] = useState(false);


    const allWords = [];
    wordList.everyword.map((val, i) => { allWords.push(val) });
    const commonWords = [];
    wordList.common.map((val, i) => { commonWords.push(val) });

    // const [ans, setAns] = useState("pizza");
    const [ans, setAns] = useState(wordList.common[Math.floor(Math.random() * commonWords.length)]);
    
    console.log(ans);
    console.log(index);

    const startGame = () =>{
        setGameStart(true);
    }

    const endGame = () =>{
        setGameEnd(true);
        setMessage("Game Over");
        
    }

    const updateGuess = (char) => {
        if (words[index].length < 5) {
            setWord(words[index]+char);
            //used to update the line after making changes
            setRowAnim("", index);
        } else {
            setRowAnim("shake", index);
        }
    };

    const setWord=(word, i=index)=>{
        setWords(temp => {temp[i] = word;return temp});
            
        
    }

    const backtrackGuess = () => {
        if (words[index].length > 0) {
            setWords(temp=>{temp[index]=temp[index].substring(0,temp[index].length-1);return temp});
            //used to update the line after making changes
        setRowAnim("", index);
        }
        else {
            setRowAnim("shake", index);
        }
    };

    const enter = () => {
        if(words[index].length < 5){
            setRowAnim("shake", index);
        }
        else if (wordList.everyword.includes(words[index].toLocaleLowerCase())) {

            

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
            setIndex(prev => prev + 1);

            if (colorRow.every(el => el === "green")) {
                setScore(prev => prev + scoreLegend[index]);
                setMessage(`Correct! +${scoreLegend[index]}`)
                setDisable(true);
                setTimeout(resetBoard, resetTimeout);
            }
            else if(index==5){
                if(isTimed){
                    setScore(prev => prev + scoreLegend[index+1]);
                    setMessage(`You Bust! ${scoreLegend[index+1]}`)
                    setTimeout(resetBoard, resetTimeout);
                }
                else{
                    
                    endGame();
                }
                    
            }
        }
        else {
            setRowAnim("shake", index);
            setMessage("Not in Word List");
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
        setIndex(0);

        //resets colors and words when tile rows are flipped over, at .5s the row is at the apex of the flip
        setTimeout(()=>{
            setAllTileAnim(Array(6).fill(""));
            setWords(Array(6).fill(""))
        }, 500)
        //after the full second, remove animation
        setTimeout(()=>{setAllRowAnim(Array(6).fill("")); setDisable(false)}, 1000)
        
        setColors(Array(6).fill(Array(5).fill("")));
        setKeyColors({});
        
        setAns(commonWords[Math.floor(Math.random() * commonWords.length)]);
    }

    var keylistener = (e) => {
        const key = e.key.toLowerCase();
        if(disabled){
            return
        }

        if (key === "enter") {
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
        if(gameStarted && !disabled && !gameEnded){
            window.addEventListener("keydown", keylistener);
        }        
        return () => { window.removeEventListener("keydown", keylistener);};
    }, [gameStarted, keylistener, disabled]);

    //end game clean up
    useEffect(()=>{
        if(gameEnded){
            window.removeEventListener("keydown", keylistener);
        }
            
    },[gameEnded])

    const clearMessage = ()=>{setMessage("")}

    

    const value = { updateGuess, backtrackGuess, enter, words, score, tileColor, tileAnim, rowAnim, keyColors, message, clearMessage, clearRowAnim, setTimedMode, startGame, endGame, gameStarted, gameEnded, isTimed }

    return (
        <ControllerContext.Provider value={value}>
            {props.children}
        </ControllerContext.Provider>
    )
}