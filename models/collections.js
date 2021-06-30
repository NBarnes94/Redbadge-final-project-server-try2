const {DataTypes} =require('sequelize');
const db = require('../db');

const CollectionModel = db.define('collection', {
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = CollectionModel