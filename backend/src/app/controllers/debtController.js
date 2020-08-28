const express = require('express');
const authMiddleware = require('../middlewares/auth');

// const Project = require('../models/Project');
// const Task = require('../models/Task');
const Debt = require('../models/Debt');
const PaymentMethod = require('../models/PaymentMethod');
const Parcel = require('../models/Parcel');

const router = express.Router();

const alwaysPopulate = ['paymentMethod', 'user', 'establishment', 'parcels'];

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{
        const debts = await Debt.find().populate(alwaysPopulate);
    
        return res.send( { debts } );
    }catch(e){
        console.log(e);
        return res.status(400).send({ error: e})
    }
});

router.get('/:debtId', async(req, res) => {
    try{
        const debt = await Debt.findById(req.params.debtId).populate(alwaysPopulate);
    
        return res.send( { debt } );
    }catch(e){
        return res.status(400).send({ error: e})
    }
});

router.post('/', async(req, res) => {
    try{
        const { description, totalValue, establishment} = req.body;
        const paymentMethodId = req.body.paymentMethod;

        const debt = await Debt.create({
            description, totalValue, user: req.userId,
            paymentMethod: paymentMethodId, establishment
        });

        const paymentMethod = await PaymentMethod.findById(paymentMethodId);
        
        var parcels = [];
        if(paymentMethod.isCashPayment)
            debt.isPaid = true;
        else
            parcels = debt.generateParcels(paymentMethod.parcelsNumber);

        await Promise.all(parcels.map(async parcelToCreate => {
            const parcel = new Parcel({ ...parcelToCreate});
            await parcel.save();
            debt.parcels.push(parcel);    
        }));

        await debt.save();        
    
        return res.send( { debt: await debt.populate(alwaysPopulate).execPopulate() } );
    }catch(e){
        console.log(e);
        return res.status(400).send({ error: e})
    }
});

router.put('/:debtId', async(req, res) => {
    try{
        const { description, totalValue, establishment} = req.body;
        const paymentMethodId = req.body.paymentMethod;

        const originalDebt = await Debt.findById(req.params.debtId);

        const debt = await Debt.findByIdAndUpdate(req.params.debtId, {
            description, totalValue, user: req.userId,
            paymentMethod: paymentMethodId, establishment
        });

        const paymentMethod = await PaymentMethod.findById(paymentMethodId);

        let recreateParcels = !originalDebt.paymentMethod.equals(paymentMethod._id);
        if(!recreateParcels)
            recreateParcels = originalDebt.totalValue != totalValue;

        if(recreateParcels){
            await Parcel.deleteMany( { debt: debt._id} );

            if(paymentMethod.isCashPayment)
                debt.isPaid = true;
            else
                parcels = debt.generateParcels(paymentMethod.parcelsNumber);

            await Promise.all(parcels.map(async parcelToCreate => {
                const parcel = new Parcel({ ...parcelToCreate});
                await parcel.save();
                debt.parcels.push(parcel);    
            }));
        }   

        await debt.save();        
    
        return res.send( { debt: await debt.populate(alwaysPopulate).execPopulate() } );
    }catch(e){
        console.log(e);
        return res.status(400).send({ error: e})
    }
});

router.delete('/:debtId', async(req, res) => {
    try{
        const debt = await Debt.findByIdAndRemove(req.params.debtId);
    
        return res.send();
    }catch(e){
        return res.status(400).send({ error: e})
    }
});

module.exports = app => app.use('/debts', router);

