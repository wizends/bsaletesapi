const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:type.VARCHAR ,
        url_image:type.VARCHAR,
        price:type.FLOAT,
        discount:type.INTEGER,
        category: type.INTEGER
    })
}