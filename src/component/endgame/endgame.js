import "./style.css";
import { useEffect, useState, useContext } from "react";
import { ControllerContext } from "../../context";

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
            <aside className="plaque col-md-4 col-10 d-flex flex-column  justify-content-center overflow-hidden">
                <div className="text-center d-flex justify-content-around mt-5 mb-4">
                    <h1 className="fs-4 w-50 text-center"><span className="fw-bold">Score</span><br className="mb-2"/>{context.score}</h1>
                    <h1 className="fs-4 w-50 text-center"><span className="fw-bold">High Score</span> <br className="mb-2"/>{ "XXX" }</h1>
                </div>
                <h1 className="text-center mb-4 fs-4"><span className="fw-bold">Time</span><br className="mb-2"/>{minutes}:{seconds < 10 ? "0" + seconds : seconds}</h1>
                <div className="history my-5 text-center fs-5">
                    <p className="">{context.history}</p>
                </div>
                <div className="d-flex justify-content-evenly my-5">
                    <button className='btn btn-lg btn-outline-light fw-bold text-center col-5 py-3' onClick={() => document.location.reload()}>Play Again</button>
                    <button className='btn btn-lg btn-outline-light fw-bold text-center col-5 py-3' href="#">Main Menu</button>
                </div>

            </aside>
        </section>
    )
}

export function HowToPlay(props) {
    const reveal = props.reveal;
    const headingClass = "fs-5 mt-3";
    return (
        <section className={'backing ' + reveal} onClick={()=>{props.setState("")}}>
            <aside className="col-md-4 col-11 plaque overflow-scroll py-3 px-5 bg-dark">
                <h2 className={headingClass + " text-center"}>Ramble Rumble is a letter tile based word game. Type a word and press enter to check your guess against the answer. The tiles will then flip over to reveal how close your word was to the answer! Each tile has a specific meaning,</h2>
                <h2 className={headingClass}>🟩 Green tiles mean the the guessed letter is in the correct spot and you entered the correct number of that letter.</h2>
                <h2 className={headingClass}>🟦 Blue tiles mean that the guessed letter is in the right spot, but there is at least one more of that letter. So try using a word with multiple of that letter!</h2>
                <h2 className={headingClass}>🟨 Yellow tiles mean that the letter is in the word, but it isn't in the right spot.</h2>
                <h2 className={headingClass}>🟥 Red tiles are for letters that do not appear in the word, so try not using that letter in future guesses.</h2>
                <h2 className={headingClass}><span className="fw-bold">Timed Trials</span> has you try to guess as many words before time runs out.</h2>
                <h2 className={headingClass}><span className="fw-bold">High Score</span> focuses on you getting as many points before you bust!</h2>
                <h2 className={headingClass}>Points are determined on by how many attempts you took to get the word.</h2>
                <h2 className={headingClass + " text-center fw-bolder my-3"}>Now you're ready to play, Good Luck and Have Fun!</h2>
            </aside>
        </section>

    )
}