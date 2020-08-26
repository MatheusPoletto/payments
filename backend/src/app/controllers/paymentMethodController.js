const express = require('express');
const authMiddleware = require('../middlewares/auth');

const PaymentMethod = require('../models/PaymentMethod');


const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{
        const paymentMethods = await PaymentMethod.find().populate('user');
    
        return res.send( { paymentMethods } );
    }catch(e){
        return res.status(400).send({ error: e})
    }
});

router.post('/', async(req, res) => {
    try{

        const paymentMethod = await PaymentMethod.create( { ...req.body, user: req.userId });


        res.send({paymentMethod});

    }catch(e){
        console.log(e);
        return res.status(400).send({ error: 'Error while was creating new PaymentMethod'})
    }
});

router.put('/:paymentMethodId', async(req, res) => {
    try{
        const { name, parcelsNumber } = req.body;

        const paymentMethod = await PaymentMethod.findByIdAndUpdate( req.params.paymentMethodId, { 
            name, parcelsNumber
        }, {
            new: true
        });
        
        return res.send( { paymentMethod } );
    }catch(e){
        console.log(e);
        return res.status(400).send({ error: 'Error while was updating PaymentMethod'})
    }
});

router.delete('/:PaymentMethodId', async(req, res) => {
    try{
        const paymentMethod = await PaymentMethod.findByIdAndRemove(req.params.PaymentMethodId);
    
        return res.send();
    }catch(e){
        console.log(e);
        return res.status(400).send({ error: 'Error while was deleting PaymentMethod'})
    }
});

module.exports = app => app.use('/paymentmethods', router);

