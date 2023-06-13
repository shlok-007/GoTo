import companionCardProps from "../types/companionCardProps"
import "../styles/companionCardStyle.css"
import {useState, useRef} from "react"

const CompanionCard : React.FC<companionCardProps> = ({avatar, name, time, ph, wa, email}) => {
    // const modal = document.querySelector('[data-modal]');


    
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = () => {
    //   setIsModalOpen(true);
    // };
  
    // const closeModal = () => {
    //   setIsModalOpen(false);
    // };

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
            <dialog ref={dialogRef} onClose={closeModal}>
                <div>{ph}</div>
                <div>{wa}</div>
                <div>{email}</div>
                <button onClick={closeModal}>Close</button>
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
                        <img src="/icons/contact_icon.png" alt="User Avatar" className="avatar" />
                    </button>
                </div>
        </>
    )
}

export default CompanionCard;