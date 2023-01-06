import "./style.css";
import { useEffect, useState, useContext } from "react";
import { ControllerContext } from "../../context";
import Button from "../button/Button";

export default function EndGame() {
    const context = useContext(ControllerContext);

    const [revealed, setReveal] = useState("");

    const minutes = Math.floor(context.finalTime / 60);
    const seconds = context.finalTime % 60;

    useEffect(() => {
        if (context.gameEnded) {
            setReveal("reveal")
        }
        return () => { }
    }, [context.gameEnded]);


    return (
        <section className={'backing ' + revealed}>
            <aside className="plaque">
                <div className="row">
                    <h1>Score: {context.score}</h1>
                    <h1>High Score: { }</h1>
                </div>
                <div className="row">
                    <h1>Time: {minutes}:{seconds < 10 ? "0" + seconds : seconds}</h1>
                </div>
                <div className="row">
                    <h1>History: </h1>
                </div>
                <div className="history">
                    <span>{context.history}</span>
                </div>
                <div className="bottom">
                    <Button mod="small" onClick={() => document.location.reload()}>Play Again?</Button>
                    <Button mod="small" href="#">Main Menu</Button>
                </div>

            </aside>
        </section>
    )
}

export function HowToPlay(props) {
    const reveal = props.reveal;
    return (
        <section className={'backing ' + reveal} onClick={()=>{props.setState("")}}>
            <aside className="plaque" style={{height:"900px"}}>
                <h2>Ramble Rumble is a letter tile based word game. Type a word and press enter to check your guess against the answer. The tiles will then flip over to reveal how close your word was to the answer! Each tile has a specific meaning,</h2>
                <h2>🟩 Green tiles mean the the guessed letter is in the correct spot and you entered the correct number of that letter.</h2>
                <h2>🟦 Blue tiles mean that the guessed letter is in the right spot, but there is at least one more of that letter. So try using a word with multiple of that letter!</h2>
                <h2>🟨 Yellow tiles mean that the letter is in the word, but it isn't in the right spot.</h2>
                <h2>🟥 Red tiles are for letters that do not appear in the word, so try not using that letter in future guesses.</h2>
                <h2>There are two game modes currently: Timed trials and High Score. Timed trials has you try to guess as many words before time runs out. Meanwhile, high score focuses on you getting as many points before you bust! Points are determined on by how many attempts you took to get the word.</h2>

            </aside>
        </section>

    )
}