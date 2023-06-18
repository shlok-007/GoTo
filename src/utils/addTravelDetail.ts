// import travelDetails_interface from "../types/travelDetailsInterface";
import travelDetailsPOST_interface from "../types/travelDetailsPOSTInterface";

export default async function addTravelDetail(travelDetail : travelDetailsPOST_interface) : Promise<boolean>{
    try{
    await fetch('http://localhost:5000/travelDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(travelDetail)
        });
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}