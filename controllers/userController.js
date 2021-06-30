const router =  require('express').Router();
const{UserModel} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UniqueConstraintError} = require('sequelize');

router.get('/get', async (req,res) =>{
    try{
        res.status(201).json({
            message: `test`
        })
    }catch(err){
        res.status(500).json({
            message: `no test`
        })
    }
})

router.post('/register', async (req, res) =>{
    const {firstName, lastName, email, password} =req.body

    try{
        const newUser = await UserModel.create({
            firstName, 
            lastName,
            email, 
            password: bcrypt.hashSync(password, 20)
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

module.exports = router;