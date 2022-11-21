import "./test.css";
import { useState } from "react";


export default function Test(){

    const [message, setMessage] = useState("Test")

    return(
        <Message clearMessage={()=>{setMessage("")}}>{message}</Message>
    )
}


function Message(props){

    return(
        <div id={props.children?"reveal":""} className="toast" onAnimationEnd={props.clearMessage}>
            <h1>{props.children}</h1>
        </div>
    )
}