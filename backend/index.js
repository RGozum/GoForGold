const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173/"],
}

const Categories = require('./models/Categories')

app.use(cors());

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    'goforgolddb',
    'root',
    'root',
    {
        host: 'localhost',
        dialect:'mysql'
    }
);

app.use(express.json());


// Routers for categories
const categoryRouter = require('./routes/Categories');
app.use("/Categories",categoryRouter);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});


app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });


