export default async function dailyCleanUp() {
    try{
        console.log("dailyCleanUp");
        let serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(serverURL+"/travelDetails/dailyCleanUp",{
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    }catch(err){
        console.log(err);
    }
}