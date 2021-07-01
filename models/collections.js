const {DataTypes} =require('sequelize');
const db = require('../db');

const CollectionModel = db.define('collection', {
    owner:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mediaInCollection:{
        type: DataTypes.JSON
    }
})

module.exports = CollectionModel