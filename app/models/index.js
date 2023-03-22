const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
    config.db.DB_NAME,
    config.db.DB_USER,
    config.db.DB_PASS, {
        host: config.db.DB_HOST,
        dialect: config.db.dialect,
        operatorsAliases: false,
  
        poll: {
            max: config.db.pool.max,
            min: config.db.pool.min,
            acquire: config.db.pool.acquire,
            idle: config.db.pool.idle
        }
    }
);

sequelize.authenticate()
.then(() => {
    console.log('connected...');
})
.catch(err => {
    console.log('Error' + err)
});

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize, DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('re-sync done!')
})

module.exports = db;