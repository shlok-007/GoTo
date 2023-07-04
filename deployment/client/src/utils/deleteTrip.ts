export default async function deleteTrip(tripId: string){
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(serverURL+`/travelDetails/${tripId}`,{
            method: 'DELETE'
        });
        if(response.status === 200) return true;
        else{ 
            window.alert("Error deleting trip");
            return false;}
    }catch(err){
        window.alert("Error deleting trip");
        console.log(err);
        return false;
    }
}