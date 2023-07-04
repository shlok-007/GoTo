import express from "express";
import connectToDatabase from "../db/conn.js";

const router = express.Router();

router.patch("/addSubscription", async (req, res) => {
    let db = await connectToDatabase();
    const {email, subscription} = req.body;
    let collection = await db.collection("GotoUsers");
    const filter = { "email": email };
    const update = { $set: { "subObject": subscription } };
    const options = {returnOriginal: false};

    try{
    const result = await collection.findOneAndUpdate(filter, update, options);
    if (!result.value) {
        return res.status(404).json({ error: 'User not found' });
      }
    res.json(result.value);

    }catch (error) {
      console.error('Error occurred while updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/addUser", async (req, res) => {
  let db = await connectToDatabase();
  let collection = await db.collection("GotoUsers");
  let email=req.body.email;
  const existingUser = await collection.findOne({ email });

  if (existingUser) {
    return res.send().status(204);
  }

  let newUser = {
    "email": email,
    "name": req.body.name,
    "ph_no": "",
    "wa_no": "",
    "avatar": req.body.avatar,
    "subObject": {}
  };
  let result = await collection.insertOne(newUser);
  res.send(result).status(204);
});

router.patch("/updateContact", async (req, res) => {
  let db = await connectToDatabase();
  const {email, ph_no, wa_no} = req.body;
  let collection = await db.collection("GotoUsers");
  const filter = { "email": email };
  const update = { $set: { "ph_no": ph_no, "wa_no": wa_no } };
  const options = {returnOriginal: false};

  try{
    const result = await collection.findOneAndUpdate(filter, update, options);
    if (!result.value) {
        return res.status(404).json({ error: 'User not found' });
      }
    res.json(result.value);

    }catch (error) {
      console.error('Error occurred while updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get("/getContact", async (req, res) => {
  let db = await connectToDatabase();
  const {email} = req.query;
  let collection = await db.collection("GotoUsers");
  let results = await collection.findOne({"email": email});
  res.send({
    "ph_no": results.ph_no,
    "wa_no": results.wa_no
  }).status(200);
});

export default router;
// module.exports = router;