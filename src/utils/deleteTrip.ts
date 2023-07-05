export default async function deleteTrip(tripId: string){
    try{
        const response = await fetch(`http://localhost:5000/travelDetails/deleteOneTrip/${tripId}`,{
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