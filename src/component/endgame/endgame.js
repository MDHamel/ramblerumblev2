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
        <section className={'endGame ' + revealed}>
            <aside className="plaque">
                <div className="row">
                    <h1>Score: {context.score}</h1>
                    <h1>High Score: {}</h1>
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
                </div>
                    
            </aside>
        </section>
    )
}