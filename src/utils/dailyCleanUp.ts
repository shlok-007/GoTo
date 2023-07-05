export default async function dailyCleanUp() {
    try{
        // console.log("dailyCleanUp");
        await fetch("http://localhost:5000/travelDetails/dailyCleanUp",{
            method: 'DELETE'
        });
    }catch(err){
        console.log(err);
    }
}