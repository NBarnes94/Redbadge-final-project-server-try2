const router = require('express').Router();
const {BookModel} = require('../models');
const validateSession = require('../middleware');
const middleware = require('../middleware')

router.get('/all', async (req, res) =>{
    try{
        const allBooks = await BookModel.findAll()

        res.status(200).json(allBooks)
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
})

router.get("/:id", middleware.validateSession, async (req, res) =>{
    try{
        const findBook = await BookModel.findOne({
            where: {id: req.params.id}
        })

    } catch(err){
        res.status(500).json({
            message: `Failed to retrieve book: ${err}`
        })
    }
})
router.get("/", middleware.validateSession, async (req, res) =>{
    try{
        const {id} = req.user
        const userBooks = await BookModel.findAll({
            where: {owner_id: id}
        })
        res.status(200).json(userBooks)
    } catch(err){
        res.status(500).json({
            message: `Failed to find your games: ${err}`    
        })
    }
})

router.post('/create', middleware.validateSession, async (req, res) =>{
    console.log(req.body);

    const {title, genre, author, description, rating, personalComment, status} = req.body;
    const {id} = req.user
    const bookCreate = {
        title, 
        genre, 
        author,
        description,
        rating,
        personalComment,
        status,
        owner_id: id
    }
    console.log(bookCreate);

    try{
        const newBook = await BookModel.create(
            bookCreate
        );
        res.status(500).json({
            message: `Book successfully logged`,
            newBook
        })
        console.log(newBook);
    } catch(err){
        res.status(500).json({
            message: `Failed to create book ${err}`
        })
    }
})

router.put('/:id', middleware.validateSession, async(req, res) =>{
    const{title, genre, author, description, rating, personalComment, status, owner_id} = req.body;
    try{
        const bookUpdate = await BookModel.update(
            {title, genre, author, description, rating, personalComment, status}, 
            {where: {id: req.params.id}}
        )

            res.status(200).json({
                message: `Book updated!`,
                bookUpdate
            })

    } catch(err){
        res.status(500).json({
            message: `Failed to update book: ${err}`
        })
    }
})

router.delete('/delete/:id', middleware.validateSession, async (req,res)=>{
    try{
    const deleteBook = await BookModel.destroy({
        where: {id: req.params.id}
    })
    res.status(200).json({
        message: `Book successfully deleted`,
        deletedBook: deleteBook
    })
    } catch(err){
        res.status(500).json({
            message: `Failed to delete book: ${err}`
        })
    }
})

module.exports = router;