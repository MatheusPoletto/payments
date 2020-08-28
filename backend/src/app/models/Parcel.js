const mongoose = require('../../database');

const ParcelSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    barcode: {
        type: String,
        required: false
    },
    value: {
        type: Number,
        get: val => {
            return val.toFixed(2);
        },
        set: val => {
            return val;
        },
        required: false,
        default: 0
    },
    dueDate:{
        type: Date,        
    },
    paymentDate:{
        type: Date,        
    },
    paymentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    debt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debt',
        required: true
    },
});


const Parcel = mongoose.model('Parcel', ParcelSchema);

module.exports = Parcel;