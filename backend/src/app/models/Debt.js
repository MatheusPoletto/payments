const mongoose = require('../../database');

const DebtSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    totalValue: {
        type: Number,
        get: val => {
            return (val / 100).toFixed(2);
        },
        set: val => {
            return num * 100;
        },
        required: false,
        default: 0
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    establishment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    },
    paymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: false
    },
    parcels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parcel',
    }],   
});


const Debt = mongoose.model('Debt', DebtSchema);

module.exports = Debt;