const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config')


const Category = sequelize.define('category', {

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:DataTypes.STRING 
},{freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,})

module.exports = Category
