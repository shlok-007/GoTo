export default async function getContact(email:string) : Promise<boolean | {ph_no:string, wa_no:string}> {
    try{
        const response = await fetch("http://localhost:5000/userDetails/getContact/?"+new URLSearchParams({email:email}));
        if(!response.ok){
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return false;
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
        return false;
    }
}