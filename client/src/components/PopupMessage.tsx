import "../styles/popUpMessageStyle.css"

function PopupMessage({content}:{content: string}) {
  return (
    <div className="popup">{content}</div>
  );
}

export default PopupMessage;