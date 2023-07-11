import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import travelDetailsCollection from "./routes/travelDetailsCollection.js";
import getDateTime from "./routes/getDateTime.js"
import userDetailsCollection from "./routes/userDetailsCollection.js"

const PORT = process.env.PORT || 3069;
const app = express();

const allowedOrigins = ['https://goto-nine.vercel.app'
                        // , 'http://localhost:3000'
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

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.use("/travelDetails", travelDetailsCollection);
app.use("/getDateTime", getDateTime);
app.use("/userDetails", userDetailsCollection);
app.get('*',(req,res,next)=>{
    res.status(200).json({
      message:'server is working'
    })
})

// module.exports = app;
// export default app;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});