const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

module.exports = {
    signup: (req, res)=>{
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err){
                return res.status(500).json({
                    status: 500,
                    message: err.message
                })
            }

            const newUser = new User({
                email: req.body.email,
                password: hash
            })

            newUser.save((err, user)=>{
                if(err){
                    return res.status(400).json({
                        status: 400,
                        message: err.message
                    })
                }
                return res.status(201).json({
                    status: 201,
                    message: 'User created !'
                })
            })
            
        })
    },

    login: (req, res)=>{
        User.findOne({email: req.body.email}, (err, user)=>{
            if(err){
                return res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }
            if(!user){
                return res.status(404).json({
                    status: 404,
                    message: 'User not found !'
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, valid)=>{
                if(err){
                    return res.status(500).json({
                        status: 500,
                        message: err.message
                    });
                }
                if(!valid){
                    return res.status(401).json({
                        status: 401,
                        message: "Bad Password !"
                    });
                }

                return res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        {userId: user._id},
                        process.env.TOKEN_SECRET,
                        {expiresIn: '24h'}
                    )
                })

            })
        })
    }
}