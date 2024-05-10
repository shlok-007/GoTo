import express from "express";
import connectToDatabase from "../db/conn.js";
import { ObjectId } from "mongodb";
import sendNotifications from "../pushNotifications.js";
import isCompanion from "../isCompanion.js";
import sortCompanions from "../sortCompanions.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let db = await connectToDatabase();
  const { destination, date, email, name, time, dir } = req.query;
  const tripsCollection = db.collection("TravelDetails");

  let prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  prevDate = prevDate.toISOString().split('T')[0];

  let trips = await tripsCollection.find({
    "destination": destination,
    "date": { $in: [date, prevDate] },
    "dir": dir === 'true',
    "email": { $ne: email }
  }).toArray();

  const usersCollection = db.collection("GotoUsers");

  let userDetails = await usersCollection.find({
    email: { $in: trips.map(trip => trip.email) }
  }).toArray();

  let results = [];

  userDetails.forEach((user, index) => {
    const trip = trips[index];
    if (user === null
        || !isCompanion(date, time, trip.date, trip.time)
    ) return;

    results.push({
      _id: trip._id,
      name: user.name,
      email: trip.email,
      ph_no: user.ph_no,
      wa_no: user.wa_no,
      time: trip.time,
      date: trip.date,
      avatar: user.avatar
    });
  });

  results = sortCompanions(results, date, time);

  res.send(results).status(200);
});


router.get("/userTrips", async (req, res) => {
  let db = await connectToDatabase();
  const email= req.query.email;
  let collection = await db.collection("TravelDetails");
  let results = await collection.find({ "email": email }).project({email: 0}).toArray();
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
  const { email, time, destination, date, dir, name} = req.body;
  let tripsCollection = await db.collection("TravelDetails");
  const existingTravelDetail = await tripsCollection.findOne({
    "email": email,
    "destination": destination,
    "date": date,
    "dir": dir
  });
  if(existingTravelDetail)  return res.send(existingTravelDetail).status(204);
  let newTravelDetail = {
    "email": email,
    "time": time,
    "destination": destination,
    "date": date,
    "dir": dir
  };
  let result = await tripsCollection.insertOne(newTravelDetail);

  // notify other users
  let prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  prevDate = prevDate.toISOString().split('T')[0];
  
  let companions = await tripsCollection.find({
    "destination": destination,
    "date": { $in: [date, prevDate] },
    "dir": dir,
    "email": {$ne: email}
  }).project({email:1, time:1, date:1}).toArray();

  let companionData = await db.collection("GotoUsers").find({
    email: { $in: companions.map(companion => companion.email) }
  }).toArray();

  let subObjects = new Array();
  companionData.forEach((companion, index) => {
    const companionTrip = companions[index];
    if (companion === null
        || !isCompanion(date, time, companionTrip.date, companionTrip.time)
    ) return;

    subObjects.push(companion.subObject);
  });

  let notification = {
    name: name,
    destination: destination,
    date: date,
    time: time,
    dir: dir
  };

  await sendNotifications(subObjects, notification);

  res.send(result).status(204);
});

router.patch("/trip/:id", async (req, res) => {

  const { time, destination, date, dir, name } = req.body;
  let db = await connectToDatabase();
  let collection = db.collection("TravelDetails");
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      date: date,
      time: time,
      dir: dir,
    }
  };
  let result = await collection.updateOne(query, updates);

  // notify other users
  let prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  prevDate = prevDate.toISOString().split('T')[0];
  
  let companions = await collection.find({
    "destination": destination,
    "date": { $in: [date, prevDate] },
    "dir": dir,
    "_id": { $ne: new ObjectId(req.params.id) }
  }).project({email:1, time:1, date:1}).toArray();

  let companionData = await db.collection("GotoUsers").find({
    email: { $in: companions.map(companion => companion.email) }
  }).toArray();

  let subObjects = new Array();
  companionData.forEach((companion, index) => {
    const companionTrip = companions[index];
    if (companion === null
        || !isCompanion(date, time, companionTrip.date, companionTrip.time)
    ) return;

    subObjects.push(companion.subObject);
  });

  let notification = {
    name: name,
    destination: destination,
    date: date,
    time: time,
    dir: dir
  };

  await sendNotifications(subObjects, notification);

  res.send(result).status(200);
});

router.delete("/deleteOneTrip", async (req, res) => {
  let db = await connectToDatabase();
  const query = { _id: new ObjectId(req.body.tripId) };

  const collection = db.collection("TravelDetails");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

router.get("/dailyCleanUp", async (req, res) => {
  let db = await connectToDatabase();
  const collection = db.collection("TravelDetails");

  let now = new Date();
  let currentDate = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  currentDate = currentDate.toISOString().split('T')[0];

  let result = await collection.deleteMany({ date: { $lt: currentDate } });
  console.log(result);
  res.send(result).status(200);
});

router.get("/destinations", async (req, res) => {
  let db = await connectToDatabase();
  let collection = db.collection("Destinations");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/destinations", async (req, res) => {
  let db = await connectToDatabase();
  let collection = db.collection("Destinations");
  // console.log(req.body);
  let newDest = {
    name: req.body.destname,
    reports: []
  }
  await collection.insertOne(newDest);
  res.status(204).json({msg: "Destination added successfully."});
});

router.patch("/destinations/report", async (req, res) => {
  let reportedDestination = req.body.reportedDestination;
  let reporterEmail = req.body.email;
  let db = await connectToDatabase();
  let collection = db.collection("Destinations");

  // check if the reporter has already reported the destination
  let result = await collection.findOne({
    "name": reportedDestination });

  if(!result){
    return res.send({msg: "Destination not found."}).status(404);
  }

  if(result.reports){

    if(result.reports.includes(reporterEmail)){
      return res.send({msg: "You have already reported."}).status(204);
    }

    if(result.reports.length >= 4){
      await collection.deleteOne({ "name": reportedDestination });
      return res.send({msg: "Reported & removed destination."}).status(200);
    }
  }

  const query = { name: reportedDestination };
  const updates =  {
    $push: {
      reports: reporterEmail
    }
  };
  result = await collection.updateOne(query, updates);
  res.send({msg: "Reported successfully."}).status(200);

});

export default router;
// module.exports = router;