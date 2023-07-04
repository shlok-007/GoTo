export default async function dailyCleanUp() {
    try{
        console.log("dailyCleanUp");
        let serverURL = process.env.REACT_APP_SERVER_URL;
        await fetch(serverURL+"/travelDetails/dailyCleanUp",{
            method: 'DELETE'
        });
    }catch(err){
        console.log(err);
    }
}