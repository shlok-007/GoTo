export default async function updateTrip(tripId: string, date: string, time: string){
    try{
        await fetch(`http://localhost:5000/travelDetails/${tripId}`,{
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