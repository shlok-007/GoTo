import dateTimeInterface from "../types/dateTimeInterface";

export default async function getDateTime() : Promise<dateTimeInterface | boolean> {
    try{
        const response = await fetch("http://localhost:5000/getDateTime/");
        if(!response.ok){
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return false;
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
        return false;
    }
}