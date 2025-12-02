const express = require('express');
const router = express.Router();
const { Attendance } = require('../models');

router.get("/", async (req,res) => {
  const attendance = await Attendance.findAll();
  res.json(attendance);
});

module.exports = router;