import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import sendPushNotification from "../pushNotifications.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { destination, date, email} = req.query;
    let collection = await db.collection("TravelDetails");
    let results = await collection.find({
        "destination": destination,
        "date": date,
        "email": {$ne: email}
    }).toArray();

    let GotoUsersCollection = db.collection("GotoUsers");

    for (const result of results) {
      const { email } = result;

      let user = await GotoUsersCollection.findOne({ email });
  
      if (user.subObject!={}) {
        const { subObject } = user;
        sendPushNotification(subObject, "You have got a companion!")
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