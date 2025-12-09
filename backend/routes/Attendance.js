const express = require('express');
const router = express.Router();
const { Attendance, sequelize } = require('../models');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');
const {FACULTY, ADMIN} = require('../config/roles.js')

router.get("/", isAuthenticated, hasRole(ADMIN, FACULTY), async (req,res) => {
  const attendance = await Attendance.findAll();
  res.json(attendance);
});

router.get("/attendancedata", async(req,res) => {
  const activity_id = req.query.activity_id;
  console.log("Activity:" +activity_id);

  const startDate = req.query.startDate;

  let currentDate = new Date(startDate);
  console.log("\n \n Start Date:" + startDate);
  console.log("Current Date:" + currentDate);

  const dates = [];
  dates.push(currentDate.toISOString().split("T")[0]);

  for (i=0; i<6; i++) {
    currentDate.setDate(currentDate.getDate()+1);
    dates.push(currentDate.toISOString().split("T")[0]);
  };

  console.log("Dates:"+ JSON.stringify(dates));

  let rawData=[];

for (i=0; i<dates.length; i++) {
    let sqlString = "SELECT se.activities_id, se.student_id, a.attendance_date, u.first_name, u.last_name " +
	"FROM users u JOIN student_enrollment se ON u.user_id = se.student_id " +
        "LEFT JOIN attendance a " +
			"ON se.student_id = a.student_id AND " +
            "se.activities_id = a.activity_id_fk " + " AND a.attendance_date= '" + dates[i] + "' " +
	  "WHERE se.activities_id = " + activity_id + "";


    // "SELECT se.activities_id, se.student_id, a.attendance_date" +
    // "	FROM student_enrollment se " +
    //     "JOIN attendance a " +
		// 	"ON se.student_id = a.student_id AND " +
    //       "se.activities_id = a.activity_id_fk " +
    // "WHERE se.activities_id = " + activity_id + ""
    // " AND a.attendance_date BETWEEN '" + dates[0] + "' AND '" + dates[6] + "'";

    console.log("\n \n"+sqlString);

  const attendanceResults = await sequelize.query(
    sqlString, {
      type: sequelize.QueryTypes.SELECT
  });

  console.log("Attendance Results: ", attendanceResults);

  // const [students] = await sequelize.query(
  //   "SELECT last_name, first_name, user_id from users JOIN student_enrollment se ON " +
	// "user_id = se.student_id " +
	// 	"WHERE se.activities_id = " + activity_id, {
  //     type: sequelize.QueryTypes.SELECT
  // });
  rawData.push(attendanceResults);
  
  }
  console.log(JSON.stringify(rawData));

  var returnData = {
    dates: dates,
    activity_id: activity_id,
    attendanceData: formatData(rawData)
  };

console.log(JSON.stringify(returnData));

res.json(returnData);
});

function formatData(rawData) {
  var formattedData = [];
  for (i=0; i<rawData[0].length; i++){
    let studentData = {
      last_name: rawData[0][i].last_name,
      first_name: rawData[0][i].first_name,
      student_id: rawData[0][i].student_id,
      attendance: []
    };
    for (j=0; j<rawData.length; j++) {
      if (rawData[j][i].attendance_date === null) {
        studentData.attendance.push(false);
      } else {
        studentData.attendance.push(true);
      }
    }
    formattedData.push(studentData);
  }
  console.log("JSON Stringified:", JSON.stringify(formattedData));
  return formattedData;
};

router.post("/update-attendance", isAuthenticated, hasRole(ADMIN, FACULTY), async (req,res)=> {
  const {student_id, activity_id, date,value}=req.body;

  try {
  if (value === true) {
    const newAttendance = await Attendance.create({
      attendance_date: date,
      activity_id_fk: activity_id,
      student_id
    })
    await newAttendance.save();
    console.log("Successful!")
    return res.json(newAttendance);
  } else {
    await Attendance.destroy({
      where: { student_id, 
        activity_id_fk: activity_id,
        attendance_date: date
       },
    });
    console.log("Successful!")
    return res.status(200).json({ message: "Attemdance deleted successfully" });
  }} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update attendance" });
  }
});

module.exports = router;