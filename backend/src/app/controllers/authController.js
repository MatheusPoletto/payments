const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../../config/auth.json');

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign( params , authConfig.secret, {
        expiresIn: 86400
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try{

        if(await User.findOne({email}))
            return res.status(400).send({ error: 'Usuário já existe'});

        const user = await User.create(req.body);

        user.password = undefined;

        res.send({ 
            user, 
            token: generateToken({ id: user.id }) 
        });
    }catch(error){
        
        return res.status(400).send({ error: error });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password} = req.body;

    const user = await (await User.findOne({ email }).select('+password'));

    if(!user)
        return res.status(400).send({ error: 'User not found' });

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Incorrect password' });

    user.password = undefined;

    res.send({ 
        user, 
        token: generateToken({ id: user.id }) 
    });
});

module.exports = app => app.use('/auth', router);