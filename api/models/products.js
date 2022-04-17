const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config')

const Product = sequelize.define('product', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name:DataTypes.STRING,
        url_image:DataTypes.STRING,
        price:DataTypes.FLOAT,
        discount:DataTypes.INTEGER,
        category: DataTypes.INTEGER
},{freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,})

module.exports = Product

