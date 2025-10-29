const session = require('express-session');
const SequelizeStore=require('connect-session-sequelize')(session.Store);
const {sequelize} = require('./models');

const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: 'Sessions',
});
sessionStore.sync();

module.exports = sessionStore;