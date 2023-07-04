export default async function getUserTrips(email: string) : Promise<{_id:string, destination:string, date:string, time:string}[]> {
  try{
    let serverURL = process.env.REACT_APP_SERVER_URL;
    const response = await fetch(serverURL+`/travelDetails/userTrips/?email=${email}`);
    const data = await response.json();
    return data;
  }catch(error){
    console.log(error);
    window.alert("Error getting user trips");
    return [];
  }
}