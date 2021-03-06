const {DataTypes} =require('sequelize');
const db = require('../db');

const CollectionModel = db.define('collection', {
    owner:{
        type:DataTypes.INTEGER,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = CollectionModel