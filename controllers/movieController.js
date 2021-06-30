const router = require('express').Router();
const {MovieModel} = require('../models');
const validateSession = require('../middleware');
const middleware = require('../middleware');


router.get('/', async (req, res) =>{
    try{
        const allMovies = await MovieModel.findAll()

        res.status(200).json(allMovies)
    } catch(err){
        res.status(500).json({
            err
        })
    }
})