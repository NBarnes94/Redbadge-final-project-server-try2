const {DataTypes, INTEGER} = require('sequelize');
const db = require("../db");
const VGModel = require('./videoGame');
const BookModel = require('./book');
const MovieModel = require('./movie');
const CollectionModel = require("./collections");

const CollectionTable = db.define('CollectionTable', {
    owner:{
        type: DataTypes.INTEGER
    }
})

module.exports = CollectionTable