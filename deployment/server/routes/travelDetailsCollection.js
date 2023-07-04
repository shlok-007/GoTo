import express from "express";
import connectToDatabase from "../db/conn.js";
import { ObjectId } from "mongodb";
import sendPushNotification from "../pushNotifications.js";
import giveDateTime from "../giveDateTime.js";

const router = express.Router();

router.get("/", async (req, res) => {
    let db = await connectToDatabase();
    const { destination, date, email, name, time} = req.query;
    let collection = await db.collection("TravelDetails");
    var result1 = await collection.find({
        "destination": destination,
        "date": date,
        "email": {$ne: email}
    }).toArray();

    var results=[];

    let GotoUsersCollection = db.collection("GotoUsers");
    for (const element of result1) {
      let result2 = await GotoUsersCollection.findOne({ "email": element.email });
      results.push({
        _id: element._id,
        name: result2.name,
        email: element.email,
        ph_no: result2.ph_no,
        wa_no: result2.wa_no,
        time: element.time,
        date: element.date,
        avatar: result2.avatar
      });
    };

    const dateTime = giveDateTime();

    const curr_time = dateTime.time;
    const curr_date = dateTime.date;

    for(let i=0;i<results.length;i++){
      if(date==curr_date && results[i].time<curr_time)  results.splice(i,1);
    }

    let notification = `${name} wishes to go to ${destination} on ${date} at ${time}!`;
    // notification.replace(/"/g, '');

    for (const result of results) {
      const { email } = result;

      let user = await GotoUsersCollection.findOne({ email });
  
      if (user.subObject.endpoint) {
        sendPushNotification(user.subObject, notification)
      }
    }

    res.send(results).status(200);
});

router.get("/userTrips", async (req, res) => {
  let db = await connectToDatabase();
  const email= req.query.email;
  let collection = await db.collection("TravelDetails");
  const projection = {  _id: 1, destination: 1, date: 1, time: 1  };
  let results = await collection.find({ "email": email }, projection).toArray();
  res.send(results).status(200);
});

//--------obsolete------------

router.get("/checkEntry", async (req, res) => {
  let db = await connectToDatabase();
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
  let db = await connectToDatabase();
  const { email, time, destination, date} = req.body;
  let collection = await db.collection("TravelDetails");
  const existingTravelDetail = await collection.findOne({
    "email": email,
    "destination": destination,
    "date": date
  });
  if(existingTravelDetail)  return res.send(existingTravelDetail).status(204);
  let newTravelDetail = {
    "email": email,
    "time": time,
    "destination": destination,
    "date": date,
  };
  let result = await collection.insertOne(newTravelDetail);
  res.send(result).status(204);
});

router.patch("/:id", async (req, res) => {
  let db = await connectToDatabase();
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      date: req.body.date,
      time: req.body.time
    }
  };

  let collection = await db.collection("TravelDetails");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
  let db = await connectToDatabase();
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("TravelDetails");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

router.delete("/dailyCleanUp", async (req, res) => {
  let db = await connectToDatabase();
  const collection = db.collection("TravelDetails");

  let now = new Date();
  var currentDate = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  currentDate.setDate(currentDate.getDate() - 1);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const previousDay = `${year}-${month}-${day}`;

  let result = await collection.deleteMany({ date: previousDay });
  res.send(result).status(200);
});

export default router;
// module.exports = router;