import { useState } from 'react';
import "../styles/popUpMessageStyle.css"

function PopupMessage({content}:{content: string}) {
  const [displayed, setDisplayed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const showCopiedMessage = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  if(!displayed){
    setDisplayed(true);
    showCopiedMessage();
  }

  return (
    <div>
      {showPopup && <div className="popup">{content}</div>}
    </div>
  );
}

export default PopupMessage;