const router =  require('express').Router();
const{UserModel} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UniqueConstraintError, json} = require('sequelize');
const middleware = require('../middleware');


//! get user info
router.get('/get',middleware.validateSession,  async (req,res) =>{
    try{
        const {id} = req.user
        const getUser = await UserModel.findOne({
            where: {id: id}
        })
        res.status(201).json({
            message: `heres user`, 
            firstName: getUser
        })
    }catch(err){
        res.status(500).json({
            message: `Failed to retrieve user ${err}`
        })
    }
})


//! register user
router.post('/register', async (req, res) =>{
    const {firstName, lastName, email, password, role} =req.body

    try{
        const newUser = await UserModel.create({
            firstName, 
            lastName,
            email, 
            password: bcrypt.hashSync(password, 12),
            role
        })

        const token = jwt.sign(
            {us:newUser.id},
            process.env.JWT_SECRET,
            {expiresIn: 60 * 60 * 168}
        )

        res.status(201).json({
            message: "User Registered",
            user: newUser,
            token
        })
    } catch(err){
        if (err instanceof UniqueConstraintError){
            res.status(409).json({
                message: "Email already in use"
            });
        } else {
            res.status(500).json({
                message: `Failed to register user: ${err}`
            })
        }
    }
})


//! Login
router.post("/login", async (req,res) =>{
    let {email, password} = req.body;

    try{
        let loginUser = await UserModel.findOne({
            where: {email: email}
        })

        if (loginUser){
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            
            if(passwordComparison){

                let token = jwt.sign(
                    {id: loginUser.id},
                    process.env.JWT_SECRET,
                    {expiresIn: 60 * 60 * 168}
                );

                res.status(200).json({
                    user: loginUser,
                    message: `User successfully logged in`,
                    token
                });

            }else{
                res.status(401).json({
                    message: `Incorrect Email or password`
                })
            }

        } else {
            res.status(401).json({
                message: `Incorrect Email or Password`
            })
        }

    } catch(err){
        res.status(500).json({
            message: `Error logging in`
        })
    }
})

router.get("/admin/all", middleware.validateAdmin, async(req, res) =>{
    try{
        const allUsers = await UserModel.findAll();
        res.status(200).json({ allUsers })
    } catch (err){
        res.status(500).json({
            error: err
        })
    }
})

router.put("admin/:id", middleware.validateAdmin, async(req, res) =>{
    let {role} = req.body.user;
    const updateUser = {role: role};
    const query = {where: {id: req.params.userId} };
    try{
        const foundUser = await UserModel.firstOne(query);

        if (foundUser){
            await UserModel.update(updateUser, query);

            res.status(201).json({
                updatedUser: updateUser
            })
        } else{
            res.status(406).json({
                message: `Not Authorized: ${err}`
            })
        }
    } catch(err){
        res.status(500).json({
            error: err
        })
    }
})

module.exports = router;