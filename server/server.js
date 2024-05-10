import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import travelDetailsCollection from "./routes/travelDetailsCollection.js";
import getDateTime from "./routes/getDateTime.js"
import userDetailsCollection from "./routes/userDetailsCollection.js"
import login from "./routes/login.js";

import cookieParser from "cookie-parser";

import verifyJWT from "./verifyJWT.js";

const PORT = process.env.PORT || 3069;
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/travelDetails", verifyJWT, travelDetailsCollection);
app.use("/getDateTime", verifyJWT, getDateTime);
app.use("/userDetails", verifyJWT, userDetailsCollection);
app.use("/login", login);
app.get('*',(req,res)=>{
    res.status(200).json({
      message:'GoTogether server is LIVE!'
    })
})

// module.exports = app;
// export default app;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});