import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.patch("/addSubscription", async (req, res) => {
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

export default router;