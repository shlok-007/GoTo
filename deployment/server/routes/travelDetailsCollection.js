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
    var subObjects=[];

    let GotoUsersCollection = db.collection("GotoUsers");
    for (const element of result1) {
      let result2 = await GotoUsersCollection.findOne({ "email": element.email });
      if(result2===null) continue;
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
      subObjects.push(result2.subObject);
    };

    const dateTime = giveDateTime();

    const curr_time = dateTime.time;
    const curr_date = dateTime.date;

    for(let i=0;i<results.length;i++){
      if(date==curr_date && results[i].time<curr_time){
        results.splice(i,1);
        subObjects.splice(i,1);
    }}

    let notification = {
      name: name,
      destination: destination,
      date: date,
      time: time
    }

    for (const subObject of subObjects) {
      try{
      if (subObject?.endpoint) {
        await sendPushNotification(subObject, notification);
      }
      }catch(err){
        console.log(err);
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
  let collection = await db.collection("TravelDetails");
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      date: req.body.date,
      time: req.body.time
    }
  };
  let result = await collection.updateOne(query, updates);

  let dateTime = giveDateTime();
  let curr_time = dateTime.time;
  let curr_date = dateTime.date;
  var result1 = await collection.find({
    "destination": req.body.destination,
    "date": req.body.date,
    "_id": {$ne: new ObjectId(req.params.id)},
  },{email:1, time:1,_id:0, destination:0, date:0}).toArray();

  let notification = {
    name: req.body.name,
    destination: req.body.destination,
    date: req.body.date,
    time: req.body.time
  }
  let GotoUsersCollection = db.collection("GotoUsers");
  for (const element of result1) {
    if(curr_date<req.body.date || (curr_date==req.body.date && element.time>=curr_time)){
      let result2 = await GotoUsersCollection.findOne({ "email": element.email },{subObject:1});
      if (result2?.subObject?.endpoint) {
        await sendPushNotification(result2.subObject, notification)
      }}
  }
  res.send(result).status(200);
});

router.delete("/deleteOneTrip/:id", async (req, res) => {
  let db = await connectToDatabase();
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("TravelDetails");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

router.get("/dailyCleanUp", async (req, res) => {
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
  console.log(result);
  res.send(result).status(200);
});

export default router;
// module.exports = router;