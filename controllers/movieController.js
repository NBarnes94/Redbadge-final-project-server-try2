const router = require('express').Router();
const {MovieModel} = require('../models');
const validateSession = require('../middleware');
const middleware = require('../middleware');
const { movieController } = require('.');

//! Get all movie
router.get('/all', async (req, res) =>{
    try{
        const allMovies = await MovieModel.findAll()

        res.status(200).json(allMovies)
    } catch(err){
        res.status(500).json({
            err
        })
    }
})

//! get single movie information
router.get("/:id", middleware.validateSession, async (req, res)=>{
    try{
        const findMovie = await MovieModel.findOne({
            where: {id: req.params.id}
        })
    } catch(err){
        res.status(500).json({
            message: `Failed to retrieve Movie ${err}`
        })
    }
})


//! get user's movies 
router.get('/', middleware.validateSession, async (req,res) =>{
    try{
        const {id} = req.user
        const userMovies = await MovieModel.findAll({
            where: {owner_id: id}
        })
        res.status(200).json(userMovies)
    } catch(err){
        res.status(500).json({
            message: `Failed to find your movies ${err}`
        })
    }
})


//! create movie
router.post('/create', middleware.validateSession, async (req,res) =>{
    console.log(req.body);

    const {title, genre, studio, runTime, description, rating, personalComment, status} =req.body
    const {id} = req.user
    const movieCreate ={
        title, 
        genre, 
        studio, 
        runTime, 
        description, 
        rating,
        personalComment,
        status, 
        owner_id: id 
    }
    console.log(movieCreate);

    try{
        const newMovie = await MovieModel.create(
            movieCreate
        );

        res.status(200).json({
            message: `Movie successfully logged`,
            newMovie
        })
    } catch(err){
        res.status(500).json({
            message: `Failed to create movie ${err}`
        })
    }
})


//! Update movie
router.put('/:id', middleware.validateSession, async(req,res) =>{
    const {title, genre, studio, runTime, description, rating, personalComment, status, owner_id} =req.body;

    try{
        const movieUpdate = await MovieModel.update(
            {title, genre, studio, runTime, description, rating, personalComment, status},
            {where: {id: req.params.id}}
        )

        res.status(200).json({
            message:`Movie Updated`,
            movieUpdate
        })

    } catch(err){
        res.status(500).json({
            message: `Failed to update movie ${err}`
        })
    }
})


//! delete movie
router.delete('/delete/:id', middleware.validateSession, async (req, res) =>{
    try{
        const deleteMovie = await MovieModel.destroy({
            where: {id: req.params.id}
        })

        res.status(200).json({
            message: `Movie successfully deleted`,
            deletedMovie: deleteMovie
        })

    } catch(err){
        res.status(500).json({
            message: `Failed to delete movie ${err}`
        })
    }
})

module.exports = router;