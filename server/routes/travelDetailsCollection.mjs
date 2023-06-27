import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import sendPushNotification from "../pushNotifications.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { destination, date, email, name, time} = req.query;
    let collection = await db.collection("TravelDetails");
    var results = await collection.find({
        "destination": destination,
        "date": date,
        "email": {$ne: email}
    }).toArray();

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const curr_time = `${hours}:${minutes}`;
    const curr_date = `${year}-${month}-${day}`;

    // console.log(curr_time);
    // console.log(results);

    for(let i=0;i<results.length;i++){
      if(date==curr_date && results[i].time<curr_time)  results.splice(i,1);
    }

    // console.log(results);

    let GotoUsersCollection = db.collection("GotoUsers");

    let notification = `${name} wishes to go to ${destination} on ${date} at ${time}!`;
    // notification.replace(/"/g, '');

    for (const result of results) {
      const { email } = result;

      let user = await GotoUsersCollection.findOne({ email });
  
      if (user.subObject!={}) {
        const { subObject } = user;
        sendPushNotification(subObject, notification)
      }
    }

    res.send(results).status(200);
});

//--------obsolete------------

router.get("/checkEntry", async (req, res) => {
  const { email, destination, date, time} = req.query;
  let collection = await db.collection("TravelDetails");
  let results = await collection.find({
      "email": email,
      "destination": destination,
      "date": date,
      "time": time
  },{"_id":1}).toArray();
  let found = false;
  if(results.length>0){ found = true; }
  res.send({"found":found}).status(200);
});

//--------------------------------

router.post("/", async (req, res) => {
  const { name, email, ph_no, wa_no, time, destination, date, avatar} = req.body;
  let collection = await db.collection("TravelDetails");
  const existingTravelDetail = await collection.findOne({
    "email": email,
    "destination": destination,
    "date": date
  });
  if(existingTravelDetail)  return res.send(existingTravelDetail).status(204);
  let newTravelDetail = {
    "name": name,
    "email": email,
    "ph_no": ph_no,
    "wa_no": wa_no,
    "time": time,
    "destination": destination,
    "date": date,
    "avatar": avatar
  };
  let result = await collection.insertOne(newTravelDetail);
  res.send(result).status(204);
});
export default router;