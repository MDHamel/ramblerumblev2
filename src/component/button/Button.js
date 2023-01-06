import "./style.css"

export default function Button(props) {
    const onClick = props.onClick?props.onClick:()=>{document.location = document.location.origin + props.href; document.location.reload();};
    return (
        <div className={"button " + (props.mod?props.mod:"")} onClick={onClick}>
          <span>{props.children}</span>
        </div>
    )
  }