import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import travelDetailsCollection from "./routes/travelDetailsCollection.mjs";
import getDateTime from "./routes/getDateTime.mjs"
import userDetailsCollection from "./routes/userDetailsCollection.mjs"

const PORT = process.env.PORT || 3069;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/travelDetails", travelDetailsCollection);
app.use("/getDateTime", getDateTime);
app.use("/userDetails", userDetailsCollection);

// start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });