import express from "express";
import connectToDatabase from "../db/conn.js";
import verifyOAuthJWT from "../verifyOAuthJWT.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
    let oauthJWT = req.body.jwt;
    if(!oauthJWT){
      return res.status(401).json({ error: 'No token found' });
    }
    let userData = await verifyOAuthJWT(oauthJWT);
  
    if(!!!userData){
      return res.status(401).json({ error: 'Invalid token' });
    }
  
    const authToken = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' });
  
    res.cookie('jwt_auth_token', authToken
    , {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      path: '/',
    }
    );
  
    res.cookie('dummy_jwt_auth_token', "i exist!"
    , {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      path: '/',
    }
    );

    let db = await connectToDatabase();
    let collection = db.collection("GotoUsers");
    let email = userData.email;
    const existingUser = await collection.findOne({ email });
  
    if (existingUser) {
      return res.send({msg: "User already exists.", profile: userData}).status(204);
    }
  
    let newUser = {
      "email": email,
      "name": req.body.name,
      "ph_no": "",
      "wa_no": "",
      "avatar": req.body.avatar,
      "subObject": {}
    };
    let result = await collection.insertOne(newUser);
    res.send({msg: "New user added.", profile: userData}).status(200);
  
  });

export default router;