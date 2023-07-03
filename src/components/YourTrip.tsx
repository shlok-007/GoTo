import {useState, useRef} from 'react'
import '../styles/yourTripStyle.css'
import updateTrip from '../utils/updateTrip';
import deleteTrip from '../utils/deleteTrip';
import getDateTime from '../utils/getDateTime';
import { useNavigate } from 'react-router-dom';

export default function YourTrip({ destination, date, time, id }: { destination: string, date: string, time: string, id: string }) {
    const navigate = useNavigate();

    const [deleted, setDeleted] = useState(false);
    const [warningText, setWarningText] = useState("Are you sure you want to delete this trip?");
    const[updateText, setUpdateText] = useState("Update Your Trip");
    const [newDate, setNewDate] = useState(date);
    const [newTime, setNewTime] = useState(time);

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
    return (
        <>
            {!deleted ?
                <>
                <dialog ref={deleteRef}>
                    <div className="modal-content">
                    <div>{warningText}</div>
                    <div className="buttons">
                        <button onClick={(e)=>closeDeleteModal()}>No</button>
                        <button onClick={() => {
                            setWarningText("Deleting...");
                            deleteTrip(id).then(() => {setWarningText("Deleted"); setDeleted(true); closeDeleteModal();})}
                        }>Yes</button>
                    </div>
                    </div>
                </dialog>
                <dialog ref={updateRef}>
                    <div className="modal-content">
                    <div>{updateText}</div>
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} min={newDate} required></input>
                    <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} required></input>
                    <div className="buttons">
                        <button onClick={()=>{closeUpdateModal(); setNewDate(date); setNewTime(time);}}>Cancel</button>
                        <button onClick={() => {
                            setUpdateText("Updating...");
                            updateTrip(id, newDate, newTime).then(() => {setUpdateText("Updated"); closeUpdateModal();})}
                        }>Update</button>
                    </div>
                    </div>
                </dialog>

                <div className="trip">
                    <div className="view">
                        <div className="dest">{destination}</div>
                        <div className="info">{newDate}</div>
                        <div className="info">{newTime}</div>
                    </div>
                    <div className="modify">
                        <button className="search" onClick={()=>navigate(`/showCompanions/${destination}/${newDate}/${newTime}`)}>S</button>
                        <button className="update-button" onClick={openUpdateModal}>U</button>
                        <button className="delete-button" onClick={openDeleteModal}>D</button>
                    </div>
                </div>
                </>
            : <></>}
        </>
    )
}