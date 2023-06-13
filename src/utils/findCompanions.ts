import travelDetails_interface from "../types/travelDetailsInterface";

const findCompanions = async (destination:string, date: string) : Promise<travelDetails_interface[]>=> {
    const response = await fetch("http://localhost:5000/database/travelDetails/?" + new URLSearchParams({
      destination: destination,
      date: date
      })
    );
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return JSON.parse("[]");
    }
    const data = await response.json();
    return data;
}

export default findCompanions;