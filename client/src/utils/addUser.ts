export default async function addUser(email:string, name:string, avatar:string) {
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        await fetch(serverURL+'/userDetails/addUser', {
            // mode: 'no-cors',
            // credentials: 'include',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, avatar }),
        });
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}