import companionCardProps from "../types/companionCardProps"
import "../styles/companionCardStyle.css"
import {useRef} from "react"
// import PopupMessage from './Toast';
import { useToast } from "../utils/ToastContext"

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

  const {showToast} = useToast();
  
  // const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const handleCopyClick = (text: string) => {
    // setDisplayPopup(true);
    navigator.clipboard.writeText(text);
    // setTimeout(() => {
    //   setDisplayPopup(false);
    // }, 2000);
    showToast("Copied to clipboard");
  };

  return(
      <>
          
          <dialog className="contact-details" ref={dialogRef} onClose={closeModal}>
              <div className="grid-container">
                <div className="grid-row">
                  <div className="contact-info-left">
                  <div className="medium">
                    <img src="/icons/telephone-call.png" alt="phone" />
                  </div>
                  <div className="contact-data">
                    {ph===""?"Not available":<a href={`tel:${ph}`}>{ph}</a>}
                  </div>
                  </div>
                  {ph!=="" &&
                  <button onClick={()=>handleCopyClick(ph)} className="blue-icon-btn">
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
                    {wa===""?"Not available":<a href={`tel:${wa}`}>{wa}</a>}
                  </div>
                  </div>
                  {wa!=="" &&
                  <button onClick={()=>handleCopyClick(wa)} className="blue-icon-btn">
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
                    {email===""?"Not available":<a href={`mailto : ${email}`}>{email}</a>}
                  </div>
                  </div>
                  {email!=="" &&
                  <button onClick={()=>handleCopyClick(email)} className="blue-icon-btn">
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
                  <button className="blue-icon-btn contact-frame" onClick={openModal}>
                      <img src="/icons/contact.png" alt="contact-details" className="contact-icon" />
                  </button>
              </div>
      </>
  )
}

export default CompanionCard;