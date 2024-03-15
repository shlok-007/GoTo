import loggedInPageProps from "../types/loggedInPageProps"
import React, {useState} from "react"
import "../styles/destinationSelectPageStyle.css"
import InfoCard from '../components/InfoCard';
// import PopupMessage from '../components/Toast';
import { useToast } from "../utils/ToastContext";

import {useNavigate} from 'react-router-dom';

import getDateTime from "../utils/getDateTime";
// import checkEntry from "../utils/checkEntry";
import addTravelDetail from "../utils/addTravelDetail";
import updateContact from "../utils/updateContact";
import getContact from "../utils/getContact";

import dateTimeInterface from "../types/dateTimeInterface";
// import findCompanions from "../utils/findCompanions";

const regex = /^(?:\+91|0)?[6789]\d{9}$/ ;

export default function DestinationSelect({profile}:loggedInPageProps){

  const navigate = useNavigate();

  const [dir, setDir] = useState<boolean>(false);
  const [destination, setDestination] = useState<string>("Select your Destination");
  const [date, setDate] = useState<string>("");
  const [serverDate, setServerDate] = useState<dateTimeInterface | boolean>(true);
  const [time, setTime] = useState<string>("");
  const [ph_no, setPh_no] = useState<string>("");
  const [wa_no, setWa_no] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isServerDown, setIsServerDown] = useState<boolean>(true);

  const handleDropdownVisibility = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let dropdown = document.querySelector("[data-dropdown]");
    if(dropdown){
      dropdown.classList.toggle("active");
    }
  }

  const handleDestinationSelection = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let dropdown = e.currentTarget.closest("[data-dropdown]");
    if(dropdown){
      dropdown.classList.toggle("active");
    }
    if(e.currentTarget.textContent)
      setDestination(e.currentTarget.textContent);
  }
  
  const placeList = ["DNR", "Khurda Station", "Bhubaneshwar", "Airport", "Puri", "NISER", "Esplanade"];


  if(serverDate===true && profile){
    getContact(profile.email).then((val)=>{
      if(val===false) setLoading(false);
      else if(typeof(val)!=='boolean'){
        setPh_no(val.ph_no);
        setWa_no(val.wa_no);
      }
    });

    getDateTime().then((val)=>{
      setServerDate(val); setLoading(false);
      if(typeof(val)!=='boolean'){
        setDate(val.date);
        setTime(val.time);
        setIsServerDown(false);}
    });
  }

  // const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  // const handleUnfilledDestination = () => {
  //   setDisplayPopup(true);
  //   setTimeout(() => {
  //     setDisplayPopup(false);
  //   }, 2000);
  // };

  const {showToast} = useToast();

  const onSearch = (destination:string, date: string) => {
    if( !placeList.includes(destination) ){
      // window.alert("Please select a destination");
      showToast("Please select a destination");
      return;
    }
    if(profile){
      //add a regex to check if the phone number and whatsapp number are valid

      if(!regex.test(ph_no) || !regex.test(wa_no)){
        showToast("Please enter a valid phone number and whatsapp number");
        return;
      }

      setLoading(true);
      updateContact(profile.email, ph_no, wa_no).then((val)=>{if(!val) {setLoading(false);  setIsServerDown(true);return;}});

      const travelDetail={
        email: profile.email,
        destination: destination,
        date: date,
        time: time,
        dir: dir,
        name: profile.name
      };

      addTravelDetail(travelDetail).then((val)=>{
        setLoading(false);  
        if(val){
          navigate(`/showCompanions/${destination}/${date}/${time}/${dir?"true":"false"}`);
        }
        else setIsServerDown(true);
      });
    }

    else window.alert("Please login to continue");
  }

  return(
    <>
      {loading && <InfoCard content='Loading...'/>}

      {!loading && isServerDown && <InfoCard content='Unable to connect to the server :_('/>}

      {!loading && !isServerDown && typeof(serverDate)!=='boolean' && (
        <>
          <InfoCard content={`So ${profile?.given_name}, where would you like to go today ?`} />
          {/* <div className="selection-list"> */}
          <div className="date-time">
            <input className="date-time-ip" type="date" onChange={(e)=>setDate(e.target.value)} value={date} min={serverDate.date} required/>
            <input className="date-time-ip" type="time" step="900" onChange={(e)=>setTime(e.target.value)} value={time.slice(0,5)} required/>
          </div>
          <div className="drop-wrap">
            <div className="icon-ip">
              <img src="/icons/telephone-call.png" alt="phone number" />
              <input className="contact-ip" type="tel" placeholder="Phone Number" onChange={(e)=>setPh_no(e.target.value)} value={ph_no} required/>
            </div>
            <div className="icon-ip">
              <img src="/icons/whatsapp.png" alt="whatsapp number" />
              <input className="contact-ip" type="tel" placeholder="WhatsApp Number" onChange={(e)=>setWa_no(e.target.value)} value={wa_no} required/>
            </div>
            <div className="icon-ip">
              <div className="checkbox-frame">
                <input type="checkbox" id="myCheckbox" onChange={(e)=> {
                  if(e.target.checked) setWa_no(ph_no)
                }} />
              </div>
              Same as phone number
            </div>

            <div className="dir-select">
              <div>
                <input type="radio" id="to" value="to" className="custom-radio" 
                onChange={()=>{setDir(false); if(!placeList.includes(destination)) setDestination("Select your Destination")}} 
                checked={!dir}/>
                <label htmlFor="to">To</label>
              </div>
              <div>
                <input type="radio" id="from" value="from" className="custom-radio" 
                onChange={()=>{setDir(true);  if(!placeList.includes(destination)) setDestination("Select your current location")}} 
                checked={dir}/>
                <label htmlFor="from">From</label>
              </div>
            </div>

            <div className="dropdown" data-dropdown>
              <button className="destination-selector-button" onClick={handleDropdownVisibility}>
                {destination}</button>
              <div className="dropdown-menu">
                <div className="dropdown-cities">
                  {placeList.map((place, index)=>{
                    return(
                      <button className="dropdown-item" key={index} onClick={handleDestinationSelection}>{place}</button>
                    )
                  })}
                </div>
              </div>
            </div>
            <button className="search-btn" onClick={()=>onSearch(destination,date)}>Find Companions</button>
          </div>
        </>
      )}
    </>
  )
}