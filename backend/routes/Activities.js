const express = require('express');
const router = express.Router();
const { Activities } = require('../models')(sequelize, DataTypes);;

router.get("/", (req, res) => {
    res.send("Hello World!")
});

router.post("/", async (req,rest) => {
    const post = req.body;
    await Activities.create(post);
    res.json(post);
})




module.exports = router;