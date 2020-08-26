const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Establishment = require('../models/Establishment');


const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{
        const establishments = await Establishment.find().populate('user');
    
        return res.send( { establishments } );
    }catch(e){
        return res.status(400).send({ error: e})
    }
});

router.post('/', async(req, res) => {
    try{

        const establishment = await Establishment.create( { ...req.body, user: req.userId });


        res.send({establishment});

    }catch(e){
        console.log(e);
        return res.status(400).send({ error: 'Error while was creating new establishment'})
    }
});

router.put('/:establishmentId', async(req, res) => {
    try{
        const { name } = req.body;

        const establishment = await Establishment.findByIdAndUpdate( req.params.establishmentId, { 
            name
        }, {
            new: true
        });
        
        return res.send( { establishment } );
    }catch(e){
        console.log(e);
        return res.status(400).send({ error: 'Error while was updating establishment'})
    }
});

router.delete('/:establishmentId', async(req, res) => {
    try{
        const establishment = await Establishment.findByIdAndRemove(req.params.establishmentId);
    
        return res.send();
    }catch(e){
        console.log(e);
        return res.status(400).send({ error: 'Error while was deleting establishment'})
    }
});

module.exports = app => app.use('/establishments', router);

