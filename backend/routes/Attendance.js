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

router.post("/update-attendance", async (req,res)=> {
  
})


// const exists = data.some(item =>
//   item.id === targetId && item.date === targetDate
// );

// console.log(exists);  // true or false







// router.get("/:activity_id", isAuthenticated, hasRole(ADMIN, FACULTY), async (req,res) => {
//   try {
//     const {activity_id} = req.params;
    
//     const isModerator = await Faculty_Moderators.findOne({
//       where: {
//         faculty_id: req.user.user_id,
//         activity_moderating_id: activity_id
//       }
//     });

//      if (!isModerator) return res.status(403).json({ message: "Not authorized" });

//      const attendance = await Attendance.findAll({
//       where: {
//         activity_id_fk: activity_id
//       }
//      })

//      res.json(attendance);
//   } catch (err) {
//     console.error(err);
//    return res.status(500).json({err: "Failed to retrieve attendance"});
// }
//   const attendance = await Attendance.findAll();
//   res.json(attendance);
// });

// router.post("/add-date", isAuthenticated, hasRole(FACULTY, ADMIN), async(req,res) => {
//   try {
//     const {activity_id, date} = req.body;

//     const isModerator = await Faculty_Moderators.findOne({
//       where: {
//         faculty_id: req.user.user_id,
//         activity_id: activity_id
//       }
//     });

//      if (!isModerator) return res.status(403).json({ message: "Not authorized" });

//      const enrollments = await Student_Enrollment.findAll({where: {activity_id}});

//      const attendanceData = enrollments.map(s => ({
//       student_id: s.student_id,
//       activity_id,
//       date,
//       present: false
//      }));

//      await Attendance.bulkCreate(attendanceData, {ignoreDuplicates: true});
//      res.json({message: "Date has been added."});
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({err: "Failed to add dates."});
//   }
//  })

module.exports = router;