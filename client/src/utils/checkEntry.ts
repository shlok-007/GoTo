
//-----------obsolete----------------

export default async function checkEntry(email: string, destination:string, date:string, time:string): Promise<boolean | {found:boolean}> {
    try {
        let serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(serverURL+"/travelDetails/checkEntry/?" + new URLSearchParams({
            email: email,
            destination: destination,
            date: date,
            time: time
            })
        );
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return false;
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}