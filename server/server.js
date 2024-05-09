import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import travelDetailsCollection from "./routes/travelDetailsCollection.js";
import getDateTime from "./routes/getDateTime.js"
import userDetailsCollection from "./routes/userDetailsCollection.js"
import fs from "fs";
import jws from "jws-jwk";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3069;
const app = express();

const allowedOrigins = [process.env.CLIENT_URL
                       ];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("REQUEST_ORIGIN : "+origin);
    //allow a specific request user agent
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const jwk = fs.readFileSync('./jwk.json', 'utf8');

const verifyUser = (req, res, next) => {
  let jwt = req.cookies.jwt_auth_token;
  console.log("JWT : "+jwt);
  next();
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/travelDetails", travelDetailsCollection);
app.use("/getDateTime", verifyUser, getDateTime);
app.use("/userDetails", userDetailsCollection);
app.get('*',(req,res,next)=>{
    res.status(200).json({
      message:'GoTogether server is LIVE!'
    })
})

// module.exports = app;
// export default app;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});