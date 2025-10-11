const express = require('express');
const app = express();
const port = 3001;
const defineAssociations = require('./associations');

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

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

defineAssociations();

app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });


