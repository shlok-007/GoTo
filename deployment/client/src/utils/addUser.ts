export default async function addUser(email:string, name:string, avatar:string) {
    try{
    await fetch('http://localhost:5000/userDetails/addUser', {
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