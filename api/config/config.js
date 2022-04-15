const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bsale_test', 'bsale_test', 'bsale_test', {
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    dialect: 'mysql'

});

const verifyConn = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

verifyConn()

module.exports = sequelize
