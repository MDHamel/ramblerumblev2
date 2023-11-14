import { useContext } from "react";
import { ControllerContext } from "../../context";
import "./style.css"

export default function Message(props){
  const context = useContext(ControllerContext);




    return(
        <div id={context.message?"reveal":""} className="msg" onAnimationEnd={context.clearMessage}>
            <h1>{context.message}</h1>
        </div>
    )
}