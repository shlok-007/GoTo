export default async function getUserTrips(email: string) : Promise<{_id:string, destination:string, date:string, time:string}[]> {
  try{
    const response = await fetch(`http://localhost:5000/travelDetails/userTrips/?email=${email}`);
    const data = await response.json();
    return data;
  }catch(error){
    console.log(error);
    window.alert("Error getting user trips");
    return [];
  }
}