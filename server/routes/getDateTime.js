import express from "express";
import giveDateTime from "../giveDateTime.js";

const router = express.Router();

router.get("/", async (req, res) => {
    let results = giveDateTime();
    res.send(results).status(200);
});

export default router;
// module.exports = router;