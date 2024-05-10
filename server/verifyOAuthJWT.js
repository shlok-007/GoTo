import jws from "jws-jwk";
import fs from "fs";
import exp from "constants";

const jwk = JSON.parse(fs.readFileSync("jwk.json", "utf8"));

const verifyOAuthJWT = async (oauthJWT) => {
    const body = JSON.parse(Buffer.from(oauthJWT.split(".")[1], "base64").toString());
    // console.log(body);

    // console.log(body.aud);
    // console.log(body.iss);
    // console.log(jws.verify(oauthJWT, jwk));

    if( body.aud === process.env.OAUTH_CLIENT_ID && 
        body.iss === 'https://accounts.google.com' && 
        jws.verify(oauthJWT, jwk) ){

        // console.log("JWT verified");
        let userData = {
            email: body.email,
            name: body.name,
            picture: body.picture,
            sub: body.sub,
            given_name: body.given_name
        };
        return userData;
    }
        
    return false;
}

export default verifyOAuthJWT;