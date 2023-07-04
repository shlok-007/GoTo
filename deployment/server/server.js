import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import travelDetailsCollection from "./routes/travelDetailsCollection.js";
import getDateTime from "./routes/getDateTime.js"
import userDetailsCollection from "./routes/userDetailsCollection.js"

const PORT = process.env.PORT || 3069;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/travelDetails", travelDetailsCollection);
app.use("/getDateTime", getDateTime);
app.use("/userDetails", userDetailsCollection);
app.get('*',(req,res,next)=>{
    res.status(200).json({
      message:'bad request'
    })
})

// module.exports = app;
// export default app;

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});