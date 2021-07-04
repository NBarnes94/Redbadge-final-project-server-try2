require('dotenv').config()
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");
const chalk = require('chalk')

const validateSession = async(req, res, next) =>{
    if(req.method ==="OPTIONS"){
        return next()
    } else if( 
        req.headers.authorization){
            const {authorization} = req.headers;
            console.log(chalk.blueBright(authorization));
            console.log(`authorization -->`, authorization);
            const payload = authorization
                ? jwt.verify
                (authorization, process.env.JWT_SECRET) : undefined

                console.log(chalk.blueBright( payload.id));
            if(payload){
                let foundUser = await UserModel.findOne({
                    where: {
                        id: payload.id,
                        role: "admin"
                    }
                });

                if(foundUser){
                    console.log(`request -->`, req);
                    req.user = foundUser
                    next()
                } else {
                    res.status(400).send({
                        message: `Not Authorized`
                    })
                }
            } else {
                res.status(401).send({
                    message: `Invalid Token`
                })
            }
        } else{
            res.status(403).send({
                message: `Forbidden`
            })
        }
    }

module.exports = validateSession;