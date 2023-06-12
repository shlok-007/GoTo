import loggedInPageProps from "../types/loggedInPageProps"
import React, {useState} from "react"
import "../styles/loggedInPageStyle.css"
import InfoCard from '../components/InfoCard';
// import findCompanions from "../utils/findCompanions";


export default function LoggedInPage({profile}:loggedInPageProps){

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

  const findCompanions = async (destination:string, date: string) => {
    console.log(destination, date);
    const response = await fetch("http://localhost:5000/database/travelDetails/?" + new URLSearchParams({
      destination: destination,
      date: date
      })
    );
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const data = await response.json();
    console.log(data);
  }

  const [date, setDate] = useState<string>("");

  return(
      <>
          <InfoCard content={`Hello ${profile?.given_name}, where would you like to go today ?`} />
          <input type="date" onChange={(e)=>setDate(e.target.value)} placeholder="Select Date"/>
          <div className="dropdown" data-dropdown>
            <span>
            <button className="destination-selector-button" onClick={handleDropdownVisibility}>
              {destination}</button>
            <button className="search-btn" onClick={()=>findCompanions(destination,date)}>Find Companions</button>
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