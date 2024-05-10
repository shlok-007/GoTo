import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./loadEnvironment.js";
import "./cronDailyCleanup.js"
import rateLimit from "express-rate-limit";
import jwt from 'jsonwebtoken';

import travelDetailsCollection from "./routes/travelDetailsCollection.js";
import getDateTime from "./routes/getDateTime.js"
import userDetailsCollection from "./routes/userDetailsCollection.js"
import login from "./routes/login.js";
import dailyCleanup from "./routes/dailyCleanup.js";

import verifyJWT from "./verifyJWT.js";

const PORT = process.env.PORT || 3069;
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 1*60*1000,
  max: 30,
  keyGenerator: (req) => {
    const authToken = req.cookies.jwt_auth_token;
    if (authToken) {
      try {
        const user = jwt.verify(authToken, process.env.JWT_SECRET);
        return user.email;
      } catch (err) {
        return req.ip;
      }
    }
    return req.ip;
  }
});

app.use(limiter);

app.use("/travelDetails", verifyJWT, travelDetailsCollection);
app.use("/getDateTime", verifyJWT, getDateTime);
app.use("/userDetails", verifyJWT, userDetailsCollection);

app.use("/login", login);
app.use("/dailyCleanup", dailyCleanup);

app.get('*', verifyJWT, (req,res)=>{
    res.status(200).json({
      message: "GoTo server is LIVE!"
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// module.exports = app;
// export default app;