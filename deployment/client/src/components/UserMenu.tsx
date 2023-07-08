import '../styles/userMenuStyle.css'
import { useState, useRef } from 'react'
import getSubscriptionObject from '../utils/getSubscriptionObject'
import PopupMessage from './PopupMessage'
import updateContact from '../utils/updateContact'

export default function UserMenu({email, ph_no, wa_no}:{email:string, ph_no:string, wa_no:string}) {

    const [curr_ph_no, setCurr_ph_no] = useState<string>(ph_no);
    const [curr_wa_no, setCurr_wa_no] = useState<string>(wa_no);

    const [popupContent, setPopupContent] = useState<string>("");
    const [popupShown, setPopupShown] = useState<boolean>(false);
    const showPopup = () => {
        setPopupShown(true);
        setTimeout(() => setPopupShown(false), 3000);
    }

    const updateRef = useRef<HTMLDialogElement>(null);
    const openUpdateModal = () => {
        if (updateRef.current) {
            updateRef.current.showModal();
    }};
    const closeUpdateModal = () => {
        if (updateRef.current) {
            updateRef.current.close();
    }};

        
    const [notified, setNotified] = useState<boolean>(false);


    return(
        <>
        {popupShown && <PopupMessage content={popupContent} />}

        <dialog ref={updateRef}>
            <div className="modal-content">
            <div className="user-menu-title">Update Your Contact Details</div>
            <div className="user-menu-content_item">
                <img src="/icons/telephone-call.png" alt="phone-icon" />
                <input type="tel" value={curr_ph_no} placeholder='Phone Number' onChange={(e) => setCurr_ph_no(e.target.value)} required></input>
            </div>
            <div className="user-menu-content_item">
                <img src="/icons/whatsapp.png" alt="phone-icon" />
                <input type="tel" value={curr_wa_no} placeholder='WhatsApp Number' onChange={(e) => setCurr_wa_no(e.target.value)} required></input>
            </div>
            
            <div className="inline-buttons">
                <button className='red-text-btn' onClick={()=>{closeUpdateModal(); setCurr_ph_no(ph_no); setCurr_wa_no(wa_no);}}>Cancel</button>
                <button className='blue-text-btn' onClick={() => {
                    updateContact(email, curr_ph_no, curr_wa_no).then(() => {closeUpdateModal();setPopupContent("Trip Updated"); showPopup();})}
                }>Update</button>
            </div>
            </div>
        </dialog>

        <div className="user-menu">
            <div className="user-menu-title">Your Contact Details</div>
            <div className="user-menu-content_item">
                <img src="/icons/gmail.png" alt="email-icon" />
                {email}
            </div>
            <div className="user-menu-content_item">
                <img src="/icons/telephone-call.png" alt="phone-icon" />
                {curr_ph_no!==""?curr_ph_no:"Not Provided"}
            </div>
            <div className="user-menu-content_item">
                <img src="/icons/whatsapp.png" alt="whatsapp-icon" />
                {curr_wa_no!==""?curr_wa_no:"Not Provided"}
            </div>
            <div className="inline-buttons">
                <button className="blue-text-btn" onClick={openUpdateModal}>
                    <img src="/icons/edit-button.png" alt="edit-icon" />
                </button>
                <button className="red-text-btn" onClick={()=>{getSubscriptionObject(email).then(()=>{setPopupContent("You will be notified!"); setNotified(true); showPopup()})}}>
                    {notified?<img src="/icons/notification.png" alt="notification-icon" />
                            :<img src="/icons/bell-icon.png" alt="notification-icon" />}
                </button>
            </div>
        </div>
        </>
    )

}