import "./style.css"

export default function Message(props){

    return(
        <div id={props.children?"reveal":""} className="toast" onAnimationEnd={props.clearMessage}>
            <h1>{props.children}</h1>
        </div>
    )
}