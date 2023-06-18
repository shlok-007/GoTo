import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
    const { destination, date, email} = req.query;
    let collection = await db.collection("TravelDetails");
    let results = await collection.find({
        "destination": destination,
        "date": date,
        "email": {$ne: email}
    }).toArray();
    res.send(results).status(200);
});

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

// This section will help you create a new record.
router.post("/", async (req, res) => {
  // const { name, email, ph_no, wa_no, time, destination, date, avatar} = req.body;
  let newDocument = {
    "name": req.body.name,
    "email": req.body.email,
    "ph_no": req.body.ph_no,
    "wa_no": req.body.wa_no,
    "time": req.body.time,
    "destination": req.body.destination,
    "date": req.body.date,
    "avatar": req.body.avatar
  };
  let collection = await db.collection("TravelDetails");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you get a single record by id
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("records");
//   let query = {_id: new ObjectId(req.params.id)};
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });



// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection = await db.collection("records");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("records");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;