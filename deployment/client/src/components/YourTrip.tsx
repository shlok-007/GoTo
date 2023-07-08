import {useState, useRef} from 'react'
import '../styles/yourTripStyle.css'
import updateTrip from '../utils/updateTrip';
import deleteTrip from '../utils/deleteTrip';
import getDateTime from '../utils/getDateTime';
import PopupMessage from './PopupMessage';
import { useNavigate } from 'react-router-dom';

export default function YourTrip({ destination, date, time, id, name }: { destination: string, date: string, time: string, id: string, name: string }) {
    const navigate = useNavigate();

    const [deleted, setDeleted] = useState(false);
    const [warningText, setWarningText] = useState("Are you sure you want to delete this trip?");
    const[updateText, setUpdateText] = useState("");
    const [newDate, setNewDate] = useState(date);
    const [newTime, setNewTime] = useState(time);
    const [popupContent, setPopupContent] = useState<string>("");

    const deleteRef = useRef<HTMLDialogElement>(null);
    const updateRef = useRef<HTMLDialogElement>(null);

    const openDeleteModal = () => {
        if (deleteRef.current) {
          deleteRef.current.showModal();
        }};
    const closeDeleteModal = () => {
    if (deleteRef.current) {
        deleteRef.current.close();
        }};
    const openUpdateModal = () => {
        setUpdateText("Update Your Trip");
        getDateTime().then((val)=>{
            if(typeof(val)!=='boolean'){
                setNewDate(val.date);
                setNewTime(val.time);
            }
        });
        if (updateRef.current) {
            updateRef.current.showModal();
        }};
    const closeUpdateModal = () => {
        if (updateRef.current) {
            updateRef.current.close();
        }};
    const [displayPopup, setDisplayPopup] = useState<boolean>(false);
    const showPopUp = () => {
        setDisplayPopup(true);
        setTimeout(() => {
        setDisplayPopup(false);
        }, 2000);
    };
    return (
        <>
      
        {displayPopup && <PopupMessage content={popupContent}/>}
            {!deleted ?
                <>
                <dialog ref={deleteRef}>
                    <div className="modal-content">
                    <div>{warningText}</div>
                    <div className="buttons">
                        <button className='blue-text-btn' onClick={(e)=>closeDeleteModal()}>No</button>
                        <button className='red-text-btn' onClick={() => {
                            setWarningText("Deleting...");
                            deleteTrip(id).then(() => {setWarningText("Deleted"); setDeleted(true); closeDeleteModal();setPopupContent("Trip Deleted"); showPopUp();})}
                        }>Yes</button>
                    </div>
                    </div>
                </dialog>
                <dialog ref={updateRef}>
                    <div className="modal-content">
                    <div>{updateText}</div>
                    <input className='date-time-ip' type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} min={newDate} required></input>
                    <input className='date-time-ip' type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} required></input>
                    <div className="buttons">
                        <button className='red-text-btn' onClick={()=>{closeUpdateModal(); setNewDate(date); setNewTime(time);}}>Cancel</button>
                        <button className='blue-text-btn' onClick={() => {
                            setUpdateText("Updating...");
                            updateTrip(id, newDate, newTime, destination, name).then(() => {setUpdateText("Updated"); closeUpdateModal();setPopupContent("Trip Updated"); showPopUp();})}
                        }>Update</button>
                    </div>
                    </div>
                </dialog>

                <div className="trip">
                    <div className="view">
                        <div className="dest">{destination}</div>
                        <div className="tripDate">{newDate}</div>
                        <div className="tripTime">{newTime}</div>
                    </div>
                    <div className="modify">
                        <button className="purple-icon-btn" onClick={()=>navigate(`/showCompanions/${destination}/${newDate}/${newTime}`)}><img src="/icons/magnifier.png" alt='search' className='icon-btn'/></button>
                        <button className="blue-icon-btn" onClick={openUpdateModal}><img src="/icons/edit-button.png" alt='modify' className='icon-btn'/></button>
                        <button className="red-icon-btn" onClick={openDeleteModal}><img src="/icons/delete.png" alt='delete' className='icon-btn'/></button>
                    </div>
                </div>
                </>
            : <></>}
        </>
    )
}