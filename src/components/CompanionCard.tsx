import companionCardProps from "../types/companionCardProps"
import "../styles/companionCardStyle.css"
import {useRef} from "react"

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

  return(
      <>
          <dialog className="contact-details" ref={dialogRef} onClose={closeModal}>
              <div className="grid-container">
                <div className="grid-row">
                  <div className="medium">
                    <img src="/icons/telephone-call.png" alt="phone" />
                  </div>
                  <div className="contact-data">
                    {ph===""?"Not available":ph}
                  </div>
                  <button className="copy-btn">
                    <img src="/icons/copy.png" alt="copy" />
                  </button>
                </div>
                <div className="grid-row">
                  <div className="medium">
                    <img src="/icons/whatsapp.png" alt="whatsapp" />
                  </div>
                  <div className="contact-data">
                    {wa===""?"Not available":wa}
                  </div>
                  <button className="copy-btn">
                    <img src="/icons/copy.png" alt="copy" />
                  </button>
                </div>
                <div className="grid-row">
                  <div className="medium">
                    <img src="/icons/gmail.png" alt="email" />
                  </div>
                  <div className="contact-data">
                    {email===""?"Not available":email}
                  </div>
                  <button className="copy-btn">
                    <img src="/icons/copy.png" alt="copy" />
                  </button>
                </div>
                <div className="close-contact-btn">
                  <button  onClick={closeModal}>Close</button>
                </div>
              </div>
              {/* <div>{ph==""?"Not available":ph}</div>
              <div>{wa==""?"Not available":wa}</div>
              <div>{email==""?"Not available":email}</div>
              <button onClick={closeModal}>Close</button> */}
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
                      <img src="/icons/contact.png" alt="User Avatar" className="avatar" />
                  </button>
              </div>
      </>
  )
}

export default CompanionCard;