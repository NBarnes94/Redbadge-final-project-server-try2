const {DataTypes, INTEGER} = require('sequelize');
const db = require("../db");
const VGModel = require('./videoGame');
const BookModel = require('./book');
const MovieModel = require('./movie');
const CollectionModel = require("./collections");

const CollectionTable = db.define('CollectionTable', {
    owner:{
        type: DataTypes.INTEGER
    },
    movieId:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    videoGameId:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    bookId:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = CollectionTable