const { DatabaseError } = require('pg');
const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type:DataTypes.ENUM,
        values: ["user", "admin"],
        allowNull:false,
        defaultValue: "user"
    }
})

module.exports = User;