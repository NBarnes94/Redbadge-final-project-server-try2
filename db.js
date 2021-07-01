require('dotenv').config();

const  Sequelize  = require('sequelize')
//! need to change 4 back to DATABASE_URL
// const db = new Sequelize(process.env.DB_CONNECTION_STRING,{
//     dialect: 'postgres',
//     ssl: process.env.ENVIRONMENT === 'production'
// })
const db = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
})

module.exports = db;