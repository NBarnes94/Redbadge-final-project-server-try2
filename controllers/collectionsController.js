const router = require('express').Router()
const {validateSession} = require('../middleware');
const middleware = require('../middleware');
const chalk = require('chalk');
const {CollectionModel} = require('../models');
const {VGModel} = require('../models');
const {MovieModel} = require('../models');
const {BookModel} = require('../models');
const {CollectionTable} = require('../models')

router.post('/create', middleware.validateSession, async (req,res) =>{
    const {name} = req.body
    const {id} = req.user   
    const createCollection = {
        owner: id, 
        name, 
        userId: id
    }
    console.log(createCollection);

    try{
        const newCollection = await CollectionModel.create(
            createCollection
        )

        res.status(200).json({
            message: `Collection successfully created`,
            newCollection
        })
    }catch(err){
        res.status(500).json({
            message: `Failed to create Collection ${err}`
        })
    }
})

router.post('/addMedia/:collectionId/', middleware.validateSession, async (req, res) =>{
    const {movieId} = req.body
    try{
        const newCollectionAdd = await CollectionTable.create({
            collectionId: req.params.collectionId,
            movieId: movieId
        })

        res.status(200).json({
            message: `Movie successfully added to collection`,
            newCollectionAdd
        })
    }catch(err){
        res.status(500).json({
            message: `Failed to add movie to collection ${err}`
        })
    }
})

module.exports = router;