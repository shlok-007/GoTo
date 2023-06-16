import loggedInPageProps from "../types/loggedInPageProps"
import React, {useState} from "react"
import "../styles/destinationSelectPageStyle.css"
import InfoCard from '../components/InfoCard';
import {useNavigate} from 'react-router-dom';
import getDateTime from "../utils/getDateTime";
import dateTimeInterface from "../types/dateTimeInterface";
// import findCompanions from "../utils/findCompanions";


export default function DestinationSelect({profile}:loggedInPageProps){

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
    setDestination(e.currentTarget.textContent || "Select your Destination");
  }

  const redirect_to_ShowCompanions = (destination:string, date: string) => {
    navigate(`/showCompanions/${destination}/${date}`);
  }

  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>("Select your Destination");
  const [date, setDate] = useState<string>("");
  const [serverDate, setServerDate] = useState<dateTimeInterface | boolean>(true);
  const [time, setTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);


  if(serverDate===true){  getDateTime().then((val)=>{setServerDate(val); setLoading(false);
                                                     if(typeof(val)!=='boolean'){setDate(val.date); setTime(val.time);}
  });}


  return(
    <>
      {loading && <InfoCard content='Loading...'/>}
      {!loading && serverDate===false && <InfoCard content='Unable to connect to the server :_('/>}
      {typeof(serverDate)!=='boolean' && (
        <>
          <InfoCard content={`So ${profile?.given_name}, where would you like to go today ?`} />
          {/* <div className="selection-list"> */}
          <div className="date-time">
            <input type="date" onChange={(e)=>setDate(e.target.value)} value={date} min={serverDate.date} required/>
            <input type="time" onChange={(e)=>setTime(e.target.value)} value={time} required/>
          </div>
          <div className="drop-wrap">
            <div className="dropdown" data-dropdown>
              <button className="destination-selector-button" onClick={handleDropdownVisibility}>
                {destination}</button>
              <div className="dropdown-menu">
                <div className="dropdown-cities">
                  <button className="dropdown-item" onClick={handleDestinationSelection}>DNR</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Khurda Station</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Bhubaneshwar</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Airport</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Puri</button>
                  <button className="dropdown-item" onClick={handleDestinationSelection}>Bhubaneshwar</button>
                </div>
              </div>
            </div>
            <button className="search-btn" onClick={()=>redirect_to_ShowCompanions(destination,date)}>Find Companions</button>
          </div>
        </>
      )}
    </>
  )
}