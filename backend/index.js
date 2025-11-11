const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const app = express();
const port = 3001;

require('./auth/passport')(passport);

const {sequelize} = require('./models');

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routers for categories
const categoryRouter = require('./routes/Categories');
app.use("/categories",categoryRouter);

const activityRouter = require('./routes/Activities');
app.use("/activities",activityRouter);

const userRouter = require('./routes/Users');
app.use("/users",userRouter);

const userRolesRouter = require('./routes/User_Roles');
app.use("/userroles", userRolesRouter);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const studentEnrollmentRoutes = require('./routes/Student_Enrollment');
app.use('/studentenrollment', studentEnrollmentRoutes);

const facultyModeratorsRoutes = require('./routes/Faculty_Moderators');
app.use('/facultymoderators',facultyModeratorsRoutes);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});


app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });


