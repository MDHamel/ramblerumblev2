import { ControllerContext } from '../../context';
import { useState, useEffect, useContext } from 'react';

const timedTime = 300;

export default function Timer() {
    const context = useContext(ControllerContext);

    const [time, setTime] = useState(-1);
    const [timer, setTimer] = useState(); //time update interval
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (context.isTimed && time < 0 && !context.gameEnded) {
        context.endGame();
    }

    useEffect(() => {
        if (context.gameStarted) {
            setTime(prev => prev + (context.isTimed ? -1 : 1))
            setTimer(setInterval(() => {
                if (!context.gameEnded)
                    setTime(prev => prev + (context.isTimed ? -1 : 1))
            }, 1000));
        }

        return () => { }
    }, [context.gameStarted])


    useEffect(()=>{
        
        setTime(context.isTimed ? timedTime : 0)
        return()=>{};
    }, [context.isTimed])

    useEffect(() => {
        context.setFinalTime(context.isTimed?timedTime:time);
        clearInterval(timer);
        return () => { clearInterval(timer); }
    }, [context.gameEnded])

    return (
        <h1>Time: {minutes}:{seconds < 10 ? "0" + seconds : seconds}</h1>
    )
}