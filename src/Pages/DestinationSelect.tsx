import loggedInPageProps from "../types/loggedInPageProps"
import React, {useState} from "react"
import "../styles/loggedInPageStyle.css"
import InfoCard from '../components/InfoCard';
import {useNavigate} from 'react-router-dom';
// import findCompanions from "../utils/findCompanions";


export default function DestinationSelect({profile}:loggedInPageProps){

  // console.log(profile);

  const [destination, setDestination] = useState<string>("Select your Destination");

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

  const navigate = useNavigate();
  const [date, setDate] = useState<string>("");
  
  const redirect_to_ShowCompanions = (destination:string, date: string) => {
    navigate(`/showCompanions/${destination}/${date}`);
  }


  return(
      <>
          <InfoCard content={`Hello ${profile?.given_name}, where would you like to go today ?`} />
          <input type="date" onChange={(e)=>setDate(e.target.value)} placeholder="Select Date"/>
          <div className="dropdown" data-dropdown>
            <span>
            <button className="destination-selector-button" onClick={handleDropdownVisibility}>
              {destination}</button>
            <button className="search-btn" onClick={()=>redirect_to_ShowCompanions(destination,date)}>Find Companions</button>
            </span>
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
      </>
  )
}