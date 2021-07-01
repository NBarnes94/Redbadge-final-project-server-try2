const {DataTypes} = require('sequelize');
const db = require('../db')

const VGModel = db.define('videoGame', {
    title: {
        type:DataTypes.STRING,
        allowNull:false
    }, 
    genre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    developer:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    platform:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    rating:{
        type:DataTypes.STRING,
    },
    status:{
        type:DataTypes.STRING,
    },
    personalComment:{
        type:DataTypes.STRING,
    }, 
    owner_id:{
        type: DataTypes.INTEGER
    }
})

module.exports = VGModel;