import companionCardProps from "../types/companionCardProps"
import "../styles/companionCardStyle.css"
import {useState,useRef} from "react"
import PopupMessage from '../components/PopupMessage';

const CompanionCard : React.FC<companionCardProps> = ({avatar, name, time, ph, wa, email}) => {

  
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  
  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const handleCopyClick = (text: string) => {
    setDisplayPopup(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setDisplayPopup(false);
    }, 2000);
  };

  return(
      <>
          
          <dialog className="contact-details" ref={dialogRef} onClose={closeModal}>
            {displayPopup && <PopupMessage content="Copied to clipboard!"/>}
              <div className="grid-container">
                <div className="grid-row">
                  <div className="contact-info-left">
                  <div className="medium">
                    <img src="/icons/telephone-call.png" alt="phone" />
                  </div>
                  <div className="contact-data">
                    {ph===""?"Not available":ph}
                  </div>
                  </div>
                  {ph!=="" &&
                  <button onClick={()=>handleCopyClick(ph)} className="copy-btn">
                    <img  src="/icons/copy.png" alt="copy" />
                  </button>
                  }
                </div>
                <div className="grid-row">
                <div className="contact-info-left">
                  <div className="medium">
                    <img src="/icons/whatsapp.png" alt="whatsapp" />
                  </div>
                  <div className="contact-data">
                    {wa===""?"Not available":wa}
                  </div>
                  </div>
                  {wa!=="" &&
                  <button onClick={()=>handleCopyClick(wa)} className="copy-btn">
                    <img  src="/icons/copy.png" alt="copy" />
                  </button>
                  }
                </div>
                <div className="grid-row">
                <div className="contact-info-left">
                  <div className="medium">
                    <img src="/icons/gmail.png" alt="email" />
                  </div>
                  <div className="contact-data">
                    {email===""?"Not available":email}
                  </div>
                  </div>
                  {email!=="" &&
                  <button onClick={()=>handleCopyClick(email)} className="copy-btn">
                    <img  src="/icons/copy.png" alt="copy" />
                  </button>
                  }
                </div>
                <div className="close-contact-btn">
                  <button className="red-text-btn" onClick={closeModal}>Close</button>
                </div>
              </div>
          </dialog>
              <div className="left">
                  <div className="avatar-frame">
                      <img src={avatar} alt="User Avatar" className="avatar" />
                  </div>
                  <div className="companion-card__name">{name}</div>
              </div>
              <div className="right">
                  <div>{time}</div>
                  <button className="contact-frame" onClick={openModal}>
                      <img src="/icons/contact.png" alt="contact-details" className="avatar" />
                  </button>
              </div>
      </>
  )
}

export default CompanionCard;