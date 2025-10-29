const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const cookieParser = require('cookie-parser')
const bodyParser=require('body-parser');

const app = express();
const port = 3001;

require('./auth/passport')(passport);

const {sequelize} = require('./models');
const sessionStore = require('./sessionStore');

const {Users} = require('./models');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(
    session({
        secret: 'supersecret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24*60*60*1000},
    })
);

app.use(passport.initialize());
app.use(passport.session());


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



sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});


app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });


