const router = require('express').Router();
const {VGModel} = require('../models');
const validateSession = require('../middleware');
const middleware = require('../middleware');
// const { json } = require('sequelize/types');
// const { destroy } = require('../models/user');

router.get('/all', async (req,res) =>{
    try{
        const allGames = await VGModel.findAll();
        
        res.status(200).json(allGames)
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
})

router.get("/:id", middleware.validateSession, async (req, res) =>{
    try{
        const findGame = await VGModel.findOne({
            where: {id: req.params.id}
        })

        res.status(200).json({
            message: `game successfully retrieved`,
            game: findGame
        })

    } catch(err){
        res.status(500).json({
            message: `Failed to retrieve game: ${err}`
        })
    }
})

router.get("/", middleware.validateSession, async (req, res) =>{
    try{
        const {id} = req.user
        const userGames = await VGModel.findAll({
            where: {owner_id: id}
        })
        res.status(200).json(userGames)
    } catch(err){
        res.status(500).json({
            message: `Failed to find your games: ${err}`    
        })
    }
})

router.post("/create", middleware.validateSession, async (req, res) =>{
    console.log(req.body);

    const{title, genre, developer, platform, description, rating, personalComment, status} = req.body
    const {id} = req.user
    const gameCreate = {
        title,
        genre,
        developer,
        platform, 
        description,
        rating, 
        personalComment,
        status,
        owner_id: id
    }
    console.log(gameCreate);

    try{
        const newGame = await VGModel.create(
            gameCreate
        );
        res.status(201).json({
            message: `Game successfully logged`,
            newGame
        })
        console.log(newGame);

    } catch(err){
        res.status(500).json({
            message: `Failed to create game ${err}`
        })
    }
})
router.put("/:id", middleware.validateSession, async (req,res)=>{
    const{title, genre, developer, platform, description, rating, personalComment, status, owner_id} = req.body;
    try{
        const gameUpdate = await VGModel.update(
            {title, genre, developer, platform, description, rating, personalComment, status},
            {where: {id:req.params.id}}
        )
        res.status(200).json({
            message: `Game updated`,
            gameUpdate
        })
    } catch(err){
        res.status(500).json({
            message: `Failed to update game: ${err}`
        })
    }
})

router.delete('/delete/:id', middleware.validateSession, async (req, res) =>{
    try{
        const deleteGame = await VGModel.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            message: `Game successfully deleted`,
            deletedGame: deleteGame
        })
    } catch(err){
        res.status(500).json({
            message:`Failed to delete game: ${err}`
        })
    }
})

module.exports =  router; 