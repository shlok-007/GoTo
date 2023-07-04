export default async function updateTrip(tripId: string, date: string, time: string){
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        await fetch(serverURL+`/travelDetails/${tripId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                time: time
            })
        });
    }catch(err){
        window.alert("Error updating trip");
        console.log(err);
    }
}